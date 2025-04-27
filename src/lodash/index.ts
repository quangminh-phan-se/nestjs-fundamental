export const isEmpty = (obj: unknown): boolean => {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.length === 0;
    }

    return Object.entries(obj).length === 0;
  }

  return false;
};
