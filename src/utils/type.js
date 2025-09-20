// utils/type.js
import { Timestamp } from "firebase/firestore";

export const convertFirestoreTimestamps = (data) => ({
  ...data,
  created_at:
    data.created_at instanceof Timestamp
      ? data.created_at.toDate()
      : data.created_at,
  updated_at:
    data.updated_at instanceof Timestamp
      ? data.updated_at.toDate()
      : data.updated_at,
});

export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
