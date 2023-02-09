const axios = require('axios');

/**
 * @returns {Promise<string>}
 */
module.exports = async function dogCEO() {
  const { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
  return data.message;
};
module.exports.source = 'dog.ceo';
