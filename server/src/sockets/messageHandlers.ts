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
};
