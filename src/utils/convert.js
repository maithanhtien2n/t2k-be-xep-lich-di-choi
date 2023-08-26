const formatDate = (dateString, showTime = false, getTime = false) => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (getTime) {
    return `${formattedTime}`;
  } else {
    return showTime ? `${formattedTime} - ${formattedDate}` : formattedDate;
  }
};

module.exports = { formatDate };
