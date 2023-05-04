import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const getCurrentTime = function ({ seconds }) {
  localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(seconds));
  console.log(seconds);
};

player.on('timeupdate', throttle(getCurrentTime, 1000));

player
  .setCurrentTime(localStorage.getItem(CURRENT_TIME_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
