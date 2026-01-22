export const parseJwt = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));

    return {
      email: payload.sub,
      role: payload.role,
    };
  } catch {
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};
