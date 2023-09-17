import React, { useState } from 'react';

import {
  Box,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme, Theme } from '@mui/material/styles';

// project imports
import UserList from './UserList';
import AvatarStatus from './AvatarStatus';
import UserAvatar from './UserAvatar';
import MainCard from '@/components/MainCard';
import { appDrawerWidth as drawerWidth, gridSpacing } from '@/utils/const';

// assets
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ChatDrawerProps {
  handleDrawerOpen: () => void;
  openChatDrawer: boolean;
  setUser: (user: any) => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({
  handleDrawerOpen,
  openChatDrawer,
  setUser,
}) => {
  const theme = useTheme<Theme>();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

  // show menu to set current user status
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickRightMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseRightMenu = () => {
    setAnchorEl(null);
  };

  // set user status on status menu click
  const [status, setStatus] = useState('available');

  const handleRightMenuItemClick = (userStatus: string) => () => {
    setStatus(userStatus);
    handleCloseRightMenu();
  };

  const drawerBG = 'grey.50';

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: { xs: 1100, lg: 0 },
        '& .MuiDrawer-paper': {
          height: matchDownLG ? '100%' : 'auto',
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'relative',
          border: 'none',
          borderRadius: matchDownLG ? 'none' : `8px`,
          boxShadow: '1px 0px 2px 0px #A6B0C3',
        },
      }}
      variant={matchDownLG ? 'temporary' : 'persistent'}
      anchor="left"
      open={openChatDrawer}
      ModalProps={{ keepMounted: true }}
      onClose={handleDrawerOpen}
    >
      {openChatDrawer && (
        <MainCard
          sx={{
            bgcolor: matchDownLG ? 'transparent' : drawerBG,
          }}
          content={false}
        >
          <Box sx={{ p: 3, pb: 2 }}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ flexWrap: 'nowrap' }}
                >
                  <Grid item>
                    <UserAvatar
                      user={{
                        online_status: status,
                        avatar: 'avatar-5.png',
                        name: 'User 1',
                      }}
                    />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography align="left" fontSize="16px" fontWeight="bold">
                      Anik Sarker
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton onClick={handleClickRightMenu} size="large">
                      <ExpandMoreIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleCloseRightMenu}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleRightMenuItemClick('available')}>
                        <AvatarStatus status="available" mr={1} />
                        Available
                      </MenuItem>
                      <MenuItem
                        onClick={handleRightMenuItemClick('do_not_disturb')}
                      >
                        <AvatarStatus status="do_not_disturb" mr={1} />
                        Do not disturb
                      </MenuItem>
                      <MenuItem onClick={handleRightMenuItemClick('offline')}>
                        <AvatarStatus status="offline" mr={1} />
                        Offline
                      </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <OutlinedInput
                  fullWidth
                  id="input-search-header"
                  placeholder="Search Mail"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchTwoToneIcon fontSize="small" />
                    </InputAdornment>
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              pt: 0,
              overflowX: 'hidden',
              height: matchDownLG
                ? 'calc(100vh - 190px)'
                : 'calc(100vh - 445px)',
              minHeight: matchDownLG ? 0 : 520,
            }}
          >
            <UserList setUser={setUser} />
          </Box>
        </MainCard>
      )}
    </Drawer>
  );
};

export default ChatDrawer;
