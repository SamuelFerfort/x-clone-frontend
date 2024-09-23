export function formatJoinDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const joinDate = new Date(date);
  const month = months[joinDate.getMonth()];
  const year = joinDate.getFullYear();

  return `Joined ${month} ${year}`;
}

export function formatTimeDifference(createdAt) {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h`;
  } else if (diffInSeconds < 2592000) {
    return postDate.toLocaleString('default', { day: 'numeric', month: 'short' });
  } else {
    return postDate.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}

export function formatPostTimestamp(timestamp) {
  const date = new Date(timestamp);
  
  // Format time (12:40 PM)
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  const timeString = date.toLocaleString('en-US', timeOptions);
  
  // Format date (Sep 23, 2024)
  const dateOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  const dateString = date.toLocaleString('en-US', dateOptions);
  
  return `${timeString} · ${dateString}`;
}