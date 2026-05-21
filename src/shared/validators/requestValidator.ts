export function validateRequest(request: any): { valid: boolean; error?: string } {
  if (!request.url) return { valid: false, error: 'URL is required' };
  try {
    new URL(request.url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL' };
  }
}