// Validate certain input fields
export const emailChecker = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@.]+\.[^\s@.]{3}$/;
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

export const phoneNumberChecker = (value) => {
  const phoneRegex = /^\+\d{3}\s\d{2}\s\d{3}\s\d{3,4}$/;
  return phoneRegex.test(value);
};
