import { Fragment, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CardContent, Grid } from '@mui/material';

// project imports
import { gridSpacing } from '@/utils/const';
import { Message } from '@/lib/types';
import ChatCard from './ChatCard';
import { useSelector, useDispatch } from '@/store';
import { useReadMessagesQuery, chatApi } from '@/store/services/chat.service';
import { useSocketEvent } from '@/hooks/useSocketEvent';

const ChatHistory = () => {
  const scrollRef = useRef<HTMLSpanElement | null>(null);

  const { user } = useSelector((state) => state.auth);
  const { chatId } = useParams();
  const { data: messages } = useReadMessagesQuery(chatId!);

  const dispatch = useDispatch();

  // update seen message status
  const messageSeen = useSocketEvent('messageSeen');
  useEffect(() => {
    user &&
      messages?.forEach((message: Message) => {
        if (
          message?.sender?.id !== user?.id &&
          !message?.seenIds?.includes(user?.id)
        ) {
          messageSeen({ id: message?.id, conversationId: chatId });
        }
      });
  }, [messages, user]);

  // update the cache with new message through socket
  useSocketEvent('newMessage', (newMessage) => {
    if (chatId) {
      dispatch(
        chatApi.util.updateQueryData('readMessages', chatId, (draft) => {
          // Add the new message to the draft data
          draft.push(newMessage);
        })
      );
    }
  });

  useLayoutEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView();
    }
  });

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        overflowY: 'scroll',
        minHeight: 525,
        height: 'calc(100% - 440px)',
        width: '100%',
        px: 2,
      }}
    >
      <CardContent>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {messages?.map((message: Message) => (
              <Fragment key={message?.id || message?.localMessageId}>
                {message?.sender?.id === user?.id ? (
                  <Grid item xs={12}>
                    <ChatCard message={message} alignment="right" />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <ChatCard message={message} alignment="left" />
                  </Grid>
                )}
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </CardContent>
      <span ref={scrollRef} />
    </Box>
  );
};

export default ChatHistory;
