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

  const hours = getHours(date);
  const minutes = getMinutes(date);

  return `${hours}:${minutes} · ${day} ${month} ${year}`;
}

function getHours(date: Date) {
  const hours = date.getHours();

  return hours < 10 ? `0${hours}` : `${hours}`;
}

function getMinutes(date: Date) {
  const minutes = date.getMinutes();

  return minutes < 10 ? `0${minutes}` : `${minutes}`;
}
