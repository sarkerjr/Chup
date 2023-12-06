import { Fragment, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from '@/utils/dayjs';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from '@/utils/const';
import { Message } from '@/lib/types';
import { formatMessageTime } from '@/utils/dayjs';
import { useSelector } from '@/store';
import { useReadMessagesQuery } from '@/store/services/chat.service';

const ChatHistory = () => {
  const scrollRef = useRef<HTMLSpanElement | null>(null);

  const { user } = useSelector((state) => state.auth);

  const { chatId } = useParams();
  const { data } = useReadMessagesQuery(chatId!);

  useLayoutEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollIntoView();
    }
  });

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        minHeight: 525,
        height: 'calc(100% - 440px)',
        width: '100%',
        px: 2,
      }}
    >
      <CardContent>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {data?.map((message: Message) => (
              <Fragment key={message?.id}>
                {message?.sender?.id === user?.id ? (
                  <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={2} />
                      <Grid item xs={10}>
                        <Card
                          sx={{
                            display: 'inline-block',
                            float: 'right',
                            bgcolor: '#e3f2fd',
                          }}
                          elevation={0}
                        >
                          <CardContent
                            sx={{
                              p: 2,
                              pb: '16px !important',
                              width: 'fit-content',
                              ml: 'auto',
                            }}
                          >
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="#616161">
                                  {message?.messageText}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  align="right"
                                  variant="subtitle2"
                                  color="#9e9e9e"
                                >
                                  {dayjs(message?.createdAt).format('hh:mm A')}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={7}>
                        <Card
                          sx={{
                            display: 'inline-block',
                            float: 'left',
                            background: '#ede7f6',
                          }}
                          elevation={0}
                        >
                          <CardContent sx={{ p: 2, pb: '16px !important' }}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <Typography variant="body2" color="#616161">
                                  {message?.messageText}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  align="right"
                                  variant="subtitle2"
                                  color="#9e9e9e"
                                >
                                  {dayjs(message?.createdAt).format('hh:mm A')}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
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
