import api from "../services/apiClient";

/**
 * ADMIN: FETCH ALL USERS
 */
export const fetchUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};

/**
 * ADMIN: FETCH PENDING USERS
 */
export const fetchPendingUsers = async () => {
  const { data } = await api.get("/users/pending");
  return data;
};

/**
 * ADMIN: APPROVE USER
 */
export const approveUser = async (id) => {
  await api.post(`/users/${id}/approve`);
};

/**
 * ADMIN: DECLINE USER
 */
export const declineUser = async (id) => {
  await api.delete(`/users/${id}`);
};

/**
 * ADMIN: DELETE USER
 */
export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};

/**
 * ADMIN: CHANGE USER PASSWORD  ✅ NEW
 */
export const changeUserPassword = async ({ userId, password }) => {
  await api.put(`/users/admin/${userId}/password`, {
    password,
  });
};


/**
 * USER: FETCH MY PROFILE
 */
export const fetchMyProfile = async () => {
  const { data } = await api.get("/users/me");
  return data;
};

/**
 * USER: UPDATE MY PROFILE
 */
export const updateMyProfile = async (payload) => {
  const { data } = await api.put("/users/me/profile", payload);
  return data;
};
