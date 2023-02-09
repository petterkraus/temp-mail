import generateRandomString from "./utils/randomString";
import api from "./service/API";
import { createMailQuery, sessionQuery } from "./utils/querys";
import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import {
  restoreFromStorage,
  saveSession,
  clearSessionStorage,
} from "./utils/storage";

function App() {
  const timeInterval = 5;

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

  let refreshIntervalId;

  const startRefreshInterval = () => {
    refreshIntervalId = setInterval(() => {
      refreshInbox(sessionData);
    }, 5000);
  };
  const startRefreshIntervaRestored = () => {
    refreshIntervalId = setInterval(() => {
      refreshInbox(restoredSessionData);
    }, 5000);
  };

  const stopRefreshInterval = () => {
    clearInterval(refreshIntervalId);
  };
  const stopRefreshIntervalRestored = () => {
    clearInterval(refreshIntervalId);
  };

  useEffect(() => {
    if (!restorePreviousSession()) return;
    if (!restoredSessionData.token) return;

    refreshInbox(restoredSessionData);

    startSessionRefreshTimer();

    startRefreshIntervaRestored();
    return ()=> {
      stopRefreshIntervalRestored();
    }
  }, [restoredSessionData]);

  useEffect(() => {
    console.log("montei");

    if (!sessionData.token) return;
    startRefreshInterval();

    refreshInbox(sessionData);

    startSessionRefreshTimer();
    
    return () => {
      console.log("desmontei");
      stopRefreshInterval();
    };
  }, [sessionData]);

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
    }, 500);
  };

  function refreshNewSession() {
    setTimerRefresh((prevTimerRefresh) => {
      if (prevTimerRefresh <= 0) {
        setTimerRefresh(timeInterval);
        refreshInbox(sessionData);
        console.log("oi");
      }
      return prevTimerRefresh - 1;
    });
  }

  // function refreshRestoredSession() {
  //   setTimerRefresh((prevTimerRefresh) => {
  //     if (prevTimerRefresh <= 0) {
  //       setTimerRefresh(timeInterval);
  //       refreshInbox(restoredSessionData);
  //       console.log("oi");
  //     }
  //     return prevTimerRefresh - 1;
  //   });
  // }

  async function refreshInbox(validSession) {
    try {
      if (!validSession.token) return;
      const query = sessionQuery(validSession.id);
      const response = await api.post(`graphql/${validSession.token}`, {
        query,
      });

      console.log(response);
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
    setRefreshStep(refreshStep - 1);
  }

  function handleCopy() {
    navigator.clipboard.writeText(sessionData.email);
  }
  return (
    <>
      {refreshStep === 0 && (
        <div
          className={`flex flex-col justify-center items-center min-h-screen
    ${
      sessionData.id
        ? "transition-opacity duration-500 ease-in-out opacity-0"
        : null
    }
    `}
        >
          <h1 className="text-3xl font-bold">Temporary Mail</h1>
          <button
            className="mt-8 border w-32 h-8 border-gray-600 rounded-lg"
            onClick={handleGenerateMail}
          >
            Generate
          </button>
        </div>
      )}
      {refreshStep === 1 && (
        <div className=" min-h-screen">
          <div className={`flex flex-col items-center mt-7`}>
            <p className="text-sm">Your temporary email adress</p>
            <div className="flex">
              <input
                className="border-t w-52 border-b border-l border-gray-500 rounded-tl-md rounded-bl-md h-8 pl-2"
                readOnly
                value={sessionEmail}
              />
              <div
                onClick={handleCopy}
                className="flex items-center pl-2 pr-2 border border-gray-500 rounded-tr-md rounded-br-md cursor-pointer hover:drop-shadow-lg"
              >
                <MdContentCopy />
                <button>Copy</button>
              </div>
            </div>
            <div>
              <p>{timerRefresh}</p>
            </div>
          </div>
          <div className="ml-2 mt-5">
            <button onClick={endSession}>Turn Off</button>
            <h3>Inbox</h3>
            {inboxData.mails.length !== 0 && (
              <>
                {inboxData.mails.map((mail, index) => {
                  return (
                    <p key={index}>
                      {" "}
                      {mail.fromAddr} | {mail.text}
                    </p>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
