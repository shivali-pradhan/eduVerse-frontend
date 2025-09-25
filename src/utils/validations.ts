export function validatePassword(password: string) {
  if (password.trim()) {
    if (password.length < 8) {
      return {error: "Password must be at least 8 characters long"};
    } else if (!/[A-Z]/.test(password)) {
      return {error: "Password must include an uppercase letter"};
    } else if (!/[a-z]/.test(password)) {
      return {error: "Password must include an lowercase letter"};
    } else if (!/[0-9]/.test(password)) {
      return {error: "Password must include a digit"};
    } else if (!/[!@#$%^&*()]/.test(password)) {
      return {error: "Password must include a special character"};
    } else if (/\s/.test(password)) {
      return {error: "Password cannot contain spaces"};
    } else {
      return null;
    }
  }
}

export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.trim() && !regex.test(email)) {
    return {error: "Not a valid email address"};
  } else {
    return null
  }
}

export function validateUsername(username: string) {
  if (username.trim() && /\s/.test(username)) {
    return {error: "Username cannot contain spaces"};
  } else {
    return null;
  }
}