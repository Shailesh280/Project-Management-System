import UserProfileForm from "../components/UserProfileForm";
import { useMyProfile, useUpdateProfile } from "../users.hooks";
import api from "../../services/apiClient";
import { useAuthContext } from "../../auth/AuthContext";

export default function UserProfile() {
  const { data, isLoading } = useMyProfile();
  const { mutateAsync, isLoading: saving } = useUpdateProfile();
  const { refreshUser } = useAuthContext(); // ✅ ADD THIS

  if (isLoading) return null;

  return (
    <UserProfileForm
      initialValues={data}
      loading={saving}
      onSubmit={async (values) => {
        await api.put("/users/me", values);
        await refreshUser(); // ✅ header avatar updates
      }}
      onChangePassword={(password) =>
        api.put("/users/me/password", { password })
      }
    />
  );
}
