const formatDate = (data) => {
  const date = new Date(parseInt(data));
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.substr(-2);
  const day = `0${date.getDate()}`.substr(-2);

  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`.substr(-2);

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export { formatDate };
