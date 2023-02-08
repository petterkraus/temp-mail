import generateRandomString from "./utils/randomString";
import api from "./service/API";
import { createMailQuery, sessionQuery } from "./utils/querys";
import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";

function App() {
  const [sessionData, setSessionData] = useState({
    email: "",
    expiresAt: "",
    id: "",
    token: "",
  });
  const [inboxData, setInboxData] = useState({ mails: [] });

  const [refreshStep, setRefreshStep] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    if (!isSessionActive) {
      restorePreviousSession();
      if (isSessionActive) return;
    }
    startSession();
  }, [sessionData]);

  const restorePreviousSession = async () => {
    const previousToken = localStorage.getItem("tm_token");
    console.log(previousToken);
    if (!previousToken) return;

    const prevSession = {
      email: localStorage.getItem("tm_email"),
      id: localStorage.getItem("tm_id"),
      token: localStorage.getItem("tm_token"),
    };

    setSessionData(prevSession);
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

  const saveSession = (newSession) => {
    localStorage.setItem("tm_token", newSession.token);
    localStorage.setItem("tm_id", newSession.id);
    localStorage.setItem("tm_email", newSession.email);
  };

  const startSessionRefreshTimer = () => {
    setInterval(() => {
      setRefreshStep(refreshStep + 1);
    }, 500);
  };

  const startInboxRefreshInterval = () => {
    setInterval(() => {
      refreshInbox();
    }, 15000);
  };

  const refreshInbox = async () => {
    try {
      if (!sessionData.token) return;
      const query = sessionQuery(sessionData.id);
      const response = await api.post(`graphql/${sessionData.token}`, {
        query,
      });

      setInboxData((prevInbox) => ({
        ...prevInbox,        
        mails: response.data.data.session.mails,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  function handleCopy() {
    navigator.clipboard.writeText(email.email);
  }
  return (
    <>
      {refreshStep === 0 && (
        <div
          className={`flex flex-col justify-center items-center min-h-screen
    ${sessionData.id ? "transition-opacity duration-500 ease-in-out opacity-0" : null}
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
          </div>
          <div className="ml-2 mt-5">
            <h3>Inbox</h3>
            {inboxData.mails.length !== 0 && (
              <>
                <p>{inboxData.mails[0].fromAddr} </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
