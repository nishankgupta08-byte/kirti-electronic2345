export const formatDate = (date: any): string => {
  if (!date) return 'N/A';

  let d: Date;

  if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'number') {
    d = new Date(date);
  } else if (typeof date === 'string') {
    d = new Date(date);
  } else if (date?.seconds) {
    d = new Date(date.seconds * 1000);
  } else {
    return 'N/A';
  }

  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatDateTime = (date: any): string => {
  if (!date) return 'N/A';

  let d: Date;

  if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'number') {
    d = new Date(date);
  } else if (typeof date === 'string') {
    d = new Date(date);
  } else if (date?.seconds) {
    d = new Date(date.seconds * 1000);
  } else {
    return 'N/A';
  }

  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
