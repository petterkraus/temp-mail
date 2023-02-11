import { useEffect, useState } from "react";
export default function InboxMail({
  mail,
  openEmail,
  index,
  notification,
  ...props
}) {

  const [notificationShown, setNotificationShown] = useState(false);

useEffect(() => {
  if (!mail || notificationShown || !notification) return;

  const mailNotification = new Notification("You've got mail!", {
    body: "Open the Temp Mail to see your new e-mail!",
  });

  setTimeout(() => {
    mailNotification.close();
  }, 5000);

  setNotificationShown(true);

  return () => {};
}, []);

  return (
    <div
      className="border-b border-gray-300 pb-1 cursor-pointer"
      onClick={() => openEmail(mail)}
      {...props}
    >
      {!mail.headerSubject && (
        <p className="font-bold text-gray-300"> No Subject</p>
      )}
      <p className="font-bold text-sky-700">
        {mail.headerSubject.length > 40
          ? mail.headerSubject.slice(0, 40) + "..."
          : mail.headerSubject}
      </p>
      <p className="text-sm">{mail.text.slice(0, 40)}...</p>
      <p className="text-sm font-bold text-gray-700">{mail.fromAddr}</p>
    </div>
  );
}
