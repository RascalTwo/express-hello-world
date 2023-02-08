const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const infoElement = document.getElementById('info');

function clearRecording() {
  audioElement.src = '';
  infoElement.textContent = 'Loading...';
}

/**
 * @param {import('../services/bird/types.js').BaseBird} recording
 */
async function renderBirdRecording(recording) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  let sound = recording.file;
  audioElement.src = sound;
  audioElement.addEventListener('canplay', () => audioElement.play(), { once: true });
  infoElement.textContent = `The ${recording.gen} ${recording.sp} ${recording.ssp ? recording.ssp + ' ' : ''}${recording.en ? `(${recording.en}) ` : ''
    }was recorded in ${recording.loc} (${recording.cnt}) on ${recording.date}`;
}

function fetchCurrentBird() {
  clearRecording();
  fetch('/bird/current')
    .then(response => response.json())
    .then(renderBirdRecording)
    .catch(error => {
      console.error(error);
    });
}

button.addEventListener('click', fetchCurrentBird);

async function listenForBirdUpdates(readKey) {
  const es = new EventSource(`https://realtime.ably.io/sse?v=1.2&key=${readKey}&channels=bird`);
  es.addEventListener('open', () =>
    console.log('Connected to Ably SSE!')
  );

  es.addEventListener('error', error =>
    console.error('Error', error.data ? error.data : 'connecting to Ably SSE')
  );

  es.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    console.log('Received a current bird message in realtime: ', message);
    clearRecording();
    renderBirdRecording(JSON.parse(message.data));
  });
}

window.addEventListener('load', async () => {
  fetchCurrentBird();
  const { readKey } = await fetch('/realtime/info').then(response => response.json());
  return listenForBirdUpdates(readKey);
});
