import UserProfileForm from "../components/UserProfileForm";
import { useMyProfile, useUpdateProfile } from "../users.hooks";

export default function UserProfile() {
  const { data, isLoading } = useMyProfile();
  const { mutate, isLoading: saving } = useUpdateProfile();

  if (isLoading) return null;

  return (
    <UserProfileForm
      initialValues={data}
      onSubmit={mutate}
      loading={saving}
    />
  );
}
