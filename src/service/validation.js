// Validate certain input fields
export const emailChecker = (value) => {
  const emailRegex = /^[^\s@.]+@[^\s@.]+\.[^\s@.]{3}$/;
  return emailRegex.test(value);
};

export const passwordChecker = (value) => {
  const passwordRegex = /\S{4,}/;
  return passwordRegex.test(value);
};

export const indexNumberChecker = (value) => {
  const indexRegex = /^\d+-\d{4}$/;
  return indexRegex.test(value);
};
