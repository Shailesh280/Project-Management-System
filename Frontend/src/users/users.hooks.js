import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  fetchPendingUsers,
  approveUser,
  declineUser,
  deleteUser,
  fetchMyProfile,
  updateMyProfile,
  changeUserPassword, // 👈 ADD THIS
} from "./users.api";

/**
 * ADMIN: FETCH ALL USERS
 */
export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

/**
 * ADMIN: FETCH PENDING APPROVAL USERS
 */
export const usePendingUsers = () =>
  useQuery({
    queryKey: ["pending-users"],
    queryFn: fetchPendingUsers,
  });

/**
 * ADMIN: APPROVE USER
 */
export const useApproveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["pending-users"]);
    },
  });
};

/**
 * ADMIN: DECLINE USER
 */
export const useDeclineUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: declineUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["pending-users"]);
    },
  });
};

/**
 * ADMIN: DELETE USER
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

/**
 * ADMIN: CHANGE USER PASSWORD
 */
export const useChangeUserPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};

/**
 * USER: FETCH MY PROFILE
 */
export const useMyProfile = () =>
  useQuery({
    queryKey: ["my-profile"],
    queryFn: fetchMyProfile,
  });

/**
 * USER: UPDATE MY PROFILE
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["my-profile"]);
    },
  });
};
