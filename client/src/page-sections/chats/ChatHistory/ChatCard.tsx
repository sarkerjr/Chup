import React from 'react';
import { Card, CardContent, Grid, Typography, Tooltip } from '@mui/material';
import dayjs from '@/utils/dayjs';

// assets
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';

// project imports
import { Message } from '@/lib/types';

interface ChatCardProps {
  message: Message;
  alignment: 'left' | 'right';
}

const ChatCard: React.FC<ChatCardProps> = ({ message, alignment }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={
          message?.status === 'DELIVERED' || message?.status === 'ERROR'
            ? 11.7
            : 12
        }
      >
        <Card
          sx={{
            display: 'inline-block',
            float: alignment,
            bgcolor: alignment === 'left' ? '#ede7f6' : '#e3f2fd',
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
                <Typography align="right" variant="subtitle2" color="#9e9e9e">
                  {dayjs(message?.createdAt).format('hh:mm A')}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {message?.status === 'DELIVERED' && (
        <Grid item xs={0.3} position="relative">
          <Tooltip title="Message Delivered." placement="top" arrow>
            <DoneIcon
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                fontSize: 'medium',
              }}
            />
          </Tooltip>
        </Grid>
      )}

      {message?.status === 'ERROR' && (
        <Grid item xs={0.3} position="relative">
          <Tooltip title="The message couldn't be sent!" placement="top" arrow>
            <ErrorIcon
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                color: 'error.main',
                fontSize: 'medium',
              }}
            />
          </Tooltip>
        </Grid>
      )}

      {message?.status === 'SENDING' && (
        <Typography
          color="text.secondary"
          sx={{
            display: 'inline-block',
            ml: 'auto',
          }}
        >
          sending...
        </Typography>
      )}
    </Grid>
  );
};

export default ChatCard;
