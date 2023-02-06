const axios = require('axios')

const CyclicDb = require("@cyclic.sh/dynamodb")
const db = CyclicDb(process.env.CYCLIC_DB);
const collection = db.collection("globals")

async function fetchRandomBirdRecording(){
  const { data } = await axios.get('https://xeno-canto.org/api/2/recordings?query=q:A+len:12+grp:grasshoppers');
  const recordings = data.recordings;
  const index = Math.floor(Math.random() * recordings.length);
  return recordings[index];
}

async function randomizeBird() {
	const birdRecording = await fetchRandomBirdRecording();
	await collection.set('currentBirdRecording', birdRecording);
	return birdRecording;
}

async function getCurrentBirdFromDatabase() {
	const currentBirdRecording = await collection.get('currentBirdRecording');
	if (currentBirdRecording) return currentBirdRecording.props;

	return null;
}

async function getCurrentBird() {
	const currentBirdRecording = await getCurrentBirdFromDatabase();
	if (currentBirdRecording) return currentBirdRecording;

	return randomizeBird();
}

module.exports = {
	randomizeBird,
	getCurrentBird
}