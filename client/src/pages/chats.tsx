import { FC, MouseEvent, KeyboardEvent, useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';

import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  Popper,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

// project imports
import UserDetails from '@/page-sections/chats/UserDetails';
import ChatDrawer from '@/page-sections/chats/ChatDrawer';
import ChatHistory from '@/page-sections/chats/ChatHistory';
import AvatarStatus from '@/page-sections/chats/AvatarStatus';
import { openDrawer } from '@/store/slices/menu.slice';
import MainCard from '@/components/MainCard';
import Avatar from '@/components/Avatar';
import { appDrawerWidth as drawerWidth, gridSpacing } from '@/utils/const';
import { useDispatch } from 'store';
import { users, chatHistories } from '@/mockData/chat';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import MoodTwoToneIcon from '@mui/icons-material/MoodTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
// TODO: Fix this import error
import default_avatar from '@/assets/images/users/avatar-1.png';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: { theme: any; open: boolean }) => ({
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0,
      marginLeft: 0,
    },
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter,
      }),
      marginLeft: 0,
    }),
  })
);

const Chats: FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));

  const dispatch = useDispatch();

  // set chat details page open when user is selected from sidebar
  const [emailDetails, setEmailDetails] = useState<boolean>(false);
  const handleUserChange = () => {
    setEmailDetails((prev) => !prev);
  };

  // toggle sidebar
  const [openChatDrawer, setOpenChatDrawer] = useState<boolean>(true);
  const handleDrawerOpen = () => {
    setOpenChatDrawer((prevState) => !prevState);
  };

  // close sidebar when widow size below 'md' breakpoint
  useEffect(() => {
    setOpenChatDrawer(!matchDownSM);
  }, [matchDownSM]);

  const [user, setUser] = useState<any>(users[0]);
  const [data, setData] = useState<any[]>(chatHistories);

  useEffect(() => {
    // hide left drawer when email app opens
    dispatch(openDrawer(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle new message form
  const [message, setMessage] = useState<string>('');
  const handleOnSend = () => {
    const d = new Date();
    setMessage('');
    const newMessage = {
      from: 'User1',
      to: user?.name,
      text: message,
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setData((prevState) => [...prevState, newMessage]);
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  // handle emoji
  const onEmojiClick = (
    event: MouseEvent<Element, MouseEvent>,
    emojiObject: any
  ) => {
    setMessage(message + emojiObject.emoji);
  };

  const [anchorElEmoji, setAnchorElEmoji] = useState<HTMLElement | undefined>(
    undefined
  );
  const handleOnEmojiButtonClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElEmoji(anchorElEmoji ? undefined : event?.currentTarget);
  };

  const emojiOpen = Boolean(anchorElEmoji);
  const emojiId = emojiOpen ? 'simple-popper' : undefined;
  const handleCloseEmoji = () => {
    setAnchorElEmoji(undefined);
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: 'flex', height: '92dvh' }}>
      {/* Chat Drawer Section */}
      <ChatDrawer
        openChatDrawer={openChatDrawer}
        handleDrawerOpen={handleDrawerOpen}
        setUser={setUser}
      />

      {/* Main Chat Section */}
      <Main theme={theme} open={openChatDrawer}>
        <Grid container spacing={gridSpacing}>
          <Grid
            item
            xs
            zeroMinWidth
            sx={{ display: emailDetails ? { xs: 'none', sm: 'flex' } : 'flex' }}
          >
            <MainCard
              sx={{
                bgcolor: 'grey.50',
              }}
            >
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Grid container alignItems="center" spacing={0.5}>
                    <Grid item>
                      <IconButton onClick={handleDrawerOpen} size="large">
                        <MenuRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        sx={{ flexWrap: 'nowrap' }}
                      >
                        <Grid item>
                          <Avatar alt={user?.name} src={default_avatar} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Grid container spacing={0} alignItems="center">
                            <Grid item xs={12}>
                              <Typography
                                component="div"
                                sx={{ fontSize: '16px', fontWeight: 600 }}
                              >
                                {user?.name}{' '}
                                {user?.online_status && (
                                  <AvatarStatus status={user?.online_status} />
                                )}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="caption">
                                Last seen {user?.lastMessage}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm zeroMinWidth />
                    <Grid item>
                      <IconButton size="large">
                        <CallTwoToneIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton size="large">
                        <VideoCallTwoToneIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={handleUserChange} size="large">
                        <ErrorTwoToneIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: theme.spacing(2) }} />
                </Grid>

                <ChatHistory theme={theme} user={user} data={data} />

                <Grid item xs={12}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <IconButton
                        ref={anchorElEmoji}
                        aria-describedby={emojiId}
                        onClick={handleOnEmojiButtonClick}
                        size="large"
                      >
                        <MoodTwoToneIcon />
                      </IconButton>
                      <Popper
                        id={emojiId}
                        open={emojiOpen}
                        anchorEl={anchorElEmoji}
                        disablePortal
                        modifiers={[
                          {
                            name: 'offset',
                            options: {
                              offset: [-20, 20],
                            },
                          },
                        ]}
                      >
                        <ClickAwayListener onClickAway={handleCloseEmoji}>
                          <>
                            {emojiOpen && (
                              <MainCard content={false}>
                                <Picker
                                  onEmojiClick={onEmojiClick}
                                  disableAutoFocus
                                />
                              </MainCard>
                            )}
                          </>
                        </ClickAwayListener>
                      </Popper>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <TextField
                        fullWidth
                        label="Type a Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleEnter}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton size="large">
                        <AttachmentTwoToneIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={handleOnSend}
                        size="large"
                      >
                        <SendTwoToneIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {emailDetails && (
            <Grid item sx={{ margin: { xs: '0 auto', md: 'initial' } }}>
              <Box
                sx={{
                  display: { xs: 'block', sm: 'none', textAlign: 'right' },
                }}
              >
                <IconButton
                  onClick={handleUserChange}
                  sx={{ mb: -5 }}
                  size="large"
                >
                  <HighlightOffTwoToneIcon />
                </IconButton>
              </Box>
              <UserDetails user={user} />
            </Grid>
          )}
        </Grid>
      </Main>
    </Box>
  );
};

export default Chats;
