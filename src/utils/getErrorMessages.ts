// src/utils/getErrorMessage.ts
export function getErrorMessage(customMessages?: {
  [key: number]: string;
}): (statusCode: number) => string {
  return (statusCode: number): string => {
    // Return a custom message if provided for this status code
    if (customMessages && customMessages[statusCode]) {
      return customMessages[statusCode];
    }

    // If no message is found, return a generic message
    return 'An unexpected error occurred.';
  };
}
