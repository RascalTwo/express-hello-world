const button = document.getElementById('button');

function fetchCurrentBird(){
  const audioElement = document.getElementById('audio');
  audioElement.src = '';

  const infoElement = document.getElementById('info');
  infoElement.textContent = 'Loading...';

  fetch('/bird/current')
    .then(response => response.json())
    .then(async recording => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      let sound = recording.file;
      audioElement.src = sound;
      audioElement.addEventListener('canplay', () => audioElement.play(), { once: true });
      infoElement.textContent = `The ${recording.gen} ${recording.sp} ${recording.en ? `(${recording.en}) ` : ''}was recorded in ${recording.loc} on ${recording.date}`;
    })
    .catch (error => {
      console.error(error);
    });
}

button.addEventListener('click', fetchCurrentBird);

window.addEventListener('load', fetchCurrentBird);








  // button.addEventListener('click', () => {
//     fetch('https://xeno-canto.org/api/2/recordings?query=q:A+len:12')
//     .then(response => response.json())
//     .then(data => {
//       let sound = data.recordings
//       console.log(sound)
//       const audioElement = document.getElementById('audio');
//       audioElement.src = sound
//     })
//     .catch (error => {
//       console.error(error);
//     })
//   })