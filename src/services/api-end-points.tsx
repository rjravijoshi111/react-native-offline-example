export function getBaseURL() {
  return 'https://api.nitrx.com/api/v1/';
}
export function getImageBaseURL() {
  return 'https://api.nitrx.com';
}

export function getLogin() {
  return getBaseURL() + 'auth/login/';
}

export function createPost() {
  return getBaseURL() + 'posts/';
}

export function getMyPost() {
  return getBaseURL() + 'posts/';
}
