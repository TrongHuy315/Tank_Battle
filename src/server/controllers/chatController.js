/**
 * Chat Controller
 * Handles chat-related HTTP requests and chat history
 */

const BaseController = require('./baseController');

class ChatController extends BaseController {
  constructor() {
    super();
    // Mock chat history storage (in production, this would be a database)
    this.chatHistory = [];
  }

  /**
   * Get chat history
   */
  getChatHistory(req, res) {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const history = this.chatHistory
        .slice(offset, offset + parseInt(limit))
        .reverse(); // Most recent first

      this.sendSuccess(res, history, 'Chat history retrieved successfully');
    } catch (error) {
      this.sendError(res, 'Failed to retrieve chat history', 500, error);
    }
  }

  /**
   * Get room chat history
   */
  getRoomChatHistory(req, res) {
    try {
      const { roomId } = req.params;
      const { limit = 50, offset = 0 } = req.query;
      
      const roomHistory = this.chatHistory
        .filter(msg => msg.roomId === roomId)
        .slice(offset, offset + parseInt(limit))
        .reverse();

      this.sendSuccess(res, roomHistory, 'Room chat history retrieved successfully');
    } catch (error) {
      this.sendError(res, 'Failed to retrieve room chat history', 500, error);
    }
  }

  /**
   * Store chat message (called internally)
   */
  storeChatMessage(messageData) {
    const message = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...messageData
    };

    this.chatHistory.push(message);
    
    // Keep only last 1000 messages
    if (this.chatHistory.length > 1000) {
      this.chatHistory = this.chatHistory.slice(-1000);
    }

    return message;
  }

  /**
   * Get chat statistics
   */
  getChatStats(req, res) {
    try {
      const stats = {
        totalMessages: this.chatHistory.length,
        publicMessages: this.chatHistory.filter(msg => msg.type === 'public').length,
        privateMessages: this.chatHistory.filter(msg => msg.type === 'private').length,
        roomMessages: this.chatHistory.filter(msg => msg.type === 'room').length,
        worldMessages: this.chatHistory.filter(msg => msg.type === 'world').length
      };

      this.sendSuccess(res, stats, 'Chat statistics retrieved successfully');
    } catch (error) {
      this.sendError(res, 'Failed to retrieve chat statistics', 500, error);
    }
  }
}

module.exports = ChatController;
