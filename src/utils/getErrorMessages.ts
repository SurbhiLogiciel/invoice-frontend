export function getErrorMessage(customMessages?: {
  [key: number]: string;
}): (statusCode: number) => string {
  return (statusCode: number): string => {
    if (customMessages && customMessages[statusCode]) {
      return customMessages[statusCode];
    }

    return 'An unexpected error occurred.';
  };
}
