// server/services/turnstile.ts
// Cloudflare Turnstile token verification service.
// Only invoked when the IP rate limit threshold is exceeded (progressive challenge).

const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY!;
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export type TurnstileVerifyResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Verify a Cloudflare Turnstile token submitted by the frontend.
 * Called only when the IP has exceeded the rate limit threshold.
 *
 * @param token - The turnstile token from the client (x-turnstile-token header)
 * @param remoteip - The IP address of the client (optional but recommended)
 */
export async function verifyTurnstileToken(
  token: string,
  remoteip?: string
): Promise<TurnstileVerifyResult> {
  const formData = new URLSearchParams({
    secret: TURNSTILE_SECRET_KEY,
    response: token,
  });

  if (remoteip) {
    formData.append('remoteip', remoteip);
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const data = await response.json() as {
      success: boolean;
      'error-codes'?: string[];
    };

    if (!data.success) {
      const errorCode = data['error-codes']?.[0] ?? 'unknown-error';
      return { success: false, error: errorCode };
    }

    return { success: true };
  } catch (err) {
    console.error('[Turnstile] Verification error:', err);
    return { success: false, error: 'verification-failed' };
  }
}
