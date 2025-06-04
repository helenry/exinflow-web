// utils/format.js
import { TRIM_FIELDS } from "../constants";

export const trimStrings = (input) => {
  const trimmed = { ...input };
  TRIM_FIELDS.forEach((field) => {
    if (typeof trimmed[field] === "string") {
      trimmed[field] = trimmed[field].trim();
    }
  });
  return trimmed;
};

export const normalizeString = (input) => input.toLowerCase();
