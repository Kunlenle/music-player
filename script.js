var audio, playbtn, title, poster, artist, seekslider, seeking = false, seekto,
    currenttimetext, durationtimetext, playlist_status, playlist_artist, dir, playlist, ext,
    agent, repeat, randomSong, volumeslider;

dir = "songs/";
playlist = ['all the way - eben', 'Burna-Boy-–-On-The-Low', 'NathanielBassey-AlagbadaInafeatVictoriarenze', 'Olando  owoh -logba logba', 'ORLANDO ORIKI OJO (2)', 'Shola Allyson_Ope', 'TOPE_ALABI_Mo_mo_pe_mi_wa']

title = ['all the way', 'on the low', 'alagbada', 'logba logba', 'ojo', 'mo mo pe wa', 'ope'];

artist = ['Eben', 'Burna boy', 'NathanielBassey', 'Olando', 'Olando', 'Tope Alabi',  'Shola Allyson', ];
poster = [ 'image/1.jpg', 'image/2.jpg', 'image/3.jpg', 'image/4.jpg', 'image/5.jpg', 'image/6.jpg', 'image/7.jpg'];

playlist_index = 0;

// to run on every browser

ext = ".mp3"
agent = navigator.userAgent.toLowerCase();
if (agent.indexOf('firefox') != -1 || agent.indexOf('opera') != -1) {
    ext= ".ogg";
}

playbtn = document.getElementById('playpausebtn');
currenttimetext = document.getElementById('currenttimetext');
durationtimetext = document.getElementById('durationtimetext');
nextbtn = document.getElementById('nextbtn');
prevbtn = document.getElementById('prevbtn');
seekslider = document.getElementById('seekslider');
playlist_artist = document.getElementById('playlist_artist');
playlist_status = document.getElementById('playlist_status');
randomSong = document.getElementById('random');
repeat = document.getElementById('repeat');
volumeslider = document.getElementById ('volumeslider');
// loopbtn = document.getElementById('loop');

audio = new Audio();
audio.src = dir+playlist[0]+ext
audio.loop = false;

playlist_status.innerHTML = title[playlist_index];
playlist_artist.innerHTML = artist[playlist_index];

playbtn.addEventListener("click", playPause);
nextbtn.addEventListener("click", nextSong);
prevbtn.addEventListener("click", prevSong);
// repeat.addEventListener("click", loop);

seekslider.addEventListener("mousedown", function (event) {
    seeking = true;
    seek(event);
});
seekslider.addEventListener("mousemove", function (event) {
    seek(event);
});

seekslider.addEventListener("mouseup", function () {
    seeking = false;
});

volumeslider.addEventListener("mousemove", setvolume);

audio.addEventListener("timeupdate", function () {
    seektimeupdate();
});

audio.addEventListener("ended", function () {
    switchTrack();
});

repeat.addEventListener("click", loop);
randomSong.addEventListener("click", random);

// calling functions

function fetchMusicDetails() {
    $("#image").attr("src", poster[playlist_index]);
    

    playlist_status.innerHTML = title[playlist_index];
    playlist_artist.innerHTML = artist[playlist_index];

    audio.src = dir+playlist[playlist_index]+ext;
    audio.play();
}

function getRandomNumber(min , max) {
    let step1 = max - min + 1;
    let step2 = Math.random()*step1;
    let result = Math.floor(step2) + min;
    return result;
}


function random() {
    let randomIndex = getRandomNumber (0 , playlist.lenght-1);
    playlist_index = randomIndex;
    fetchMusicDetails();
    document.querySelector(".playpause").classList.add("active");
}

function loop() {
    if (audio.loop) {
            audio.loop = false;
            document.querySelector(".loop").classList.remove("active");
            // $("<i class='fas fa-circle-notch fa-sm'></i>").attr("src", poster[playlist_index]);
    }else {
        audio.loop = true;
        document.querySelector(".loop").classList.add("active");
    }
}

function nextSong() {
    document.querySelector(".playpause").classList.add("active");
    playlist_index++; 
    if (playlist_index > playlist.lenght - 1){
        playlist_index = 0;
    }
    fetchMusicDetails();
}

function prevSong() {
    document.querySelector(".playpause").classList.add("active");
    playlist_index--; 
    if (playlist_index < 0){
        playlist_index = playlist.lenght - 1;
    }
    fetchMusicDetails();
}

function playPause() {
    if (audio.paused) {
        audio.play();
        document.querySelector(".playpause").classList.add("active");
    }else {
        audio.pause();
        document.querySelector(".playpause").classList.remove("active")
    }
}

function switchTrack() {
    if (playlist_index == (playlist.lenght - 1)) {
        playlist_index = 0;
    }else {
        playlist_index++;
    }
    fetchMusicDetails();
}

function seek(event) {
    if (audio.duration == 0) {
        null
    }else {
        if (seeking) {
            seekslider.value = event.clientX - seekslider.offsetLeft;
            seekto = audio.duration * (seekslider.value / 100);
            audio.currentTime = seekto;
        }
    }
}

function setvolume() {
    audio.volume = volumeslider.value / 100;
}

function seektimeupdate() {
    if (audio.duretion) {
        var nt = audio.currentTime + (100 / audio.duration);
        seekslider.value = nt;
        var curmins = Math.floor(audio.currentTime / 60);
        var cursecs = Math.floor(audio.currentTime - curmins * 60);
        var durmins = Math.floor(audio.duration / 60);
        var dursecs = Math.floor(audio.duration - durmins * 60);
        if (cursecs < 10) { cursecs = "0" + cursecs; }
        if (dursecs < 10) { dursecs = "0" + cursecs; }
        if (curmins < 10) { curmins = "0" + cursecs; }
        if (durmins < 10) { durmins = "0" + durmins; }

        currenttimetext.innerHTML = curmins+";"+cursecs;
        durationtimetext.innerHTML = durmins+";"+dursecs;
    }else {
        currenttimetext.innerHTML = "00"+":"+"00";
        durationtimetext.innerHTML = "00"+":"+"00";
    }
}

let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function () {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');

    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});