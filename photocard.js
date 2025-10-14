  
    (function () {
      const numCards = 70; // change this based on how many pairs you have
      const grid = document.getElementById("grid");

      function makeCard(index) {
        const wrapper = document.createElement("div");
        wrapper.className =
          // aspect-[ratio] ensures 5.5/8.5 ratio, width scales responsively
          "relative perspective w-[120px] sm:w-[150px] md:w-[180px] lg:w-[220px] aspect-[55/85]";

        const card = document.createElement("div");
        card.className =
          "card relative w-full h-full cursor-pointer transform transition-transform duration-500";
        card.setAttribute("tabindex", "0");

        // Front
  //       const front = document.createElement("div");
  //       front.className =
  // "card-face absolute inset-0 rounded-lg overflow-hidden shadow-white border border-white/30 ";
  //       const fimg = document.createElement("img");
  //       fimg.src = `assets/image/front/${index}.png`;
  //       fimg.alt = `Front of card ${index}`;
  //       fimg.className = "w-full h-full object-cover";
  //       front.appendChild(fimg);


// Front
const front = document.createElement("div");
front.className =
  "card-face relative overflow-hidden rounded-lg border border-white/30 shadow-white";

const fimg = document.createElement("img");
fimg.src = `assets/image/front/${index}.png`;
fimg.alt = `Front of card ${index}`;
fimg.className = "w-full h-full object-cover";

// Radiant shiny overlay
const radiantOverlay = document.createElement("div");
radiantOverlay.className =
  "absolute inset-0 rounded-lg pointer-events-none radiant-overlay";

front.appendChild(fimg);
front.appendChild(radiantOverlay);


        // Back
        const back = document.createElement("div");
        back.className =
  "card-face back absolute inset-0 rounded-lg overflow-hidden shadow-white border border-white/30";
        const bimg = document.createElement("img");
        bimg.src = `assets/image/back/${index}.png`;
        bimg.alt = `Back of card ${index}`;
        bimg.className = "w-full h-full object-cover";
        back.appendChild(bimg);

        card.appendChild(front);
        card.appendChild(back);
        wrapper.appendChild(card);

        // flip on click
        card.addEventListener("click", () => {
          card.classList.toggle("is-flipped");
        });

        // flip on keyboard
        card.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            card.classList.toggle("is-flipped");
          }
        });

        return wrapper;
      }

      for (let i = 1; i <= numCards; i++) {
        grid.appendChild(makeCard(i));
      }
    })();
  


  // Wait until all cards are rendered
  window.addEventListener("DOMContentLoaded", () => {
    const flipToFrontBtn = document.getElementById("flipAllFront");
    const flipToBackBtn = document.getElementById("flipAllBack");

    function flipAll(toBack = true) {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card, i) => {
        setTimeout(() => {
          if (toBack) {
            card.classList.add("is-flipped");
          } else {
            card.classList.remove("is-flipped");
          }
        }, i * 50); // wave delay (50ms per card)
      });
    }

    flipToFrontBtn.addEventListener("click", () => flipAll(false));
    flipToBackBtn.addEventListener("click", () => flipAll(true));
  });




  const bgm = document.getElementById("bgm");
  const playButton = document.getElementById("playMusic");
  const musicIcon = document.getElementById("musicIcon");
  let isPlaying = false;

  playButton.addEventListener("click", () => {
    if (!isPlaying) {
      bgm.volume = 0.4;
      bgm.play();
      isPlaying = true;
      musicIcon.src = "assets/image/music_pause.png"; // replace with your pause icon
    } else {
      bgm.pause();
      isPlaying = false;
      musicIcon.src = "assets/image/music.png"; // original music note image
    }
  });



  // Detect touch devices
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    // 💫 Desktop only — enable glowing cursor
    const fairyCursor = document.createElement("div");
    fairyCursor.id = "fairyCursor";
    document.body.appendChild(fairyCursor);

    window.addEventListener("mousemove", (e) => {
      fairyCursor.style.left = e.pageX + "px";
      fairyCursor.style.top = e.pageY + "px";

      // Create fairy dust particles occasionally
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.style.left = e.pageX + "px";
      sparkle.style.top = e.pageY + "px";

      const colors = [
        "rgba(255,182,193,0.9)",
        "rgba(173,216,230,0.9)",
        "rgba(255,255,224,0.9)",
        "rgba(221,160,221,0.9)",
        "rgba(240,255,255,0.9)"
      ];
      sparkle.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%)`;

      document.body.appendChild(sparkle);

      const driftX = (Math.random() - 0.5) * 30;
      const driftY = (Math.random() - 0.5) * 30;
      sparkle.animate([
        { transform: `translate(0, 0) scale(1)`, opacity: 1 },
        { transform: `translate(${driftX}px, ${driftY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 500,
        easing: "ease-out",
        fill: "forwards"
      });

      setTimeout(() => sparkle.remove(), 1200);
    });
  } else {
    // 📱 Touch device — hide cursor completely
    document.body.style.cursor = "auto"; // restore default cursor
    document.querySelectorAll("*").forEach(el => el.style.cursor = "auto");
  }
