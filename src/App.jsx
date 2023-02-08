import generateRandomString from "./utils/randomString";
import api from "./service/API";
import { createMailQuery, sessionQuery } from "./utils/querys";
import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";

function App() {
  const [email, setEmail] = useState({
    email: "",
    expiresAt: "",
    id: "",
    token: "",
  });

  const [inbox, setInbox] = useState({mails:[]});
  
  const [session, setSession] = useState(false);

  const [step, setStep] = useState(0);

  async function handleGenerateMail() {
    try {
      const token = generateRandomString();
      const response = await api.post("graphql/" + token, {
        query: createMailQuery,
      });

      const obj = {
        email: response.data.data.introduceSession.addresses[0].address,
        expiresAt: response.data.data.introduceSession.expiresAt,
        id: response.data.data.introduceSession.id,
        token,
      };
      setEmail(obj);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(email);
    
    if (!email.id) return;

    setInterval(() => {
      if (email.id) setStep(1);
    }, 500);
    if (session) return;
    handleRefresh();
    setSession(true);
  }, [email]);

  useEffect(() => {
    console.log(inbox);
    
  }, [inbox]);

  function handleRefresh() {
    setInterval(() => {
      handleSession();
    }, 15000);
  }

  async function handleSession() {
    try {
      if (!email.token) return;
      const query = sessionQuery(email.id);
      const response = await api.post("graphql/" + email.token, {
        query: query,
      });
      console.log(response.data.data.session.mails);

      setInbox({
        mails: response.data.data.session.mails,
      });
      
 
    } catch (error) {
      console.log(error);
    }

    
  }
  function handleCopy() {
    navigator.clipboard.writeText(email.email);
  }

  return (
    <>
      {step === 0 && (
        <div
          className={`flex flex-col justify-center items-center min-h-screen
    ${email.id ? "transition-opacity duration-500 ease-in-out opacity-0" : null}
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
      {step === 1 && (
        <div className=" min-h-screen">
          <div className={`flex flex-col items-center mt-7`}>
            <p className="text-sm">Your temporary email adress</p>
            <div className="flex">
              <input
                className="border-t border-b border-l border-gray-500 rounded-tl-md rounded-bl-md h-8 pl-2"
                readOnly
                value={email.email}
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
            {inbox.mails.length !== 0 && ( <>
              <p>{inbox.mails[0].fromAddr} </p>
              </>) }
            
          </div>
        </div>
      )}
    </>
  );
}

export default App;
