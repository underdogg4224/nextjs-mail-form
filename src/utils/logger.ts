/**
 * Utility for printing colored debug messages
 * Enhances debugging by standardizing output formats
 */

// Message type definitions
type MessageType = 'error' | 'warning' | 'info' | 'success';

// Color codes for different message types
const COLORS = {
  error: '\x1b[31m', // Red
  warning: '\x1b[33m', // Yellow
  info: '\x1b[36m', // Cyan
  success: '\x1b[32m', // Green
  reset: '\x1b[0m' // Reset
};

/**
 * Print a formatted message with color coding based on message type
 * 
 * @param message - The message to print
 * @param type - The type of message (error, warning, info, success)
 */
export const print_message = (message: string, type: MessageType = 'info'): void => {
  if (process.env.NODE_ENV === 'development') {
    // In development, print to console with colors
    console.log(`${COLORS[type]}[${type.toUpperCase()}] ${message}${COLORS.reset}`);
  } else {
    // In production, use appropriate logging methods
    switch (type) {
      case 'error':
        console.error(`[${type.toUpperCase()}] ${message}`);
        break;
      case 'warning':
        console.warn(`[${type.toUpperCase()}] ${message}`);
        break;
      case 'info':
      case 'success':
      default:
        console.log(`[${type.toUpperCase()}] ${message}`);
        break;
    }
  }
};

/**
 * Log an error with stack trace
 * 
 * @param error - The error object
 * @param context - Additional context about where the error occurred
 */
export const log_error = (error: Error, context: string): void => {
  print_message(`${context}: ${error.message}`, 'error');
  if (process.env.NODE_ENV === 'development') {
    console.error(error.stack);
  }
};

/**
 * Log a success message
 * 
 * @param message - The success message
 */
export const log_success = (message: string): void => {
  print_message(message, 'success');
};

/**
 * Log a warning message
 * 
 * @param message - The warning message
 */
export const log_warning = (message: string): void => {
  print_message(message, 'warning');
};

/**
 * Log an info message
 * 
 * @param message - The info message
 */
export const log_info = (message: string): void => {
  print_message(message, 'info');
};