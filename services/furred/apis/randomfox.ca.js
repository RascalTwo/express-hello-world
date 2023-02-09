const axios = require('axios');

/**
 * @returns {Promise<string>}
 */
module.exports = async function randomFox() {
  const { data } = await axios.get('https://randomfox.ca/floof/');
  return data.image;
};
module.exports.source = 'randomfox.ca';
