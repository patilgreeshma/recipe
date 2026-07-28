/**
 * Frontend API service with AbortController support.
 * Prevents stale responses from overwriting newer ones.
 */

let currentController = null;

/**
 * Generate a recipe from the given ingredients.
 * Automatically cancels any in-flight request to prevent stale responses.
 * 
 * @param {string} ingredients - Newline-separated ingredient list
 * @returns {Promise<object>} Validated recipe object
 */
export async function generateRecipe(ingredients) {
  // Cancel any in-flight request
  if (currentController) {
    currentController.abort();
  }

  currentController = new AbortController();
  const { signal } = currentController;

  try {
    const response = await fetch('/api/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
      signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error || `Server error (${response.status})`,
        errorData.code || 'SERVER_ERROR',
        response.status
      );
    }

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Request was cancelled.', 'CANCELLED', 0);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    // Network error
    if (!navigator.onLine) {
      throw new ApiError(
        'You appear to be offline. Please check your connection.',
        'OFFLINE',
        0
      );
    }

    throw new ApiError(
      'Failed to connect to the server. Please try again.',
      'NETWORK_ERROR',
      0
    );
  } finally {
    currentController = null;
  }
}

/**
 * Custom error class for API errors with error codes.
 */
export class ApiError extends Error {
  constructor(message, code, status) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}
