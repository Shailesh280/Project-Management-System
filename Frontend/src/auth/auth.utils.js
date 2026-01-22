export const parseJwt = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));

    return {
      id: payload.id,                 // ✅ REQUIRED
      username: payload.username,     // ✅ REQUIRED
      email: payload.sub,
      role: payload.role,
    };
  } catch (e) {
    console.error("JWT parse error", e);
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};
