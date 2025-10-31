fillEmptyValues(obj: any) {
  if (obj === null || typeof obj !== 'object') {
    return obj ?? '';
  }

  const result = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (value && typeof value === 'object') {
        // Recursively process nested objects or arrays
        result[key] = fillEmptyValues(value);
      } else {
        // Assign value or empty string if falsy (null, undefined, '', 0 excluded)
        result[key] = (value !== null && value !== undefined) ? value : '';
      }
    }
  }

  return result;
}
