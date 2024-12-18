const songs = [
    { title: "Last Christmas", singer: "", src: "songs/Last Christmas.mp3" },
    { title: "Jingle Bell Rock", singer: "feat. Daniel & Jaden", src: "songs/Jingle Bell Rock (feat. Daniel & Jaden).mp3" },
    { title: "Winter Wonderland", singer: "feat. Valentina & Nicholas", src: "songs/Winter Wonderland (feat. Valentina & Nicholas).mp3" },
    { title: "Baby It's Cold Outside", singer: "feat. Catalina", src: "songs/Baby It's Cold Outside (feat. Catalina).mp3" },
    { title: "Jingle Bells", singer: "feat. Julia & Muhammad", src: "songs/Jingle Bells (feat. Julia & Muhammad).mp3" },
    { title: "Blue Christmas", singer: "feat. Gabby", src: "songs/Blue Christmas (feat. Gabby).mp3" },
    { title: "Let It Snow!", singer: "", src: "songs/Let It Snow!.mp3" },
    { title: "Santa Baby", singer: "feat. Tanya & Shawn-D", src: "songs/Santa Baby (feat. Tanya & Shawn-D).mp3" },
    { title: "You're A Mean One, Mr. Grinch", singer: "feat. Sahil, Jayleen, & Muskaan", src: "songs/You’re A Mean One, Mr. Grinch (feat. Sahil, Jayleen, & Muskaan).mp3" },
    { title: "Santa Claus Is Coming To Town", singer: "feat. Bella & David", src: "songs/Santa Claus Is Coming To Town (feat. Bella & David).mp3" },
    { title: "Do You Want To Build A Snowman", singer: "feat. Bri & Nicky", src: "songs/Do You Want To Build A Snowman (feat. Bri & Nicky).mp3" },
    { title: "Holly Jolly Christmas", singer: "feat. Patricia & Nicky", src: "songs/Holly Jolly Christmas (feat. Patricia & Nicky).mp3" },
    { title: "Grandma Got Run Over by a Reindeer", singer: "", src: "songs/Grandma Got Run over by a Reindeer.mp3" },
    { title: "White Christmas", singer: "feat. Julia & Liam", src: "songs/White Christmas (feat. Julia & Liam).mp3" },
    { title: "Frosty The Snowman", singer: "feat. Taran", src: "songs/Frosty The Snowman (feat. Taran).mp3" },
    { title: "All I Want for Christmas Is You", singer: "feat. Jaden", src: "songs/All I Want for Christmas Is You(feat. Jaden).mp3" },
    { title: "Rudolph the Red-Nosed Reindeer", singer: "feat. Alejandro & Justin", src: "songs/Rudolph the Red-Nosed Reindeer (feat. Alejandro & Justin).mp3" },
    { title: "The Christmas Song", singer: "feat. Scarlett & Austin", src: "songs/The Christmas Song (feat. Scarlett & Austin).mp3" },
    { title: "I Saw Mommy Kissing Santa Claus", singer: "", src: "songs/I Saw Mommy Kissing Santa Claus.mp3" },
    { title: "Silent Night", singer: "feat. Lucas, Zillah, & Carson", src: "songs/Silent Night (feat. Lucas, Zillah, & Carson).mp3" },
    { title: "Underneath the Tree", singer: "feat. David", src: "songs/Underneath the Tree (feat. David).mp3" },
    { title: "Feliz Navidad", singer: "feat. Jayleen", src: "songs/Feliz Navidad (feat. Jayleen).mp3" },
    { title: "It's Beginning To Look A Lot Like Christmas", singer: "feat. Catalina & Bella", src: "songs/It’s Beginning To Look A Lot Like Christmas (feat. Catalina & Bella).mp3" },
    { title: "Mistletoe", singer: "feat. Liam", src: "songs/Mistletoe (feat. Liam).mp3" },
    { title: "O Come All Ye Faithful", singer: "feat. Akosua, Oscar, & Jaden", src: "songs/O Come All Ye Faithful (feat. Akosua, Oscar, & Jaden).mp3" },
    { title: "Rockin' Around The Christmas Tree", singer: "", src: "songs/Rockin’ Around The Christmas.mp3" },
    { title: "Mi Burrito Sabanero", singer: "feat. Nicholas, Sahil, & Alejandro", src: "songs/Mi Burrito Sabanero (feat. Nicholas, Sahil, & Alejandro).mp3" },
    { title: "The Little Drummer Boy", singer: "feat. Shawn-D", src: "songs/The Little Drummer Boy (feat. Shawn-D).mp3" },
    { title: "Santa Tell Me", singer: "feat. Melissa, Vaishnavi, Pascalyn, & Trishtan", src: "songs/Santa Tell Me (feat. Melissa, Vaishnavi, Pascalyn, & Trishtan).mp3" },
    { title: "Novogodnii", singer: "feat. Daniel & Anya", src: "songs/Novogodnii (feat. Daniel & Anya).mp3" },
    { title: "O Holy Night", singer: "feat. Lia", src: "songs/O Holy Night (feat. Lia).mp3" },
    { title: "This Christmas", singer: "", src: "songs/This Christmas.mp3" },
];


const audioPlayer = document.getElementById("audioPlayer");
const songList = document.getElementById("song-list");
const songTitle = document.getElementById("song-title");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progress");
const waveCanvas = document.getElementById("waveCanvas");
const canvasContext = waveCanvas.getContext("2d");

waveCanvas.width = 300;
waveCanvas.height = 300;

let currentSongIndex = 0;
let audioContext, analyser, dataArray;

// Populate Playlist with Title and Singer Name
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.className = "song-item";

    li.innerHTML = `
        <div class="song-info">
            <div class="song-title">${song.title}</div>
            <div class="singer-name">${song.singer}</div>
        </div>
        <div class="song-buttons">
            <i class="fas fa-play" title="Play"></i>
        </div>
    `;

    li.addEventListener("click", () => loadSong(index));
    songList.appendChild(li);
});

// Load and Play a Song
function loadSong(index) {
    currentSongIndex = index;
    audioPlayer.src = songs[index].src;
    songTitle.textContent = `${songs[index].title} - ${songs[index].singer}`;
    updateActiveSong();
    audioPlayer.play();
    playPauseBtn.textContent = "⏸";
}

// Highlight the Active Song
function updateActiveSong() {
    [...songList.children].forEach((li, idx) => {
        li.classList.toggle("active", idx === currentSongIndex);
    });
}

// Update Progress Bar
audioPlayer.addEventListener("timeupdate", () => {
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${percentage}%`;
});

// Play/Pause Button Control
playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "▶";
    }
});

// Play Next Song Automatically
audioPlayer.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Next/Previous Buttons
document.getElementById("nextBtn").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

document.getElementById("prevBtn").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Initialize the First Song
loadSong(currentSongIndex);

// Audio Visualizer Setup
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
    const radius = 100;
    const barCount = dataArray.length;

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        canvasContext.clearRect(0, 0, waveCanvas.width, waveCanvas.height);

        for (let i = 0; i < barCount; i++) {
            const value = dataArray[i];
            const angle = (i / barCount) * (2 * Math.PI);

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
    audioContext.resume();
});

audioPlayer.addEventListener("pause", () => {
    if (audioContext) audioContext.suspend();
});