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
