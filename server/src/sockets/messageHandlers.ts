import { Socket } from 'socket.io';

import messageServices from '@/services/message.services';

// TODO: implement async handler
export const handleMessageEvents = (socket: Socket) => {
  socket.on('newMessage', async (message, callback) => {
    try {
      const newMessage = await messageServices.createMessage(
        socket.data.user.id,
        message.conversationId,
        message.messageText
      );

      callback({
        status: 'success',
        localMessageId: message.localMessageId,
        data: newMessage,
      });

      socket.to(message.conversationId).emit('newMessage', newMessage);
    } catch (err) {
      callback({
        status: 'error',
        localMessageId: message.localMessageId,
        data: err,
      });
    }
  });

  socket.on('messageSeen', async (message, callback) => {
    try {
      const seenMessage = await messageServices.seenMessage(
        message.id,
        message.conversationId,
        socket.data.user.id
      );

      await callback({
        status: 'success',
        data: seenMessage,
      });
    } catch (err) {
      callback({
        status: 'error',
        data: err,
      });
    }
  });
};
