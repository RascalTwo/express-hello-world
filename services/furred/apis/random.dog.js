const axios = require('axios');

/**
 * @returns {Promise<string>}
 */
module.exports = async function randomDog() {
  const { data } = await axios.get('https://random.dog/woof.json');
  return data.url;
};
module.exports.source = 'random.dog';
