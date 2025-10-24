// ----- Generate HTML -----
const container = document.getElementById("ownersContainer");

owners.forEach(o => {
  const section = document.createElement("div");
  section.className = "owner-section";
  section.dataset.track = o.track;

  // 👇 Add this line to make only ArcaneVix go behind the pegboard
  if (o.name === "ArcaneVix") {
    section.classList.add("behind-pegboard");
  }

  let photostripButtons = "";
  o.photostrips.forEach(strip => {
    photostripButtons += `
      <button class="viewPhoto" data-type="strip" data-src="${strip.img}"
              style="bottom:${strip.pos.bottom}; left:${strip.pos.left};"></button>
    `;
  });

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
// ----- Photo Modal Logic -----
const modal = document.getElementById("photoModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

document.addEventListener("click", e => {
  if (e.target.classList.contains("viewPhoto")) {
    const section = e.target.closest(".owner-section");
    const ownerName = section.querySelector(".owner-img img").alt;
    const clickedSrc = e.target.dataset.src;
    const clickedType = e.target.dataset.type;

    modalContent.innerHTML = ""; // clear previous images

    // Check if owner is miwaluvsy and button type is photostrip
    if (ownerName === "miwaluvsy" && clickedType === "strip") {
      const miwaOwner = owners.find(o => o.name === "miwaluvsy");
      miwaOwner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        modalContent.appendChild(img);
      });
    } 
       else if (ownerName === "mephistomum" && clickedType === "strip") {
      const izzyOwner = owners.find(o => o.name === "mephistomum");
      izzyOwner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        modalContent.appendChild(img);
      });
    }
      else if (ownerName === "snowfllay" && clickedType === "strip") {
      const snowfllayOwner = owners.find(o => o.name === "snowfllay");
      snowfllayOwner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        modalContent.appendChild(img);
      });
    }
        else if (ownerName === "miffymoch" && clickedType === "strip") {
      const miffymochOwner = owners.find(o => o.name === "miffymoch");
      miffymochOwner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        modalContent.appendChild(img);
      });
    }
         else if (ownerName === "Syreenie" && clickedType === "strip") {
      const reenieOwner = owners.find(o => o.name === "Syreenie");
      reenieOwner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        modalContent.appendChild(img);
      });
    }
          else if (ownerName === "catsyIus" && clickedType === "strip") {
      const catsyIusOwner = owners.find(o => o.name === "catsyIus");
      catsyIusOwner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        modalContent.appendChild(img);
      });
    }
               else if (ownerName === "alyaa_ayo" && clickedType === "strip") {
      const alyaa_ayoOwner = owners.find(o => o.name === "alyaa_ayo");
      alyaa_ayoOwner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        modalContent.appendChild(img);
      });
    }
                else if (ownerName === "ArcaneVix" && clickedType === "strip") {
      const ArcaneVixOwner = owners.find(o => o.name === "ArcaneVix");
      ArcaneVixOwner.photostrips.forEach(strip => {
        const img = document.createElement("img");
        img.src = strip.img;
        img.alt = "Photo";
        modalContent.appendChild(img);
      });
    }
    else {
      // Default: show one image
      const img = document.createElement("img");
      img.src = clickedSrc;
      img.alt = "Photo";
      modalContent.appendChild(img);
    }

    modal.style.display = "flex";
  }
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});
