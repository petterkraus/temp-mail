export const restoreFromStorage = () => {
  const testing = localStorage.getItem("tm_token");
  if (!testing) return {session: false};
 
  const storage = {
    email: localStorage.getItem("tm_email"),
    id: localStorage.getItem("tm_id"),
    token: localStorage.getItem("tm_token"),
  };

  return storage;
};

  export const saveSession = (newSession) => {
    localStorage.setItem("tm_token", newSession.token);
    localStorage.setItem("tm_id", newSession.id);
    localStorage.setItem("tm_email", newSession.email);
  };
  export const clearSessionStorage = () => {
    localStorage.clear();
  };

  