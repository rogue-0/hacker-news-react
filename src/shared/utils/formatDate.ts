const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(time: number) {
  const date = new Date(time * 1000);

  const year = date.getFullYear();
  const monthNumber = date.getMonth();
  const month = months[monthNumber];
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes} · ${day} ${month} ${year}`;
}
