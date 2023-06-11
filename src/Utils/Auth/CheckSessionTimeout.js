const checkSessionTimeout = () => {
  const expiration = localStorage.getItem("HRMSSessionExpiry");

  if (expiration) {
    if (Date.now() > expiration) {
      // Clear the session and log out the user
      localStorage.removeItem("HRMSSessionExpiry");
      return true;
    }
    return false;
  }

  return true;
};

export default checkSessionTimeout;
