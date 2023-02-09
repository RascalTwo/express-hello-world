const axios = require('axios');

/**
 * @returns {Promise<string>}
 */
module.exports = async function bunniesIO() {
  const { data } = await axios.get('https://api.bunnies.io/v2/loop/random/?media=mp4,av1,gif,poster');
  for (const key of ['mp4', 'av1', 'gif']) {
    if (data.media[key]) return data.media[key];
  }
  return data.media.poster;
};
module.exports.source = 'bunnies.io';
