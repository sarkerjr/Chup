import { Fragment, MouseEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

// assets
import CircleIcon from '@mui/icons-material/Circle';

// project imports
import UserAvatar from './UserAvatar';
import { Conversation } from '@/lib/types';
import { formatMessageTime } from '@/utils/dayjs';
import { useSocketEvent } from '@/hooks/useSocketEvent';
import { useSelector } from '@/store';
import { useReadChatsQuery } from '@/store/services/chat.service';

interface UserListProps {
  setConversation: (user: any) => void;
}

const UserList: React.FC<UserListProps> = ({ setConversation }) => {
  const { user } = useSelector((state) => state.auth);
  const { data } = useReadChatsQuery();

  const navigate = useNavigate();

  const connectToRoom = useSocketEvent('joinRoom');

  const handleClick = (conversation: any) => (event: MouseEvent) => {
    event.preventDefault();
    setConversation(conversation);
    navigate(`/chat/${conversation.id}`);
  };

  // Check if the message is seen by the user
  const isMessageSeen = (seenList: string[]): boolean => {
    return seenList?.includes(user?.id ?? '');
  };

  return (
    <List component="nav">
      <Divider />
      {data?.map((conversation: Conversation) => {
        connectToRoom(conversation.id);
        return (
          <Fragment key={conversation.id}>
            <ListItemButton onClick={handleClick(conversation)}>
              <ListItemAvatar>
                <UserAvatar conversation={conversation} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    component="span"
                  >
                    <Grid item xs zeroMinWidth component="span">
                      <Typography
                        color="inherit"
                        component="span"
                        sx={{
                          fontSize: '14px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'block',
                          fontWeight: isMessageSeen(
                            conversation?.messages[0]?.seenIds
                          )
                            ? 'regular'
                            : 'bold',
                        }}
                      >
                        {conversation?.name}
                      </Typography>
                    </Grid>
                    <Grid item component="span">
                      <Typography
                        component="span"
                        sx={{
                          fontSize: '12px',
                        }}
                      >
                        {formatMessageTime(conversation?.lastMessageAt)}
                      </Typography>
                    </Grid>
                  </Grid>
                }
                secondary={
                  <Grid
                    container
                    alignItems="center"
                    spacing={1}
                    component="span"
                  >
                    <Grid item xs zeroMinWidth component="span">
                      <Typography
                        variant="caption"
                        component="span"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'block',
                          fontWeight: isMessageSeen(
                            conversation?.messages[0]?.seenIds
                          )
                            ? 'light'
                            : 'bold',
                        }}
                      >
                        {conversation?.messages[0]?.messageText ||
                          'Start Conversation...'}
                      </Typography>
                    </Grid>

                    <Grid item component="span">
                      {!isMessageSeen(conversation?.messages[0]?.seenIds) && (
                        <CircleIcon
                          color="secondary"
                          sx={{
                            width: '10px',
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                }
              />
            </ListItemButton>
            <Divider />
          </Fragment>
        );
      })}
    </List>
  );
};

export default UserList;
