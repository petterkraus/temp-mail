import generateRandomString from "./utils/randomString";
import api from "./service/API";

function App() {

  const mutation = `
  mutation {
    introduceSession {
        id,
        expiresAt,
        addresses {
          address
        }
    }
  }
`;

  function handleGenerate() {
    alert(generateRandomString());
  }

  async function handleGenerateMail() {
    try {
      const response = await api.post(generateRandomString(), {
        query: mutation
      }
      );
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={handleGenerateMail}>Generate</button>
    </div>
  );
}

export default App;
