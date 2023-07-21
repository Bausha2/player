//@Here I set the variables relate to the index.html. Each const (constant) searches into the document for an element ID. For example: const songName searchs for an id called 'song-name' and becomes its 'nickname' into the code.

const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name')
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time')
const totalTime = document.getElementById('total-time')

//@ in these I made a constant variable that will keep informations about the song (its name, author, the cover file and the song file). It is like an "RG" which has a person's RG, CPF, birthdate and so on...
const rocky1 = {
   songName : "Rock 'n Run",
   artist : "Agnus",
   coverFile : "Al-Flower",
   songFile : "rock_n_run",
   liked: false
}

const rocky2 = {
   songName : "Midnight Please",
   artist : "Bausha",
   coverFile: "Al-Flower",
   songFile: "midnight_please",
   liked: false

}

const sunbeams = {
   songName : "sunbeams",
   artist : "Bausha",
   coverFile: "purple_cat",
   songFile: "sunbeams",
   liked: false

}

//@ here I set the 'let' variables. While constants remain the same, 'let' variables can be changed.
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

//@ this is an array. It places three variables into a single one. Like a box with smaller box in it.
const originalPlaylist = [rocky1, rocky2, sunbeams];
let sortedPlaylist = [...originalPlaylist]; 
let index = 0;


//this function will play the song. It will first look for the classes in the 'play' element and change the button. Then, it will play the son and set 'isPlaying' to true.
function playSong(){
   play.querySelector('.bi').classList.remove('bi-play-circle-fill');
   play.querySelector('.bi').classList.add('bi-pause-circle-fill');
   song.play();
   isPlaying = true;

}

//this will pause the song. It will change the icon, pause it and set 'isPlaying' to false.
function pauseSong(){
   play.querySelector('.bi').classList.add('bi-play-circle-fill');
   play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
   song.pause();
   isPlaying = false;
}

//this will make the song either pause or play when clicked on the play/pause icon. If the song is playing, it will pause. If it is paused, it will play.
function playPauseDecider() {
   if (isPlaying === true) {
      pauseSong();
   } else {
      playSong();
   }

}



//this will change the current song and its informations. It will get the elements from the array based on the index number. The index is the song's variable's position in the array.
function loadSong(){
   cover.src = `images/${sortedPlaylist[index].coverFile}.jpg`;
   song.src = `audio/${sortedPlaylist[index].songFile}.mp3`;
   songName.innerText = sortedPlaylist[index].songName;
   bandName.innerText = sortedPlaylist[index].artist;
   likeButtonRender();

}

//this will change the song to the previous one in the playlist when clicked on the 'previous' button. The array always starts at 0. If the index (generical variable for a number) is equal to 0, it will become the size of the playlist array less 1. If it is not equal to zero, it will subtract 1. It will then play the current song.
function previousSong (){
   if (index === 0){
      index = sortedPlaylist.length - 1;
   } else {
      index -= 1;
   }

   loadSong();
   playSong();
} 

//this will jump to the next song. If the index is equal to the array's size less 1 (because the array always starts at zero), it will set the index to 0, that is, to restart the playlist from the first song. If is not equal to the array's size less 1, it will add 1, thus jumping to the next song. It will then play the current song.
function nextSong (){
   if (index === sortedPlaylist.length - 1){
      index = 0;
   } else {
      index += 1;
   }

   loadSong();
   playSong();
} 

//this will update the progress bar. The barWidth is the song's current time (x) divided by its duration (y), times 100 - (x/y) * 100. It will get the variable --progress from the CSS which, by default, equals 0%, and set its property to the variable barWidth and turn it into a percentage again (%). The songTime is going to apply the HHMMSS format settings.
function updateProgress(){
   const barWidth = (song.currentTime/song.duration) * 100;
   currentProgress.style.setProperty('--progress', `${barWidth}%`);
   songTime.innerText = toHHMMSS(song.currentTime);

}

function jumpTo(event){
   const width = progressContainer.clientWidth;
   const clickPosition = event.offsetX;
   const jumpToTIme = (clickPosition/width) * song.duration;
   song.currentTime = jumpToTIme
} 


function shuffleArray(preShuffleArray){
   const size = preShuffleArray.length;
   let currentIndex = size - 1;
   while(currentIndex > 0){
      let randomIndex = Math.floor(Math.random() * size);
      let aux = preShuffleArray[currentIndex];
      preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
      preShuffleArray[randomIndex] = aux;
      currentIndex -= 1;
   }

}

 function shuffleButtonClicked(){
   if (isShuffled === false){
      isShuffled = true;
      shuffleArray(sortedPlaylist);
      shuffleButton.classList.add('button-active');

   }
    else {
      isShuffled = false;
      sortedPlaylist = [...originalPlaylist];
      shuffleButton.classList.remove('button-active');

    }
}

function repeatButtonClicked(){
   if (repeatOn === false){
      repeatOn = true;
      repeatButton.classList.add('button-active');
   }
   else{
      repeatOn = false;
      repeatButton.classList.remove('button-active');

    }

}

function nextOrRepeat(){
   if (repeatOn === false){
      nextSong();
   }
   else {
      playSong();

   }

}

function toHHMMSS(originalNumber){
   let hours = Math.floor(originalNumber/3600);
   let min = Math.floor((originalNumber - hours * 3600)/60);
   let secs = Math.floor(originalNumber - hours * 3600 - min *60);

   return `${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

}

function updateTotalTime(){
   totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonRender(){
   if (sortedPlaylist[index].liked === true){
   likeButton.querySelector('.bi').classList.remove('bi-heart');
   likeButton.querySelector('.bi').classList.add('bi-heart-fill');
   likeButton.classList.add('button-active');
   }
   else{
      likeButton.querySelector('.bi').classList.add('bi-heart');
      likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
      likeButton.classList.remove('button-active');

   }
}


function likeButtonClicked(){
   if (sortedPlaylist[index].liked === false){
      sortedPlaylist[index].liked = true;
   }
   else {
      sortedPlaylist[index].liked = false
   }

   likeButtonRender()
}

loadSong()

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);