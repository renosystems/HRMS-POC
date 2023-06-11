export async function login(username, password) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const expiration = Date.now() + 60 * 60 * 1000; // Current time + 1 hour
  localStorage.setItem("HRMSSessionExpiry", expiration);

  return {
    id: 1,
    username: username,
    name: username,
  };
}

export async function logout() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  localStorage.removeItem("HRMSSessionExpiry");
  // Dummy logout logic
  return true;
}
