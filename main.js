// ----- Generate HTML -----
const container = document.getElementById("ownersContainer");

owners.forEach(o => {
  const section = document.createElement("div");
  section.className = "owner-section";
  section.dataset.track = o.track;

  if (["ArcaneVix", "Shayma9749" , "solemyst_twt", "MochiMeowllow" , "xinghuiatus", "SylRafZayXavCal"  ].includes(o.name)) {
    section.classList.add("behind-pegboard");
  }

  // ----- Generate photostrip buttons -----
  let photostripButtons = "";
  o.photostrips?.forEach(strip => {
    photostripButtons += `
      <button class="viewPhoto" data-type="strip" data-src="${strip.img}"
              style="bottom:${strip.pos.bottom}; left:${strip.pos.left};"></button>
    `;
  });

  // ----- Generate photoframe buttons -----
  let photoframeButtons = "";
  if (Array.isArray(o.photoframes)) {
    o.photoframes.forEach(frame => {
      photoframeButtons += `
        <button class="viewPhoto" data-type="frame" data-src="${frame.img}"
                style="bottom:${frame.pos.bottom}; right:${frame.pos.right};"></button>
      `;
    });
  } else if (o.photoframe) {
    photoframeButtons += `
      <button class="viewPhoto" data-type="frame" data-src="${o.photoframe}"
              style="bottom:${o.photoframePos.bottom}; right:${o.photoframePos.right};"></button>
    `;
  }

section.innerHTML = `
  <div class="owner-img">
    <img src="${o.ownerImg}" alt="${o.name}" loading="lazy">
  </div>
  <div class="pegboard-wrapper">
    <img src="${o.pegboardImg}" alt="Pegboard ${o.name}" class="pegboard" loading="lazy">
    <button class="playSpotify"
            style="bottom:${o.headphonePos.bottom}; right:${o.headphonePos.right};"></button>
    ${photostripButtons}
    ${photoframeButtons}
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

    // Set the new track
    spotifyPlayer.src = trackURL;

    // Always show + un-minimize the player
    spotifyContainer.style.display = "block";
    spotifyContainer.classList.remove("minimized");
    toggleBtn.textContent = "–"; // set back to expanded icon
  }
});

toggleBtn.addEventListener("click", () => {
  spotifyContainer.classList.toggle("minimized");
  toggleBtn.textContent = spotifyContainer.classList.contains("minimized") ? "+" : "–";
});


// ----- Photo Modal Logic -----
// ----- Photo Modal Logic -----
const modal = document.getElementById("photoModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", e => {
  if (!e.target.classList.contains("viewPhoto")) return;

  const section = e.target.closest(".owner-section");
  const ownerName = section.querySelector(".owner-img img").alt;
  const clickedSrc = e.target.dataset.src;
  const clickedType = e.target.dataset.type;

  modalContent.innerHTML = ""; // Clear previous images

  // ✅ List of owners that have multiple photostrips
  const multiPhotoOwners = [
    "miwaluvsy",
    "mephistomum",
    "snowfllay",
    "miffymoch",
    "Syreenie",
    "catsyIus",
    "alyaa_ayo",
    "ArcaneVix",
    "snowyplli",
    "maiappleb",
    "taeohbeng",
    "DearLoveLily",
    "irnemin",
    "sylusplume",
    "Ryuno_Aika",
    "xinghuiatus",
    "haujux",
    "cremezayniee",
     "shenliquor",
     "Dew_Lus",
     "missapplelle",
     "galaxyboo_",
     "acahthzzn",
     "5y1u541ife",
     "rafayelpregnant",
     "ai00_rin",
     "applecrow_lover"
  ];

  // ✅ Show all photostrips for certain owners
  if (clickedType === "strip" && multiPhotoOwners.includes(ownerName)) {
    const owner = owners.find(o => o.name === ownerName);
    if (owner?.photostrips) {
      owner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        img.loading = "lazy"; 
        modalContent.appendChild(img);
      });
    }
  } 
  // ✅ Default: show single photo
  else {
    const img = document.createElement("img");
    img.src = clickedSrc;
    img.alt = "Photo";
    img.loading = "lazy"; 
    modalContent.appendChild(img);
  }

  modal.style.display = "flex";
});


closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});
