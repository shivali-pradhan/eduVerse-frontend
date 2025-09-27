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
    } 
  }
}
export function validateFirstName(firstName: string) {
  if (firstName.trim()) {
    if (/\s/.test(firstName)) return {error: "First name cannot contain spaces"};
    else if (firstName.length < 3 || firstName.length > 50) return {error: "First name must be 3-50 characters"};
  }
} 
export function validateLastName(lastName: string) {
  if (lastName.trim()) {
    if (/\s/.test(lastName)) return {error: "Last name cannot contain spaces"};
    else if (lastName.length < 3 || lastName.length > 50) return {error: "Last name must be 3-50 characters"};
  }
}
export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.trim() && !regex.test(email)) return {error: "Not a valid email address"};
}
export function validateUsername(username: string) {
  if (username.trim()) {
    if (/\s/.test(username)) return {error: "Username cannot contain spaces"};
    else if (username.length < 3 || username.length > 50) return {error: "Username must be 3-20 characters"};
  }
}

