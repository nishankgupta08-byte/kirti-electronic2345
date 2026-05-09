import { Timestamp } from 'firebase/firestore';

export const formatFirebaseDate = (date: any): string => {
  if (!date) return 'N/A';
  
  let d: Date;
  
  if (date instanceof Timestamp) {
    d = date.toDate();
  } else if (typeof date === 'number') {
    d = new Date(date);
  } else if (date instanceof Date) {
    d = date;
  } else if (date?.seconds) {
    // Sometimes Firestore data comes back as a plain object with seconds/nanoseconds
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

export const formatFirebaseDateTime = (date: any): string => {
  if (!date) return 'N/A';
  
  let d: Date;
  
  if (date instanceof Timestamp) {
    d = date.toDate();
  } else if (typeof date === 'number') {
    d = new Date(date);
  } else if (date instanceof Date) {
    d = date;
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
