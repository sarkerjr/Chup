import express from 'express';
import {
  createConversation,
  getConversation,
  getConversations,
  updateConversation,
  deleteConversation,
} from 'controllers/conversation.controllers';

const router = express.Router();

// Create a new conversation
router.post('/', createConversation);

// Get a conversation by ID
router.get('/:id', getConversation);

// Get all conversations
router.get('/', getConversations);

// Update a conversation by ID
router.put('/:id', updateConversation);

// Delete a conversation by ID
router.delete('/:id', deleteConversation);

export default router;
