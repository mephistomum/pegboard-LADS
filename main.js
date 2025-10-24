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