import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import "react-circular-progressbar/dist/styles.css";

import { MdContentCopy } from "react-icons/md";
import {
  IoMdRefresh,
  IoIosNotifications,
  IoMdNotificationsOff,
} from "react-icons/io";
import { IoPower, IoArrowUpCircle } from "react-icons/io5";

import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import InboxMail from "./components/InboxMail";
import OpenedMail from "./components/OpenedMail";
import EmptyInbox from "./components/EmptyInbox";

export default function AppMail({
  sessionEmail,
  handleCopy,
  timerRefresh,
  endSession,
  inboxData,
  forceRefresh,
}) {
  const [openedEmail, setOpenedEmail] = useState();
  const [avaliableNotifications, setAvaliableNotifications] = useState(false);
  const [sendNotification, setSendNotification] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      setAvaliableNotifications(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function openEmail(mail) {
    let sanitezed_html = DOMPurify.sanitize(mail.html);
    sanitezed_html = sanitezed_html.replace(/<a/g, '<a target="_blank"');

    setOpenedEmail({
      ...mail,
      sanitezed_html,
    });
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleNotification() {
    if (
      Notification.permission === "default" ||
      Notification.permission === "denied"
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          return setSendNotification(true);
        } else {
          return setSendNotification(false);
        }
      });
    }
    setSendNotification(!sendNotification);
  }
  return (
    <div className="h-screen">
      <div className={`flex flex-col items-center pt-7`}>
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
      <div className="flex max-md:flex-col">
        <div className="ml-4 mt-5 w-96 overflow-x-hidden max-md:w-full max-md:pr-8">
          <div className="border-b flex gap-2 items-center mb-2 border-gray-300 ">
            <h3 className="font-bold">Inbox</h3>
            <div
              onClick={handleNotification}
              className={!avaliableNotifications ? "hidden" : null}
            >
              {sendNotification ? (
                <IoIosNotifications />
              ) : (
                <IoMdNotificationsOff />
              )}
            </div>
          </div>
          {inboxData.mails.length === 0 && <EmptyInbox />}
          {inboxData.mails.length !== 0 && (
            <>
              {inboxData.mails.map((mail, index) => {
                return (
                  <InboxMail
                    key={index}
                    mail={mail}
                    openEmail={openEmail}
                    notification={sendNotification}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="w-full flex">
          <OpenedMail openedEmail={openedEmail} />
        </div>
      </div>
      {showScrollButton && (
        <button
          className="fixed bottom-5 right-5 m-4 p-2 text-4xl hover:text-gray-800 rounded shadow"
          onClick={handleScrollToTop}
        >
          <IoArrowUpCircle />
        </button>
      )}
    </div>
  );
}
