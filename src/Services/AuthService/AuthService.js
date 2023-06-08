export async function login(username, password) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    id: 1,
    username: username,
    name: username,
  };
}

export async function logout() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dummy logout logic
  return true;
}
