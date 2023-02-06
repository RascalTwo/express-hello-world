const button = document.getElementById('button');

button.addEventListener('click', () => {
    fetch('/bird/current')
      .then(response => response.json())
      .then(recording => {
        let sound = recording.file;
        const audioElement = document.getElementById('audio');
        audioElement.src = sound;
        document.querySelector('#info').textContent = `The ${recording.gen} ${recording.sp} (${recording.en}) was recorded in ${recording.loc} on ${recording.date}`;
      })
      .catch (error => {
        console.error(error);
      });
  });








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