const figure = document.querySelector('figure');
const info = document.querySelector('#info');
const animal = document.querySelector('#animal');
const source = document.querySelector('#source');
const countdown = document.querySelector('time');

function startLoading() {
  figure.innerHTML = '';
  info.style.display = 'none';
}

/**
 * @param {import("../services/furred/types").Furred} furred
 */
async function renderFurred(furred) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const isVideo = furred.url.endsWith('.mp4') || furred.url.endsWith('.av1');
  figure.innerHTML = isVideo
    ? `<video src="${furred.url}" autoplay loop muted playsinline></video>`
    : `<img src="${furred.url}" alt="${furred.animal}">`;
  animal.textContent = furred.animal;
  source.textContent = furred.source;
  source.href = `https://${furred.source}`;
  info.style.display = 'flex';
}

function fetchCurrentFurred() {
  startLoading();
  fetch('/furred/current')
    .then(response => response.json())
    .then(renderFurred)
    .catch(error => {
      console.error(error);
    });
}

function startCountdown(seconds, refetchOnZero) {
  setInterval(() => {
    seconds--;

    const minutesLeft = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secondsLeft = (seconds % 60).toString().padStart(2, '0');
    countdown.textContent = `${minutesLeft}:${secondsLeft}`;
    countdown.dateTime = `PT${minutesLeft}M${secondsLeft}S`;

    if (!seconds) {
      if (refetchOnZero) fetchCurrentFurred();
      seconds = 1200;
    }
  }, 1000);
}

async function listenForFurredUpdates(readKey) {
  const es = new EventSource(`https://realtime.ably.io/sse?v=1.2&key=${readKey}&channels=furred`);
  es.addEventListener('open', () => console.log('Connected to Ably SSE!'));

  es.addEventListener('error', error => console.error('Error', error.data ? error.data : 'connecting to Ably SSE'));

  es.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    console.log('Received a current furred message in realtime: ', message);
    startLoading();
    renderFurred(JSON.parse(message.data));
  });
}

window.addEventListener('load', async () => {
  fetchCurrentFurred();
  const { readKey } = await fetch('/realtime/info').then(response => response.json());
  const manuallyRefetch = !readKey;

  const started = new Date();
  startCountdown(
    (19 + +manuallyRefetch - (started.getUTCMinutes() % 20)) * 60 + (60 - started.getUTCSeconds()),
    manuallyRefetch,
  );
  if (!manuallyRefetch) listenForFurredUpdates(readKey);
});
