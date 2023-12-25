import { Badge } from '@mui/material';

// project imports
import AvatarStatus from './AvatarStatus';
import LetterAvatar from '@/components/LetterAvatar';

// TODO: Add these features to backend
interface Conversation {
  online_status?: string;
  name: string;
  avatar?: string;
}

interface ConversationAvatarProps {
  conversation: Conversation;
}

const UserAvatar: React.FC<ConversationAvatarProps> = ({ conversation }) => {
  return (
    <Badge
      overlap="circular"
      badgeContent={<AvatarStatus status="available" />}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <LetterAvatar name={conversation?.name} />
    </Badge>
  );
};

export default UserAvatar;
