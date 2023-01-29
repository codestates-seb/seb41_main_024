export const transDateFullFormat = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일 ${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
  return formattedDate
}

export const transDateMonthFormat = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일 ${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
  return formattedDate
}

export const transDateTimeFormat = (date: string) => {
  const targetDate = new Date(date);
  const formattedDate = `${targetDate.getHours() >= 12 ? '오후' : '오전'} ${targetDate.getHours() % 12 || 12}시 ${targetDate.getMinutes()}분`;
  return formattedDate
}