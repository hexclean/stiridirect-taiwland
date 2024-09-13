export const convertDate = (post_date) => {
  let result;
  let pattern = /\d{1,2} \w{3} \d{4} \d{2}:\d{2}:\d{2}/;
  let match = post_date.match(pattern);

  if (match) result = match[0];

  const providedDate = new Date(result);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - providedDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);

  if (
    hoursDifference < 24 &&
    currentDate.getDate() === providedDate.getDate()
  ) {
    const remainingMinutes = minutesDifference - hoursDifference * 60;
    if (hoursDifference === 0) {
      if (remainingMinutes === 0) {
        return `acum câteva secunde`;
      } else {
        return `acum ${remainingMinutes} minute`;
      }
    } else {
      return `acum ${hoursDifference} ore ${remainingMinutes} minute`;
    }
  } else {
    const formattedDate = `${providedDate.getDate()}.${
      providedDate.getMonth() + 1
    }.${providedDate.getFullYear()} ${providedDate.getHours()}:${
      (providedDate.getMinutes() < 10 ? "0" : "") + providedDate.getMinutes()
    }`;
    return formattedDate;
  }
};
