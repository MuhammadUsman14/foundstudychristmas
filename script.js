const songs = [
    { title: "All I Want", src: "songs/ALLIWANT.mp3" },
    { title: "Baby It's Cold Outside", src: "songs/Babyitscoldoutside.mp3" },
    { title: "Blue Christmas", src: "songs/BlueChristmas.mp3" },
    { title: "Let It Snow", src: "songs/CROSSLETITSNOW.mp3" },
    { title: "Do You Want to Build a Snowman", src: "songs/Doyouwanttobuildasnowman.mp3" },
    { title: "Feliz Navidad", src: "songs/FELIZNAVIDAD.mp3" },
    { title: "Frosty the Snowman", src: "songs/Frostythesnowman.mp3" },
    { title: "Grandma Reindeer", src: "songs/GRANDMAREINDEER.mp3" },
    { title: "Grinch", src: "songs/Grinch.mp3" },
    { title: "Holly Jolly Christmas", src: "songs/HollyJollyChrismas.mp3" },
    { title: "It's Beginning to Look a Lot Like Christmas", src: "songs/itsbeginningtolookalotlikechristmas.mp3" },
    { title: "Jingle Bell Rock", src: "songs/JinghleBellRock.mp3" },
    { title: "Jingle Bells", src: "songs/JingleBells.mp3" },
    { title: "Last Christmas", src: "songs/LASTCHRISTMAS.mp3" },
    { title: "Little Drummer Boy", src: "songs/Littledrummerboy.mp3" },
    { title: "Mistletoe", src: "songs/Mistletoe.mp3" },
    { title: "Mommy Santa", src: "songs/MOMMYSANTA.mp3" },
    { title: "Novogodnii", src: "songs/novogodnii.mp3" },
    { title: "O Come All Ye Faithful", src: "songs/ocomeallyefaitful.mp3" },
    { title: "O Holy Night", src: "songs/Oholynight.mp3" },
    { title: "Rockin' Around the Christmas Tree", src: "songs/ROCKINAROUND.mp3" },
    { title: "Rudolph", src: "songs/Rudolh.mp3" },
    { title: "Santa Baby", src: "songs/SANTABABY.mp3" },
    { title: "Santa Claus is Coming to Town", src: "songs/Santaclauseiscomingtotown.mp3" },
    { title: "Santa Tell Me", src: "songs/SantaTellMe.mp3" },
    { title: "Silent Night", src: "songs/SilentNight.mp3" },
    { title: "The Christmas Song", src: "songs/TheChristmasSong.mp3" },
    { title: "This Christmas", src: "songs/ThisChristmas.mp3" },
    { title: "Underneath the Tree", src: "songs/Underneaththetree.mp3" },
    { title: "White Christmas", src: "songs/WhiteChristmas.mp3" },
    { title: "Winter Wonderland", src: "songs/Winterwonderland2.mp3" }
];

const audioPlayer = document.getElementById("audioPlayer");
const songList = document.getElementById("song-list");
const songTitle = document.getElementById("song-title");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progress");
const waveCanvas = document.getElementById("waveCanvas");
const canvasContext = waveCanvas.getContext("2d");
const cdContainer = document.querySelector(".cd-container");
// Set canvas dimensions
waveCanvas.width = 300;
waveCanvas.height = 300;

let currentSongIndex = 0;
let audioContext, analyser, dataArray;

// Populate Playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.addEventListener("click", () => loadSong(index));
    songList.appendChild(li);
});

// Load Song Function
function loadSong(index) {
    currentSongIndex = index;
    audioPlayer.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    updateActiveSong();
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
}

// Highlight Active Song
function updateActiveSong() {
    [...songList.children].forEach((li, idx) => {
        li.classList.toggle("active", idx === currentSongIndex);
    });
}

// Progress Bar Update
audioPlayer.addEventListener("timeupdate", () => {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${percentage}%`;
});

// Play/Pause Control
playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    }
});

// Play Next Song on End
audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Next and Previous Buttons
document.getElementById("nextBtn").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

document.getElementById("prevBtn").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Initialize Song
loadSong(currentSongIndex);

// Visualizer Setup
function setupVisualizer() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audioPlayer);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    drawCircularVisualizer();
}

function drawCircularVisualizer() {
    const centerX = waveCanvas.width / 2;
    const centerY = waveCanvas.height / 2;
    const radius = 100; // Adjusted base radius
    const barCount = dataArray.length;

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        canvasContext.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

        for (let i = 0; i < barCount; i++) {
            const value = dataArray[i];
            const angle = (i / barCount) * (2 * Math.PI);

            // Calculate bar positions
            const barStartX = centerX + radius * Math.cos(angle);
            const barStartY = centerY + radius * Math.sin(angle);
            const barEndX = centerX + (radius + value / 4) * Math.cos(angle);
            const barEndY = centerY + (radius + value / 4) * Math.sin(angle);

            canvasContext.beginPath();
            canvasContext.moveTo(barStartX, barStartY);
            canvasContext.lineTo(barEndX, barEndY);
            canvasContext.strokeStyle = `hsl(${(i / barCount) * 360}, 100%, 50%)`;
            canvasContext.lineWidth = 2;
            canvasContext.stroke();
        }
    }
    draw();
}


// Activate Visualizer on Play
audioPlayer.addEventListener("play", () => {
    if (!audioContext) setupVisualizer();
    cdContainer.style.animationPlayState = "running";
    audioContext.resume();
});

audioPlayer.addEventListener("pause", () => {
    cdContainer.style.animationPlayState = "paused";
});
