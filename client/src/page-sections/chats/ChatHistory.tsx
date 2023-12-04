import { Fragment, FC, useLayoutEffect, useRef } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from '@/utils/const';

interface ChatHistoryProps {
  theme: any;
  data: any[];
  user: any;
}

const ChatHistory: FC<ChatHistoryProps> = ({ data, theme, user }) => {
  const scrollRef = useRef<HTMLSpanElement | null>(null);

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
            {data.map((history, index) => (
              <Fragment key={index}>
                {history.from !== user.name ? (
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
                                  {history.text}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  align="right"
                                  variant="subtitle2"
                                  color="#9e9e9e"
                                >
                                  {history.time}
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
                                  {history.text}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography
                                  align="right"
                                  variant="subtitle2"
                                  color="#9e9e9e"
                                >
                                  {history.time}
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
