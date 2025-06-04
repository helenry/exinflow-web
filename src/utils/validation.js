// utils/validation.js
import { normalizeString } from './format';

export const validateUniqueName = (existing, name, excludeId = null) => {
  const normalized = normalizeString(name);
  return !existing.some(
    e =>
      normalizeString(e.name) === normalized &&
      (!excludeId || e.id !== excludeId)
  );
};
