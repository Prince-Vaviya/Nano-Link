const STORAGE_KEY = 'nanolink_urls';

export function generateShortCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function validateCustomSlug(slug) {
  if (!slug || slug.trim().length === 0) {
    return { valid: false, error: 'Slug cannot be empty' };
  }

  if (slug.length < 3) {
    return { valid: false, error: 'Slug must be at least 3 characters' };
  }

  if (slug.length > 20) {
    return { valid: false, error: 'Slug must be 20 characters or less' };
  }

  const validPattern = /^[a-zA-Z0-9-]+$/;
  if (!validPattern.test(slug)) {
    return { valid: false, error: 'Slug can only contain letters, numbers, and hyphens' };
  }

  return { valid: true, error: '' };
}

export function saveUrl(shortCode, targetUrl) {
  const urls = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : {};
  urls[shortCode] = {
    targetUrl
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
}

export function getTargetUrl(shortCode) {
  const urls = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : {};
  const entry = urls[shortCode];
  return entry ? entry.targetUrl : null;
}
