
// =====================================
// SAHANA'S CINEMATIC BIRTHDAY SLIDESHOW
// =====================================

// PART 1: SAHANA'S PHOTOS

const herPhotos = [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg"
];

// PART 1: HER VIDEOS
// Change filenames if yours are different.

const herVideos = [
    "videos/video1.mp4",
    "videos/video2.mp4"
];

// PART 2: SCHOOL MEMORIES
// Add all school photo filenames here.
// No videos in this section.

const schoolPhotos = [
    "school-photos/school1.jpeg",
    "school-photos/school2.jpeg",
    "school-photos/school3.jpeg",
    "school-photos/school4.jpeg",
    "school-photos/school5.jpeg",
    "school-photos/school6.jpeg",
    "school-photos/school7.jpeg",
    "school-photos/school8.jpeg",
    "school-photos/school9.jpeg",
    "school-photos/school10.jpeg",
    "school-photos/school11.jpeg",
    "school-photos/school12.jpeg",
    "school-photos/school13.jpeg",
    "school-photos/school14.jpeg",
    "school-photos/school15.jpeg",
    "school-photos/school16.jpeg",
    "school-photos/school17.jpeg",
    "school-photos/school18.jpeg",
    "school-photos/school19.jpeg",
    "school-photos/school20.jpeg",
    "school-photos/school21.jpeg",
    "school-photos/school22.jpeg",
    "school-photos/school23.jpeg",
    "school-photos/school24.jpeg",
    "school-photos/school25.jpeg",
    "school-photos/school26.jpeg",
    "school-photos/school27.jpeg",
    "school-photos/school28.jpeg",
    "school-photos/school29.jpeg",
    "school-photos/school30.jpeg",
    "school-photos/school31.jpeg",
    "school-photos/school32.jpeg",
    "school-photos/school33.jpeg",
    "school-photos/group-photo.jpeg"
];


// BUILD THE COMPLETE SLIDESHOW

const memories = [];

const personalCount = Math.max(
    herPhotos.length,
    herVideos.length
);

// FIRST: PERSONAL PHOTOS AND VIDEOS

for (let i = 0; i < personalCount; i++) {

    if (herPhotos[i]) {
        memories.push({
            type: "image",
            src: herPhotos[i],
            caption: "A beautiful memory of you ♡"
        });
    }

    if (herVideos[i]) {
        memories.push({
            type: "video",
            src: herVideos[i],
            caption: "Little moments, big memories ❤️"
        });
    }
}

// SECOND: SCHOOL PHOTOS ONLY

schoolPhotos.forEach((photo) => {

    memories.push({
        type: "image",
        src: photo,
        caption: "Remember our school days? ♡"
    });

});


// SETTINGS

const PHOTO_DURATION = 5000;
const BLACK_TRANSITION =70;


// ELEMENTS

const welcome = document.getElementById("welcome");
const slideshow = document.getElementById("slideshow");
const container = document.getElementById("media-container");
const caption = document.getElementById("slide-caption");
const counter = document.getElementById("slide-counter");
const music = document.getElementById("background-music");

let currentIndex = 0;
let photoTimer;
let transitionTimer;
let activeVideo = null;
let started = false;


// OPEN SURPRISE


async function openSurprise() {

    clearTimeout(photoTimer);
    clearTimeout(transitionTimer);

    welcome.style.display = "none";
    document.getElementById("ending").style.display = "none";

    const blast = document.getElementById("birthday-blast");
    const confetti = document.getElementById("confetti-container");

    blast.classList.add("show");

    music.volume = 0.45;
    music.currentTime = 0;
    music.play().catch(console.log);

    confetti.innerHTML = "";

    const colors = ["#f4b8d0", "#e9bd75", "#ffffff", "#d9a7ed", "#ff8fa3"];

    for (let i = 0; i < 150; i++) {
        const piece = document.createElement("span");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 1.2 + "s";
        confetti.appendChild(piece);
    }

    setTimeout(() => {
        blast.classList.remove("show");
        confetti.innerHTML = "";

        slideshow.style.display = "block";
        currentIndex = 0;
        started = true;

        showMemory();
    }, 4000);
}



// DISPLAY MEMORIES

function showMemory() {

    clearTimeout(photoTimer);
    clearTimeout(transitionTimer);

    if (!started) return;

    if (currentIndex >= memories.length) {
        finishSlideshow();
        return;
    }

    const memory = memories[currentIndex];

    if (activeVideo) {
        activeVideo.pause();
        activeVideo = null;
    }

    slideshow.classList.add("transitioning");

    container.innerHTML = "";
    caption.textContent = "";

    counter.textContent =
        `${currentIndex + 1} / ${memories.length}`;

    // BLACK SCREEN TRANSITION

    transitionTimer = setTimeout(() => {

        if (!started) return;

        let media;

        if (memory.type === "image") {

            media = document.createElement("img");

            media.src = memory.src;

            media.alt = "Beautiful memory";

            media.onload = () => {
                if (started) {
                    slideshow.classList.remove("transitioning");
                }
            };

            media.onerror = nextMemory;

        } else {

            media = document.createElement("video");

            media.src = memory.src;
            media.autoplay = true;
            media.muted = true;
            media.playsInline = true;
            media.preload = "auto";

            activeVideo = media;

            media.onended = nextMemory;
            media.onerror = nextMemory;

        }

        container.appendChild(media);

        caption.textContent = memory.caption;

        if (memory.type === "image") {

            slideshow.classList.remove("transitioning");

            photoTimer = setTimeout(
                nextMemory,
                PHOTO_DURATION
            );

        } else {

            slideshow.classList.remove("transitioning");

            media.play().catch(console.log);

        }

    }, BLACK_TRANSITION);
}


// NEXT MEMORY

function nextMemory() {

    if (!started) return;

    clearTimeout(photoTimer);
    clearTimeout(transitionTimer);

    currentIndex++;

    showMemory();
}


// FINAL BIRTHDAY SCREEN

function finishSlideshow() {

    started = false;

    if (activeVideo) {
        activeVideo.pause();
        activeVideo = null;
    }

    slideshow.style.display = "none";

    document.getElementById("ending").style.display = "block";

    music.pause();
    music.currentTime = 0;

    window.scrollTo(0, 0);
}





// REPLAY

function replaySurprise() {

    document.getElementById("ending").style.display = "none";

    openSurprise();

}

function showLetter() {
    document.getElementById("ending").style.display = "none";
    document.getElementById("letter-screen").style.display = "block";
    window.scrollTo(0, 0);
}

function showFinalCard() {
    document.getElementById("letter-screen").style.display = "none";

    const finalCard = document.getElementById("final-card");
    finalCard.style.display = "flex";

    window.scrollTo(0, 0);
}



