// ----- Data: Owners -----
const owners = [
  {
    name: "mephistomum",
    ownerImg: "assets/image/owner/mephistomum.png",
    pegboardImg: "assets/image/pegboard/mephistomum.png",
    track: "https://open.spotify.com/embed/track/48jRAABr5TxjWHvoNWClGG?utm_source=generator",
    headphonePos: { bottom: "0vw", right: "3.5vw" },
    photostrips: [
      { img: "assets/image/photostrip/mephistomum1.png", pos: { bottom: "2vw", left: "8vw" } },
      { img: "assets/image/photostrip/mephistomum2.png", pos: { bottom: "7vw", left: "12vw" } }
    ],
    photoframe: "assets/image/photoframe/mephistomum.jpg",
    photoframePos: { bottom: "3vw", right: "22vw" }
  },
  {
    name: "snowfllay",
    ownerImg: "assets/image/owner/snowfllay.png",
    pegboardImg: "assets/image/pegboard/snowfllay.png",
    track: "https://open.spotify.com/embed/track/43mnNatwMMydJ4CxMdQVnJ?utm_source=generator",
    headphonePos: { bottom: "29vw", right: "10.5vw" },
    photostrips: [
      { img: "assets/image/photostrip/snowfllay1.png", pos: { bottom: "1vw", left: "10vw" } },
      { img: "assets/image/photostrip/snowfllay2.png", pos: { bottom: "6vw", left: "14vw" } }
    ],
    photoframe: "assets/image/photoframe/snowfllay.jpg",
    photoframePos: { bottom: "2vw", right: "18vw" }
  },
  {
    name: "miffymoch",
    ownerImg: "assets/image/owner/miffymoch.png",
    pegboardImg: "assets/image/pegboard/miffymoch.png",
    track: "https://open.spotify.com/embed/track/1JYtwhnjpVxQeYE9uyU2Lx?utm_source=generator",
    headphonePos: { bottom: "1vw", right: "2.5vw" },
    photostrips: [
      { img: "assets/image/photostrip/miffymoch1.png", pos: { bottom: "3vw", left: "18vw" } },
      { img: "assets/image/photostrip/miffymoch2.png", pos: { bottom: "5vw", left: "12.5vw" } }
    ],
    photoframe: "assets/image/photoframe/miffymoch.jpg",
    photoframePos: { bottom: "4vw", right: "34vw" }
  },
    {
    name: "suzu",
    ownerImg: "assets/image/owner/suzu.png",
    pegboardImg: "assets/image/pegboard/pinkcrispss.png",
    track: "https://open.spotify.com/embed/track/5DxDLsW6PsLz5gkwC7Mk5S?utm_source=generator",
    headphonePos: { bottom: "27vw", right: "0.5vw" },
    photostrips: [
      { img: "assets/image/photostrip/pinkcrispss1.png", pos: { bottom: "32vw", left: "8vw" } },
      { img: "assets/image/photostrip/pinkcrispss2.png", pos: { bottom: "17vw", left: "6.5vw" } }
    ],
    photoframe: "assets/image/photoframe/suzu.jpg",
    photoframePos: { bottom: "1vw", right: "22vw" }
  },
    {
    name: "reenie",
    ownerImg: "assets/image/owner/reenie.png",
    pegboardImg: "assets/image/pegboard/Syreenieee.png",
    track: "https://open.spotify.com/embed/track/3HMY0r2BAdpasXMY8rseR0?utm_source=generator",
    headphonePos: { bottom: "8vw", right: "0.5vw" },
    photostrips: [
      { img: "assets/image/photostrip/Syreenie1.png", pos: { bottom: "6vw", left: "23.5vw" } },
      { img: "assets/image/photostrip/Syreenie2.png", pos: { bottom: "3vw", left: "18.5vw" } }
    ],
    photoframe: "assets/image/photoframe/syreenie.jpg",
    photoframePos: { bottom: "1vw", right: "27vw" }
  }
];

// ----- Generate HTML -----
const container = document.getElementById("ownersContainer");

owners.forEach(o => {
  const section = document.createElement("div");
  section.className = "owner-section";
  section.dataset.track = o.track;

  // Build the photostrip buttons dynamically
  let photostripButtons = "";
  o.photostrips.forEach(strip => {
    photostripButtons += `
      <button class="viewPhoto" data-type="strip" data-src="${strip.img}"
              style="bottom:${strip.pos.bottom}; left:${strip.pos.left};"></button>
    `;
  });

  // Build the full section
  section.innerHTML = `
    <div class="owner-img">
      <img src="${o.ownerImg}" alt="${o.name}">
    </div>
    <div class="pegboard-wrapper">
      <img src="${o.pegboardImg}" alt="Pegboard ${o.name}" class="pegboard">
      <button class="playSpotify"
              style="bottom:${o.headphonePos.bottom}; right:${o.headphonePos.right};"></button>
      ${photostripButtons}
      <button class="viewPhoto" data-type="frame" data-src="${o.photoframe}"
              style="bottom:${o.photoframePos.bottom}; right:${o.photoframePos.right};"></button>
    </div>
  `;

  container.appendChild(section);
});

// ----- Carousel Logic -----
let currentIndex = 0;
const total = owners.length;

const updateCarousel = () => {
  container.style.transform = `translateX(-${currentIndex * 100}%)`;
};

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % total;
  updateCarousel();
});

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + total) % total;
  updateCarousel();
});

// ----- Spotify Logic -----
const spotifyContainer = document.getElementById("spotifyContainer");
const spotifyPlayer = document.getElementById("spotifyPlayer");
const toggleBtn = document.getElementById("togglePlayer");

spotifyContainer.style.display = "none";

document.addEventListener("click", e => {
  if (e.target.classList.contains("playSpotify")) {
    const section = e.target.closest(".owner-section");
    const trackURL = section.dataset.track;
    spotifyPlayer.src = trackURL;
    spotifyContainer.style.display = "block";
  }
});

toggleBtn.addEventListener("click", () => {
  spotifyContainer.classList.toggle("minimized");
  toggleBtn.textContent = spotifyContainer.classList.contains("minimized") ? "+" : "–";
});

// ----- Photo Modal Logic -----
const modal = document.getElementById("photoModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", e => {
  if (e.target.classList.contains("viewPhoto")) {
    const imgSrc = e.target.dataset.src;
    modalImg.src = imgSrc;
    modal.style.display = "flex";
  }
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});