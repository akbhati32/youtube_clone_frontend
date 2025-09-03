
/**
 * Format large numbers into human-readable view counts.
 *
 * @param {number} num - The number of views.
 * @returns {string} - Formatted string (e.g., "1K", "2.5M").
 *
 */
export const formatViews = (num) => {
  // Validate input
  if (typeof num !== "number" || isNaN(num)) return "0";

  // 1M or more → format as M
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';

  // 1K or more → format as K
  if (num >= 1_000)
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';

  // Less than 1K → return as-is
  return num.toString();
};
