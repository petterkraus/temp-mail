import generateRandomString from "./utils/randomString";
import Landing from "./components/Landing";
import AppMail from "./components/AppMail";
import api from "./service/API";
import { createMailQuery, sessionQuery } from "./utils/querys";
import { useState, useEffect } from "react";

import {
  restoreFromStorage,
  saveSession,
  clearSessionStorage,
} from "./utils/storage";

function App() {
  const timeInterval = 15;

  const [sessionData, setSessionData] = useState({
    email: "",
    id: "",
    token: "",
  });

  const [restoredSessionData, setRestoredSessionData] = useState({
    email: "",
    id: "",
    token: "",
  });

  const [sessionEmail, setSessionEmail] = useState("");

  const [inboxData, setInboxData] = useState({ mails: [] });

  const [refreshStep, setRefreshStep] = useState(0);

  const [timerRefresh, setTimerRefresh] = useState(timeInterval);

  let refreshIntervalNew;
  let refreshIntervalRestored;

  useEffect(() => {
    if (!restorePreviousSession()) return;
    if (!restoredSessionData.token) return;

    refreshInbox(restoredSessionData);

    startSessionRefreshTimer();

    startRefreshIntervaRestored();
    return () => {
      stopRefreshIntervalRestored();
    };
  }, [restoredSessionData]);

  useEffect(() => {
    if (!sessionData.token) return;
    startRefreshInterval();

    refreshInbox(sessionData);

    startSessionRefreshTimer();

    return () => {
      stopRefreshInterval();
    };
  }, [sessionData]);

  const startRefreshInterval = () => {
    refreshIntervalNew = setInterval(() => {
      refreshNewSession();
    }, 1000);
  };
  const startRefreshIntervaRestored = () => {
    refreshIntervalRestored = setInterval(() => {
      refreshRestoredSession();
    }, 1000);
  };

  function refreshNewSession() {
    setTimerRefresh((prevTimerRefresh) => {
      if (prevTimerRefresh <= 0) {
        setTimerRefresh(timeInterval);
        refreshInbox(sessionData);
      }
      return prevTimerRefresh - 1;
    });
  }

  function refreshRestoredSession() {
    setTimerRefresh((prevTimerRefresh) => {
      if (prevTimerRefresh <= 0) {
        setTimerRefresh(timeInterval);
        refreshInbox(restoredSessionData);
      }
      return prevTimerRefresh - 1;
    });
  }

  const stopRefreshInterval = () => {
    clearInterval(refreshIntervalNew);
  };
  const stopRefreshIntervalRestored = () => {
    clearInterval(refreshIntervalRestored);
  };

  function forceRefresh() {
    if (restoredSessionData.token) {
      setTimerRefresh(timeInterval);
      refreshInbox(restoredSessionData);
      return;
    }
    if (sessionData.token) {
      setTimerRefresh(timeInterval);
      refreshInbox(sessionData);
    }
  }

  const restorePreviousSession = async () => {
    if (restoredSessionData.token) return;

    const previousSession = restoreFromStorage();

    if (sessionData.id !== "") return false;

    if (previousSession.session === false) return false;

    setRestoredSessionData(previousSession);

    setSessionEmail(previousSession.email);

    return true;
  };

  const handleGenerateMail = async () => {
    try {
      const token = generateRandomString();
      const response = await api.post(`graphql/${token}`, {
        query: createMailQuery,
      });
      const newSession = {
        email: response.data.data.introduceSession.addresses[0].address,
        id: response.data.data.introduceSession.id,
        token,
      };

      setSessionData(newSession);

      setSessionEmail(newSession.email);

      saveSession(newSession);
    } catch (error) {
      console.log(error);
    }
  };

  const startSessionRefreshTimer = () => {
    setTimeout(() => {
      setRefreshStep(refreshStep + 1);
    }, 800);
  };

  async function refreshInbox(validSession) {
    try {
      if (!validSession.token) return;
      const query = sessionQuery(validSession.id);
      const response = await api.post(`graphql/${validSession.token}`, {
        query,
      });

      verifySession(response);
      setInboxData((prevInbox) => ({
        ...prevInbox,
        mails: response.data.data.session.mails,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  function verifySession(session) {
    if (session.data.data.session === null) {
      endSession();
    }
  }

  function endSession() {
    clearSessionStorage();
    setSessionData({
      email: "",
      id: "",
      token: "",
    });
    setRestoredSessionData({
      email: "",
      id: "",
      token: "",
    });
    setInboxData({ mails: [] });
    setRefreshStep(0);
  }

  function handleCopy() {
    navigator.clipboard.writeText(sessionEmail);
  }
  return (
    <>
      {refreshStep === 0 && (
        <Landing
          handleGenerateMail={handleGenerateMail}
          sessionData={sessionData.id}
        />
      )}
      {refreshStep === 1 && (
        <AppMail
          sessionEmail={sessionEmail}
          handleCopy={handleCopy}
          timerRefresh={timerRefresh}
          endSession={endSession}
          inboxData={inboxData}
          forceRefresh={forceRefresh}
        />
      )}
    </>
  );
}

export default App;
