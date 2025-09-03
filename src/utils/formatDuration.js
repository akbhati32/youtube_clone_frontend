/**
 * Format video duration in seconds into a human-readable string.
 *
 * @param {number} seconds - Duration in seconds.
 * @returns {string} - Formatted duration (H:MM:SS or M:SS).
 *
 * Examples:
 *   formatDuration(65)   -> "1:05"
 *   formatDuration(3661) -> "1:01:01"
 */
export const formatDuration = (seconds) => {
  // Guard clause: handle invalid input
  if (!seconds || isNaN(seconds)) return "0:00";

  // Calculate hours, minutes, and seconds
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const paddedSecs = secs < 10 ? `0${secs}` : secs;
  const paddedMins = hrs > 0 && mins < 10 ? `0${mins}` : mins;

  // Format as H:MM:SS if hours exist, otherwise as M:SS
  return hrs > 0
    ? `${hrs}:${paddedMins}:${paddedSecs}`
    : `${mins}:${paddedSecs}`;
};