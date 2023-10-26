export const isEmailValid = (email) =>
  email
    .trim()
    .match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

export const isPasswordValid = (password) =>
  password
    .trim()
    .match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );

export const isUsernameValid = (username) =>
  username.trim().match(/^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/);

export const isMobileValid = (username) =>
  username.trim().match(/^(\+\d{1,3}[- ]?)?[6789]\d{9}$/);
