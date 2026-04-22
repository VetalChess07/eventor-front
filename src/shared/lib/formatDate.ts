export const formatDate = (date: any): string => {
  if (!date) return '';
  // dayjs
  if (typeof date.format === 'function') {
    return date.format('YYYY-MM-DD');
  }
  // Date
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  // строка
  if (typeof date === 'string') {
    return date;
  }
  return '';
};
