import { Avatar, Badge } from '@mui/material';
import AvatarStatus from './AvatarStatus';

// assets
// TODO: Fix this import error
import default_avatar from '@/assets/images/users/avatar-1.png';

interface User {
  online_status: string;
  name: string;
  avatar: string;
}

interface UserAvatarProps {
  user: User;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const { online_status, name } = user;

  return (
    <Badge
      overlap="circular"
      badgeContent={<AvatarStatus status={online_status} />}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Avatar alt={name} src={default_avatar} />
    </Badge>
  );
};

export default UserAvatar;
