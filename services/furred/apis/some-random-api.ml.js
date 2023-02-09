const axios = require('axios');

/**
 * @typedef {'bird' | 'cat' | 'dog' | 'fox' | 'kangaroo' | 'koala' | 'panda' | 'racoon' | 'red_panda'} SomeRandomAPISpecies
 */

/**
 * @param {species} species
 * @returns {Promise<string>}
 */
module.exports = async function someRandomAPI(species) {
  const { data } = await axios.get('https://some-random-api.ml/img/' + species);
  return data.link;
};
module.exports.source = 'some-random-api.ml';
/** @type {SomeRandomAPISpecies[]} */
module.exports.species = ['bird', 'cat', 'dog', 'fox', 'kangaroo', 'koala', 'panda', 'racoon', 'red_panda'];
