import express from 'express';
import { createMessage, getMessages } from 'controllers/message.controllers';

const router = express.Router();

// Create a new message
router.post('/', createMessage);

// Get all messages from a conversation
router.get('/:id', getMessages);

// Get a message by ID
// router.get('/:id', getMessage);

// Update a message by ID
// router.put('/:id', updateMessage);

// Delete a message by ID
// router.delete('/:id', deleteMessage);

export default router;
