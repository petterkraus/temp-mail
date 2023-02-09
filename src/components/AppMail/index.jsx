import { MdContentCopy } from "react-icons/md";
import { IoMdRefresh } from "react-icons/io";
import { IoPower } from "react-icons/io5";

import { useState } from "react";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function AppMail({
  sessionEmail,
  handleCopy,
  timerRefresh,
  endSession,
  inboxData,
  forceRefresh,
}) {
  const [openedEmail, setOpenedEmail] = useState();

  function openEmail(mail) {
    setOpenedEmail(mail);
    console.log(openedEmail);

  }

  return (
    <div className=" min-h-screen">
      <div className={`flex flex-col items-center mt-7`}>
        <p className="text-sm">Your temporary email adress</p>
        <div className="flex">
          <input
            className="border-t w-60 border-b border-l border-gray-500 rounded-tl-md rounded-bl-md h-8 pl-2"
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
        <div className="flex mt-1">
          <p className="mr-1">Autorefresh in </p>
          <div className="h-6 w-6 mr-2">
            <CircularProgressbarWithChildren
              value={timerRefresh}
              minValue={0}
              maxValue={15}
            >
              {" "}
              {timerRefresh}{" "}
            </CircularProgressbarWithChildren>
          </div>
          <div
            onClick={forceRefresh}
            className="cursor-pointer flex mr-2"
          >
            <IoMdRefresh className="text-2xl mr-1" /> <span>Refresh</span>
          </div>
          <div
            onClick={endSession}
            className="flex gap-1 cursor-pointer"
          >
            <IoPower className="text-2xl" />
            <p>Turn Off</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="ml-4 mt-5 w-96 overflow-x-hidden">
          <h3>Inbox</h3>

          {inboxData.mails.length !== 0 && (
            <>
              {inboxData.mails.map((mail, index) => {
                return (
                  <div
                    key={index}
                    className="border-b border-gray-300 pb-1 cursor-pointer"
                    onClick={() => openEmail(mail)}
                  >
                    <p className="font-bold text-sky-700">
                      {mail.headerSubject.length > 40
                        ? mail.headerSubject.slice(0, 40) + "..."
                        : mail.headerSubject}
                    </p>
                    <p className="text-sm">{mail.text.slice(0, 40)}...</p>
                    <p className="text-sm font-bold text-gray-700">
                      {mail.fromAddr}
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {openedEmail && openedEmail.html && (<div className="w-full mr-12 mt-12 pt-1 pb-10 h-fit bg-blue-400">{openedEmail.html}</div>)}
      </div>
    </div>
  );
}
