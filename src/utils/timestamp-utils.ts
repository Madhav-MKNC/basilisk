
export type TimeStamp = Date | number;

/**
 * Converts a timestamp to a number (milliseconds since epoch)
 */
export function timeStampToNumber(timestamp: TimeStamp): number {
  if (timestamp instanceof Date) {
    return timestamp.getTime();
  }
  return timestamp;
}

/**
 * Alias for timeStampToNumber for backward compatibility
 */
export const convertTimeStampToNumber = timeStampToNumber;

/**
 * Formats a timestamp as a relative time string (e.g. "5 minutes ago")
 */
export function formatRelativeTime(timestamp: TimeStamp): string {
  const now = Date.now();
  const time = timeStampToNumber(timestamp);
  const diff = now - time;
  
  // Convert to seconds
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) {
    return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
  }
  
  // Convert to minutes
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  }
  
  // Convert to hours
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  
  // Convert to days
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  
  // Convert to months
  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  
  // Convert to years
  const years = Math.floor(months / 12);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

/**
 * Calculates the progress percentage between a start time and now
 * or between a start time and an end time
 */
export function calculateProgressPercentage(startTime: TimeStamp, endTime: TimeStamp = Date.now()): number {
  const start = timeStampToNumber(startTime);
  const end = timeStampToNumber(endTime);
  const now = Date.now();
  
  // For past events (completed)
  if (end < now) {
    return 100;
  }
  
  // For future events (not yet started)
  if (start > now) {
    return 0;
  }
  
  // For ongoing events
  const totalDuration = end - start;
  const elapsed = now - start;
  const percentage = Math.floor((elapsed / totalDuration) * 100);
  
  return Math.min(Math.max(percentage, 0), 100); // Ensure between 0 and 100
}

/**
 * Gets the remaining time from now until the specified time
 * Returns a formatted string like "2d 5h" or "30m"
 */
export function getTimeRemaining(targetTime: TimeStamp): string {
  const now = Date.now();
  const target = timeStampToNumber(targetTime);
  let remaining = target - now;
  
  // If the time has passed, return "Completed"
  if (remaining <= 0) {
    return "Completed";
  }
  
  // Convert to seconds
  remaining = Math.floor(remaining / 1000);
  
  const days = Math.floor(remaining / (24 * 60 * 60));
  remaining -= days * (24 * 60 * 60);
  
  const hours = Math.floor(remaining / (60 * 60));
  remaining -= hours * (60 * 60);
  
  const minutes = Math.floor(remaining / 60);
  
  // Format the output based on the remaining time
  if (days > 0) {
    return `${days}d ${hours}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}
