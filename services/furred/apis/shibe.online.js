const axios = require('axios');

/**
 * @returns {Promise<string>}
 */
module.exports = async function shibeOnline() {
  const { data } = await axios.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true');
  return data[0];
};
module.exports.source = 'shibe.online';
