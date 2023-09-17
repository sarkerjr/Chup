import { useState, Fragment, MouseEvent } from 'react';

import {
  Chip,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

// project imports
import UserAvatar from './UserAvatar';
import { users } from '@/mockData/chat';

interface UserListProps {
  setUser: (user: any) => void;
}

const UserList: React.FC<UserListProps> = ({ setUser }) => {
  const [data, setData] = useState<any[]>(users);

  const handleUserClick = (user: any) => (event: MouseEvent) => {
    event.preventDefault();
    setUser(user);
  };

  return (
    <List component="nav">
      {data.map((user) => (
        <Fragment key={user.id}>
          <ListItemButton onClick={handleUserClick(user)}>
            <ListItemAvatar>
              <UserAvatar user={user} />
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
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block',
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Grid>
                  <Grid item component="span">
                    <Typography
                      component="span"
                      sx={{
                        fontSize: '12px',
                      }}
                    >
                      {user.lastMessage}
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
                      }}
                    >
                      {user.status}
                    </Typography>
                  </Grid>
                  <Grid item component="span">
                    {user.unReadChatCount !== 0 && (
                      <Chip
                        label={user.unReadChatCount}
                        component="span"
                        color="secondary"
                        sx={{
                          width: 20,
                          height: 20,
                          '& .MuiChip-label': {
                            px: 0.5,
                          },
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
      ))}
    </List>
  );
};

export default UserList;
