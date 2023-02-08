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
    expiresAt: "",
    id: "",
    token: "",
  });
  const [inboxData, setInboxData] = useState({ mails: [] });

  const [refreshStep, setRefreshStep] = useState(0);

  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isIntervalOn, setIsIntervalOn] = useState(false);
  const [timerRefresh, setTimerRefresh] = useState(timeInterval);

  useEffect(() => {
    refreshInbox();
    if (!isSessionActive) {
      restorePreviousSession();
      if (isSessionActive) return;
    }
    startSession();
    return () => {
      
    }
  }, [sessionData]);

  

  const restorePreviousSession = async () => {
    const previousSession = restoreFromStorage();

    if (sessionData.id !== "") return;

    if (previousSession.session === false) return;

    setSessionData(previousSession);

    startSession();
  };

  const startSession = async () => {
    if (!sessionData.id) return;
    startSessionRefreshTimer();
    if (isSessionActive) return;
    startInboxRefreshInterval();
    setIsSessionActive(true);
  };

  const handleGenerateMail = async () => {
    try {
      const token = generateRandomString();
      const response = await api.post(`graphql/${token}`, {
        query: createMailQuery,
      });

      const newSession = {
        email: response.data.data.introduceSession.addresses[0].address,
        expiresAt: response.data.data.introduceSession.expiresAt,
        id: response.data.data.introduceSession.id,
        token,
      };
      setSessionData(newSession);
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

  const startInboxRefreshInterval = (clear) => {
    if (isIntervalOn) return;
    
    setIsIntervalOn(true);

    const inboxRefresh = setInterval(() => {
      setTimerRefresh((prevTimerRefresh) => {
        if (prevTimerRefresh <= 0) {
          setTimerRefresh(timeInterval);
          refreshInbox();
        }

        return prevTimerRefresh - 1;
      });
    }, 1000);
    if (clear) {
      clearInterval(inboxRefresh);
    }
  };

  const refreshInbox = async () => {
    try {
      if (!sessionData.token) return;
      const query = sessionQuery(sessionData.id);
      const response = await api.post(`graphql/${sessionData.token}`, {
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
  };

  function verifySession(session) {
    if (session.data.data.session === null) {
      endSession();
    }
  }

  function endSession() {
    startInboxRefreshInterval(true);
    clearSessionStorage();
    setSessionData({
      email: "",
      expiresAt: "",
      id: "",
      token: "",
    });
    // setInboxData({ mails: [] });
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
                value={sessionData.email}
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
                  return (<p key={index}> {mail.fromAddr} | {mail.text}</p>);
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
