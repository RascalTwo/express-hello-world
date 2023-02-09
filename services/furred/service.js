const axios = require('axios');

const CyclicDb = require('@cyclic.sh/dynamodb');
const db = CyclicDb(process.env.CYCLIC_DB);
const collection = db.collection('globals');

const apis = require('./apis');

const animalsToApis = {
  Dog: [apis.dogCEO, apis.randomDog, apis.shibeOnline],
  Cat: [apis.randomCat, apis.someRandomAPI],
  Fox: [apis.randomFox, apis.someRandomAPI],
  Kangaroo: [apis.someRandomAPI],
  Koala: [apis.someRandomAPI],
  Panda: [apis.someRandomAPI],
  Racoon: [apis.someRandomAPI],
  'Red Panda': [apis.someRandomAPI],
};
const animalKeys = Object.keys(animalsToApis);

/**
 * @returns {Promise<import('./types.js').Furred>}
 */
async function fetchRandomFurredImage() {
  const now = new Date();
  const third = now.getUTCHours() * 3 + Math.floor(now.getUTCMinutes() / 20);

  const animal = animalKeys[third % animalKeys.length];
  const methods = animalsToApis[animal];
  const method = methods[Math.floor(Math.random() * methods.length)];
  return {
    source: method.source,
    animal,
    url: await method(animal.toLowerCase().replace(/\s/g, '_')),
  };
}

/**
 * @returns {Promise<import('./types.js').Furred>}
 */
async function randomizeCurrentFurred() {
  const furred = await fetchRandomFurredImage();
  await collection.set('currentFurred', furred);
  return furred;
}

/**
 * @returns {Promise<import('./types.js').Furred | null>}
 */
async function getCurrentFurredFromDatabase() {
  const currentFurred = await collection.get('currentFurred');
  if (currentFurred) return currentFurred.props;

  return null;
}

/**
 * @returns {Promise<import('./types.js').BaseFurred>}
 */
async function getCurrentFurred() {
  const currentFurred = await getCurrentFurredFromDatabase();
  if (currentFurred) return currentFurred;

  return randomizeCurrentFurred();
}

module.exports = {
  randomizeCurrentFurred,
  getCurrentFurred,
};
