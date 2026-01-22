import api from "../services/apiClient";


export const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};


export const fetchPendingUsers = async () => {
  const { data } = await api.get("/users/pending");
  return data;
};


export const approveUser = async (id) => {
  await api.post(`/users/${id}/approve`);
};


export const declineUser = async (id) => {
  await api.delete(`/users/${id}`);
};


export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};


export const changeUserPassword = async ({ userId, password }) => {
  await api.put(`/users/admin/${userId}/password`, {
    password,
  });
};


export const fetchMyProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};


export const updateMyProfile = async (payload) => {
  const { data } = await api.put("/users/me", payload);
  return data;
};
