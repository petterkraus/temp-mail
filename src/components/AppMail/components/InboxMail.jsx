export default function InboxMail({ mail, openEmail, index, ...props }) {
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
