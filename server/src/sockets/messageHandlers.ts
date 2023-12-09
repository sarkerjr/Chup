import { Socket } from 'socket.io';

import messageServices from '@/services/message.services';

// TODO: implement async handler
export const handleMessageEvents = (socket: Socket, iosocket: any) => {
  socket.on('newMessage', async (message) => {
    try {
      const newMessage = await messageServices.createMessage(
        socket.data.user.id,
        message.conversationId,
        message.messageText
      );

      console.log('reached here', newMessage);

      socket.to(message.conversationId).emit('newMessage', newMessage);
    } catch (err) {
      console.log(err);
    }
  });
};
