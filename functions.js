function calculateThirdOfDate(date = new Date()) {
  return date.getUTCHours() * 3 + Math.floor(date.getUTCMinutes() / 20);
}

function startOfThird(date = new Date(), third = calculateThirdOfDate(date)) {
  date.setUTCHours(Math.floor(third / 3), (third % 3) * 20, 0, 0);
  return date;
}

module.exports = {
  calculateThirdOfDate,
  startOfThird,
};
