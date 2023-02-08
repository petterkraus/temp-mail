import generateRandomString from "./utils/randomString";
import api from "./service/API";
import { mutation } from "./utils/mutations";
import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";

function App() {
  const [email, setEmail] = useState({
    email: "",
    expiresAt: "",
    id: "",
  });
  const [step, setStep] = useState(0);

  async function handleGenerateMail() {
    try {
      const response = await api.post('graphql/'  + generateRandomString(), {
        query: mutation,
      });
      
      const obj = {
        email: response.data.data.introduceSession.addresses[0].address,
        expiresAt: response.data.data.introduceSession.expiresAt,
        id: response.data.data.introduceSession.id,
      };
      setEmail(obj);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(email);
    setInterval(() => {
      if (email.id) setStep(1);
    }, 500);
  }, [email]);

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
        <div className={`flex flex-col items-center min-h-screen mt-7`}>
          <p className="text-sm">Your temporary email adress</p>
          <div className="flex">
            <input
              className="border-t border-b border-l border-gray-500 rounded-tl-md rounded-bl-md h-8 pl-2"
              readOnly
              value={email.email}
            />
            <div 
            onClick={handleCopy}
            className="flex items-center pl-2 pr-2 border border-gray-500 rounded-tr-md rounded-br-md cursor-pointer hover:drop-shadow-lg">
              <MdContentCopy />
              <button >Copy</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
