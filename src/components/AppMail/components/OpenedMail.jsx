import { formatDate } from "./../../../utils/formatDate";

export default function OpenedMail({openedEmail}) {
  return (
    <>
    {!openedEmail && (
        <div className="w-full ml-6 mr-12 px-4 py-4 mt-12 pb-10 h-fill bg-gray-200 rounded-xl">
          {" "}
          <p className="text-xs text-gray-500">
            {" "}
            Your Inbox is Ready! <br /> Your e-mails will show up on the left,
            just click on them once to open here.{" "}
          </p>
        </div>
      )}
      {openedEmail && openedEmail.html && (
        <div className="w-full ml-6 mr-12 mt-12 px-4 pt-2 pb-10 h-fill bg-gray-100 rounded-xl">
          <p className="text-sm font-bold text-gray-500">
            {openedEmail.headerFrom}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            {formatDate(openedEmail.receivedAt)} - You can download the message <a href={openedEmail.downloadUrl} download>here</a>:
          </p>
          {!openedEmail.headerSubject && (
            <p className="font-bold text-gray-300"> No Subject</p>
          )}
          <p className="font-bold text-xl text-sky-700">
            {openedEmail.headerSubject}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: openedEmail.sanitezed_html }}
          ></div>
        </div>
        
      )}
      </>
  )
}
