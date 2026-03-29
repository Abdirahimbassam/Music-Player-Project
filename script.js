
const audioElement = document.createElement("audio")
document.body.appendChild(audioElement)

// Select All Elements to DOM
const cover = document.getElementById('cover');
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const progressBar = document.querySelector(".progress-bar")
const progress = document.querySelector(".progress")
const currentTimeEl = document.getElementById('current-time')
const durationTimeEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById('next')
const volumEl = document.getElementById('volume')
const speedSelec = document.getElementById('speed')

// song data
const songs = [
    { title: "Song 1", artist: "Artist One", cover: "https://placehold.co/250/2196F3/FFFFFF", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"},

    { title: "Song 2", artist: "Artist Two", cover: "https://placehold.co/250/eb4034/FFFFFF", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"},

    { title: "Song 3", artist: "Artist Three", cover: "https://placehold.co/250/4441e0/FFFFFF", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"},

    { title: "Local Song 4", artist: "Abdirahim Bassam", cover: "https://placehold.co/250/e04191/FFFFFF", src: "Rain Forest.mp3"},
]

let songIndex = 0;
let isPlaying = false;
let speed = 1;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audioElement.src = song.src;
    
}

// load song into dom
loadSong(songs[songIndex]);

// play song
function playSong() {
    playBtn.querySelector("i").classList.remove("fa-play")
    playBtn.querySelector("i").classList.add("fa-pause")
    audioElement.play();
    isPlaying = true;
}

// pause song
function pauseSong() {
    playBtn.querySelector("i").classList.remove("fa-pause");
    playBtn.querySelector("i").classList.add("fa-play");
    audioElement.pause();
    isPlaying = false;
}

// next song
function nextSong() {

    pauseSong();

    songIndex++

    // after 400 mille socond
    setTimeout( ()=> {

        if(songIndex > songs.length -1) {
            songIndex = 0;
        }
    
        loadSong(songs[songIndex])
    
        playSong();

    },400)

}

// previews song
function prevSong() {

    pauseSong();

    songIndex--;

    // after 400 mille socond
    setTimeout( ()=> {
    
    if (songIndex < 0) {
        songIndex = songs.length-1
    }
    loadSong(songs[songIndex])

    pauseSong();

    },400)  

}

// Update Progress
function updateProgress(e) {

    const {duration, currentTime} = e.srcElement;

    if(isNaN(duration)) return

    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`

    // duration calculation

    const durationMinites = Math.floor( duration / 60);
    let durationSeconds = Math.floor( duration % 60);

    if(durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    currentTimeEl.textContent = `${durationMinites}:${durationSeconds}`

    // current time calculation

    const currentMinutes = Math.floor( currentTime / 60);
    let currentSeconds = Math.floor( currentTime % 60);

    if(currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`
    }

    durationTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    audioElement.playbackRate = speed;

}

// progressbar seek song
function setProgress(e) {

    const width = this.clientWidth;

    console.log(width)

    console.log("e.ofsetX", e.offsetX )
    console.log("e.ofsetY",e.offsetY)

    const clickX = e.offsetX;

    const duration = audioElement.duration;
    console.log("duration", duration)

    if(isNaN(duration)) return

    const newTime = ( clickX / width) * duration;
    console.log("newTime",newTime)

    audioElement.currentTime = newTime;
}



// All about events
playBtn.addEventListener("click", ()=> {

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// next song event
nextBtn.addEventListener("click", nextSong);

// prev song event
prevBtn.addEventListener("click", prevSong);

// Update Progress event
audioElement.addEventListener("timeupdate", updateProgress);

// progressBar seek song event
progressBar.addEventListener("click", setProgress);

// volume event
volumEl.addEventListener("input", (e)=> {
    audioElement.volume = e.target.value;
})

// speed event
speedSelec.addEventListener("change", (e)=> {
    speed = parseFloat(e.target.value);
    audioElement.playbackRate = speed;
})

// load metadata
audioElement.addEventListener("loadeddata", updateProgress);