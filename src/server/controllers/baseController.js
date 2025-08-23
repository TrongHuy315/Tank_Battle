/**
 * Base Controller
 * Provides common functionality for all controllers
 */

class BaseController {
  /**
   * Send success response
   */
  sendSuccess(res, data = null, message = 'Success') {
    return res.json({
      success: true,
      message,
      data
    });
  }

  /**
   * Send error response
   */
  sendError(res, message = 'An error occurred', statusCode = 500, error = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(error && { error: error.message })
    });
  }

  /**
   * Handle async route errors
   */
  asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

module.exports = BaseController;
