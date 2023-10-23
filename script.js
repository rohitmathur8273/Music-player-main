let songs = [

    {
        _Sname: 'Duniyaa',
        _path: './Music/Duniya\ -\ Luka\ Chuppi\ 128\ Kbps.mp3',
        artist: 'Abhijit Vaghani, Akhil, Dhvani, Bob',
        _movie: 'Luka Chuppi',
        _cover: './images/duniya.jfif'
    },

    {
        _Sname: 'Pal',
        _path: './Music/02\ Pal\ -\ Jalebi\ -\ Arijit\ Singh.mp3',
        artist: 'Arijit Singh',
        _movie: 'Jalebi',
        _cover: './images/pal.jfif'
    },

    {
        _Sname: 'Tere Liye',
        _path: './Music/Prince\ 2010\ -\ Tere\ Liye.mp3',
        artist: 'Atif Aslam, Shreya Ghoshal',
        _movie: 'Prince',
        _cover: './images/tereliye.jfif'
    },

    {
        _Sname: 'Believer',
        _path: './Music/Believer\(PagalWorld\).mp3',
        artist: 'Jessy',
        _movie: 'Evolve',
        _cover: './images/believer.jfif'
    },

    {
        _Sname: 'Bilionera',
        _path: './Music/Bilionera\(PagalWorld\).mp3',
        artist: 'Otilia',
        _movie: 'English Mp3',
        _cover: './images/billionera.jfif'
    },

    {
        _Sname: 'Lehanga',
        _path: './Music/Lehanga\ -\ Jass\ Manak.mp3',
        artist: 'Jass Manak',
        _movie: 'Punjabi Mp3',
        _cover: './images/lehanga.jfif'
    }
]




const _audio = document.querySelector('audio');
const _play = document.getElementById('play');
const _disc = document.querySelector('.disc');
const _coverImg = document.getElementById('cover_img');
const _songName2 = document.querySelector('.song_name2');
const _movieName = document.querySelector('.movie_name');
const _artistName = document.querySelector('.artist_name');
const _next = document.getElementById('next');
const _prev = document.getElementById('prev');
const _audioSeek = document.getElementById('audio_seek');

let _progress = document.getElementById('progress');
let _currentDuration = document.getElementById('current_duration');
let _totalDuration = document.getElementById('total_duration');
let _progressDiv = document.getElementById('progress_box');

let isPlaying = false;
let songIndex = 0;
let _audioRange = 0;

// ----play function --------
const playMusic = () => {
    isPlaying = true;
    _audio.play();
    _play.classList.replace('fa-play', 'fa-pause');
    _disc.classList.add('active');
};


// -----pause function------- 
const pauseMusic = () => {
    isPlaying = false;
    _audio.pause();
    _play.classList.replace('fa-pause', 'fa-play');
    _disc.classList.remove('active');
};




_play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
})


// changing the music data 

const loadSong = (songs) => {
    _songName2.textContent = songs._Sname;
    _artistName.textContent = songs.artist;
    _movieName.textContent = songs._movie;
    _audio.src = songs._path;
    _coverImg.src = songs._cover;
}


const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

// _progress function 

_audio.addEventListener('timeupdate', (event) => {
    const {
        currentTime,
        duration
    } = event.srcElement;
    let _currTimePercent = (currentTime / duration) * 100;
    _progress.style.width = `${_currTimePercent}%`


    // time_duration function 
    let minute_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let _tot_duration;
    if (minute_duration < 10 && sec_duration > 10) {
        _tot_duration = `0${minute_duration}:${sec_duration}`;
    } else if (sec_duration < 10 && minute_duration > 10) {
        _tot_duration = `${minute_duration}:0${sec_duration}`;
    } else if ((sec_duration < 10 && minute_duration < 10)) {
        _tot_duration = `0${minute_duration}:0${sec_duration}`;
    } else {
        _tot_duration = `${minute_duration}:${sec_duration}`;
    }

    if (duration) {
        _totalDuration.textContent = `${_tot_duration}`;
    }


    // -----------currentTime function-------------

    let minute_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    let _tot_currentTime;
    if (minute_currentTime < 10 && sec_currentTime > 10) {
        _tot_currentTime = `0${minute_currentTime}:${sec_currentTime}`;
    } else if (sec_currentTime < 10 && minute_currentTime > 10) {
        _tot_currentTime = `${minute_currentTime}:0${sec_currentTime}`;
    } else if ((sec_currentTime < 10 && minute_currentTime < 10)) {
        _tot_currentTime = `0${minute_currentTime}:0${sec_currentTime}`;
    } else {
        _tot_currentTime = `${minute_currentTime}:${sec_currentTime}`;
    }

    if (currentTime) {
        _currentDuration.textContent = `${_tot_currentTime}`;
    }

    // if music has end next song play 
    _audio.addEventListener('ended', nextSong);
});




// progressbar change on click 

_progressDiv.addEventListener('click', (event) => {
    let {
        duration
    } = _audio;
    let current_move = (event.offsetX / event.srcElement.clientWidth) * duration;
    _audio.currentTime = current_move;
})


_next.addEventListener('click', nextSong);
_prev.addEventListener('click', prevSong);