export default function Landing({handleGenerateMail, sessionData}) {
  return (
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
  )
}