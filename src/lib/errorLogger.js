// src/lib/errorLogger.js
// Client-side error logging helper

export const logError = async (errorMessage, context, additionalInfo = {}) => {
  try {
    const response = await fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: additionalInfo.userId,
        errorMessage,
        errorStack: additionalInfo.stack,
        context,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    })

    if (!response.ok) {
      console.warn('Could not log error to server')
    }
  } catch (err) {
    console.warn('Error logging failed:', err)
    // Don't throw — we don't want error logging to break the app
  }
}