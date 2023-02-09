const axios = require('axios');

/**
 * @returns {Promise<string>}
 */
module.exports = async function randomCat() {
  const { data } = await axios.get('https://aws.random.cat/meow');
  return data.file;
};
module.exports.source = 'aws.random.cat';
