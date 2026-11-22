import Avatar from "@mui/material/Avatar";

export function UserAvatar({ size = 26, children }) {
  //const { user } = useCurrentUser();

  return (
    <Avatar
      alt="User Avatar"
      sx={{
        width: size,
        height: size,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {children}
    </Avatar>
  );
}
