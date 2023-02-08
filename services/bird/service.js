const axios = require('axios');

const CyclicDb = require('@cyclic.sh/dynamodb');
const db = CyclicDb(process.env.CYCLIC_DB);
const collection = db.collection('globals');


/**
 * @param {import('./types.js').FullBird} bird
 * @returns {import('./types.js').BaseBird}
 */
function trimBird({ id, gen, sp, ssp, group, en, cnt, loc, file }) {
  return { id, gen, sp, ssp, group, en, cnt, loc, file };
}

/**
 * @returns {Promise<import('./types.js').FullBird>}
 */
async function fetchRandomFullBirdRecording() {
  const { data } = await axios.get('https://xeno-canto.org/api/2/recordings?query=q:A+len:12+grp:birds');
  const recordings = data.recordings;

  const index = Math.floor(Math.random() * recordings.length);

  const chosen = recordings[index];
  for (const key in chosen) {
    if (chosen[key] === '') delete chosen[key];
  }
  return chosen;
}

/**
 * @returns {Promise<import('./types.js').BaseBird>}
 */
async function randomizeCurrentBird() {
  const birdRecording = trimBird(await fetchRandomFullBirdRecording());
  await collection.set('currentBirdRecording', birdRecording);
  return birdRecording;
}

/**
 * @returns {Promise<import('./types.js').BaseBird | null>}
 */
async function getCurrentBirdFromDatabase() {
  const currentBirdRecording = await collection.get('currentBirdRecording');
  if (currentBirdRecording) return currentBirdRecording.props;

  return null;
}

/**
 * @returns {Promise<import('./types.js').BaseBird>}
 */
async function getCurrentBird() {
  const currentBirdRecording = await getCurrentBirdFromDatabase();
  if (currentBirdRecording) return currentBirdRecording;

  return randomizeCurrentBird();
}

module.exports = {
  randomizeCurrentBird,
  getCurrentBird,
};
