import Avatar from "@mui/material/Avatar";
import { useCurrentUser } from '../shared/hooks/useCurrentUser'

export function UserAvatar({ size = 24, children }) {
  const user = useCurrentUser();
  const fullnameAbbr = [
    user?.profile.firstName[0].toUpperCase(),
    user?.profile.lastName[0].toUpperCase()
  ].join('');
  return (
    <Avatar
      src={user?.avatar}
      alt="User avatar"
      sx={{
        width: size,
        height: size,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {fullnameAbbr}
    </Avatar>
  );
}
