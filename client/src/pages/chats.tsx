import { FC, MouseEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
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

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import MoodTwoToneIcon from '@mui/icons-material/MoodTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

// project imports
import { Conversation } from '@/lib/types';
import ChatDrawer from '@/page-sections/chats/ChatDrawer';
import UserDetails from '@/page-sections/chats/UserDetails';
import { openDrawer } from '@/store/slices/menu.slice';
import MainCard from '@/components/MainCard';
import LetterAvatar from '@/components/LetterAvatar';
import { appDrawerWidth as drawerWidth, gridSpacing } from '@/utils/const';
import { useDispatch, useSelector } from 'store';
import { useSendMessageMutation } from '@/store/services/chat.service';

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: { theme: any; open: boolean }) => ({
    flexGrow: 1,
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
  const { user } = useSelector((state) => state.auth);

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

  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    // hide left drawer when email app opens
    dispatch(openDrawer(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle new message form
  const [message, setMessage] = useState<string>('');

  const { chatId } = useParams<{ chatId: string }>();
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleOnSend = () => {
    if (!chatId) return;
    setMessage('');
    sendMessage({ conversationId: chatId, messageText: message });
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event?.key !== 'Enter') {
      return;
    }
    handleOnSend();
  };

  // handle emoji
  const onEmojiClick = (
    _event: MouseEvent<Element, MouseEvent>,
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

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Chat Drawer Section */}
      <ChatDrawer
        openChatDrawer={openChatDrawer}
        handleDrawerOpen={handleDrawerOpen}
        setConversation={setConversation}
      />

      {/* Main Chat Section */}
      <Main theme={theme} open={openChatDrawer}>
        <Grid container height="100%" columnSpacing={gridSpacing}>
          <Grid
            item
            xs
            zeroMinWidth
            sx={{
              display: emailDetails ? { xs: 'none', sm: 'flex' } : 'flex',
              height: '100%',
            }}
          >
            <MainCard
              sx={{
                bgcolor: 'grey.50',
              }}
              contentSX={{ height: '100%' }}
            >
              <Grid container height="100%">
                {/* Chat Header */}
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
                          <LetterAvatar name={conversation?.name ?? ''} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                          <Grid container spacing={0} alignItems="center">
                            <Grid item xs={12}>
                              <Typography
                                component="div"
                                sx={{ fontSize: '16px', fontWeight: 600 }}
                              >
                                {/* TODO: feat add to backend */}
                                {conversation?.name}{' '}
                                {/* {conversation?.online_status && (
                                  <AvatarStatus
                                    status={conversation?.online_status}
                                  />
                                )} */}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="caption">
                                {/* TODO: feat add to backend */}
                                Last seen {'2 hours ago'}
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

                {/* Chat History */}
                <Outlet />

                {/* Chat Input */}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                      >
                        <SendTwoToneIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>

          {/* User Details */}
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
              <UserDetails user={{}} />
            </Grid>
          )}
        </Grid>
      </Main>
    </Box>
  );
};

export default Chats;
