export const formatDateOrder = (updatedAt: string) => {
  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
  const updatedDate = new Date(updatedAt);
  const GMT = Math.ceil(updatedDate.getTimezoneOffset() / 60);
  const nowDate = new Date();
  let day: number | string = nowDate.getDay() - updatedDate.getDay();
  day = day ? (day > 1 ? `${day} назад` : 'Вчера') : 'Сегодня';
  return `${day}, ${formatTime(updatedDate.getHours())}:${formatTime(updatedDate.getMinutes())} i-GMT${
    GMT > 0 ? '+' : ''
  }${GMT}`;
};
