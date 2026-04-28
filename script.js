const boot = document.querySelector("[data-boot]");
const bootText = document.querySelector("[data-boot-text]");
const fx = document.querySelector(".screen-fx");
const tape = document.querySelector("[data-tape]");
const playButton = document.querySelector(".play-core");
const tapeState = document.querySelector("[data-tape-state]");
const inlineTrailer = document.querySelector("[data-inline-trailer]");
const soundButton = document.querySelector("[data-sound]");
const scrambleTitle = document.querySelector("[data-scramble]");
const secretTitle = document.querySelector("[data-secret]");
const easter = document.querySelector("[data-easter]");
const frequency = document.querySelector("[data-frequency]");
const frequencyOutput = document.querySelector("[data-frequency-output]");
const frequencyStatus = document.querySelector("[data-frequency-status]");
const hiddenFragment = document.querySelector("[data-hidden-fragment]");
const terminalForm = document.querySelector("[data-terminal-form]");
const terminalInput = document.querySelector("[data-terminal-input]");
const terminalOutput = document.querySelector("[data-terminal-output]");
const fearOutput = document.querySelector("[data-fear-output]");
const fearBar = document.querySelector("[data-fear-bar]");
const inventoryItems = document.querySelectorAll("[data-item]");
const secretDoor = document.querySelector("[data-secret-door]");
const puzzleStatus = document.querySelector("[data-puzzle-status]");
const distressForm = document.querySelector("[data-distress-form]");
const distressOutput = document.querySelector("[data-distress-output]");
const stationMap = document.querySelector("[data-station-map]");
const mapStatus = document.querySelector("[data-map-status]");
const ending = document.querySelector("[data-ending]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const navLinks = document.querySelectorAll(".nav-shell nav a");
const shots = document.querySelectorAll(".shot");
const toastStack = document.querySelector("[data-toast-stack]");
const puzzleSteps = document.querySelectorAll("[data-step]");
const pressModal = document.querySelector("[data-press-modal]");
const pressOpen = document.querySelector("[data-press-open]");
const pressClose = document.querySelector("[data-press-close]");
const wishlistModal = document.querySelector("[data-wishlist-modal]");
const wishlistOpen = document.querySelector("[data-wishlist-open]");
const wishlistClose = document.querySelector("[data-wishlist-close]");
const wishlistConfirm = document.querySelector("[data-wishlist-confirm]");
const demoModal = document.querySelector("[data-demo-modal]");
const demoOpenButtons = document.querySelectorAll("[data-demo-open]");
const demoClose = document.querySelector("[data-demo-close]");
const demoConfirm = document.querySelector("[data-demo-confirm]");
const trailerModal = document.querySelector("[data-trailer-modal]");
const trailerVideo = document.querySelector("[data-trailer-video]");
const trailerClose = document.querySelector("[data-trailer-close]");
const archiveButtons = document.querySelectorAll("[data-signal]");
const externalRoutes = document.querySelectorAll("[data-external-route]");
const langToggle = document.querySelector("[data-lang-toggle]");

const glyphs = "NOSIGNAL0316_";
let soundOn = true;
let secretClicks = 0;
let fearLevel = 0;
let puzzleScanned = false;
let puzzleFrequencyLocked = false;
let puzzleOpened = false;
let frequencyFearRaised = false;
let criticalLineShown = false;
let currentLang = localStorage.getItem("noSignalLang") || "ru";
let trailerAudioLocked = false;
let audioUnlockArmed = false;
const sounds = {
  ambient: new Audio("assets/audio/ambient-horror.mp3"),
  click: new Audio("assets/audio/ui-click.mp3"),
  scanner: new Audio("assets/audio/scanner-lock.mp3"),
  glitch: new Audio("assets/audio/glitch-static.mp3"),
  unlock: new Audio("assets/audio/door-unlock.mp3"),
};

sounds.ambient.loop = true;
sounds.ambient.volume = 0.12;
sounds.click.volume = 0.2;
sounds.scanner.volume = 0.26;
sounds.glitch.volume = 0.18;
sounds.unlock.volume = 0.38;

const terminalReplies = {
  scan: "scan complete: movement absent / audio present / water level rising",
  map: "map error: sector 06 overlaps with sector 06 / route duplicated",
  "open b-7": "door B-7 already open / command timestamp is from tomorrow",
  "play tape": "tape queued: operator room / voice source moved behind you",
  help: "commands: scan / map / open b-7 / play tape",
};

const itemLabels = {
  keycard: "ключ-карта",
  tape: "кассета",
  map: "мокрая карта",
  badge: "бейдж оператора",
};

const criticalLines = [
  "save file rewritten / route memory changed",
  "camera feed delayed by your next step",
  "operator heartbeat detected in terminal cache",
  "map layer replaced with unknown platform",
];

const translations = {
  ru: {
    title: "NO SIGNAL - Лиминальный хоррор",
    description: "NO SIGNAL - интерактивный промо-сайт лиминального инди-хоррора.",
    map: {
      ".nav-shell nav a[href='#scanner']": "Сканер",
      ".nav-shell nav a[href='#terminal']": "Терминал",
      ".nav-shell nav a[href='#screens']": "Кадры",
      ".nav-shell nav a[href='#release']": "Релиз",
      ".hero-ui .lead": "Лиминальный инди-хоррор про станцию, которой нет на карте. Камеры показывают соседние версии коридоров, а звук всегда приходит первым.",
      ".hero-actions .neo-button.primary span": "смотреть запись",
      ".hero-actions .neo-button:not(.primary) span": "открыть терминал",
      ".about-game .copy-block h2": "Это хоррор про место, которое отвечает раньше игрока.",
      ".trailer-zone .copy-block h2": "Трейлер как системный сбой, а не просто видео.",
      ".trailer-zone .copy-block p:not(.micro)": "Нажатие запускает “архив”: интерфейс меняет состояние, кадр оживает, и сайт начинает ощущаться как часть игры.",
      ".scanner .copy-block h2": "Поймай частоту 31.6 Hz.",
      ".map-zone .copy-block h2": "Карта станции ломается в реальном времени.",
      ".terminal-zone .copy-block h2": "Введи команду: scan, map, open b-7, play tape.",
      ".secret-door h2": { html: "Закрытый маршрут: введи scan, поймай 31.6 Hz, затем <span class=\"nowrap\">open B-7</span>." },
      ".release h2": "Если станция появилась в списке, она уже знает твой маршрут.",
      ".cta-grid [data-wishlist-open] span": "в желаемое steam",
      ".cta-grid [data-demo-open] span": "скачать демо",
      ".cta-grid [data-press-open] span": "пресс-кит",
      ".cta-grid [data-external-route] span": "доступ discord",
      ".distress button": "отправить",
    },
  },
  en: {
    title: "NO SIGNAL - Liminal Horror",
    description: "NO SIGNAL - an interactive promo site for a liminal indie horror game.",
    map: {
      ".nav-shell nav a[href='#scanner']": "Scanner",
      ".nav-shell nav a[href='#terminal']": "Terminal",
      ".nav-shell nav a[href='#screens']": "Screens",
      ".nav-shell nav a[href='#release']": "Release",
      ".hero-ui .lead": "A liminal indie horror game about a station missing from every map. Cameras show neighboring versions of corridors, and sound always arrives first.",
      ".hero-actions .neo-button.primary span": "watch tape",
      ".hero-actions .neo-button:not(.primary) span": "open terminal",
      ".about-game .copy-block h2": "A horror game about a place that answers before the player does.",
      ".trailer-zone .copy-block h2": "The trailer behaves like a system failure, not a normal video.",
      ".trailer-zone .copy-block p:not(.micro)": "Pressing play opens the archive: the interface shifts state, the frame comes alive, and the site starts feeling like part of the game.",
      ".scanner .copy-block h2": "Lock the 31.6 Hz frequency.",
      ".map-zone .copy-block h2": "The station map breaks in real time.",
      ".terminal-zone .copy-block h2": "Enter a command: scan, map, open b-7, play tape.",
      ".secret-door h2": { html: "Closed route: enter scan, lock 31.6 Hz, then <span class=\"nowrap\">open B-7</span>." },
      ".release h2": "If the station appears on your list, it already knows your route.",
      ".cta-grid [data-wishlist-open] span": "wishlist on steam",
      ".cta-grid [data-demo-open] span": "download demo",
      ".cta-grid [data-press-open] span": "press kit",
      ".cta-grid [data-external-route] span": "discord access",
      ".distress button": "send",
    },
  },
};

function applyTranslations(lang) {
  const pack = translations[lang] || translations.ru;
  document.documentElement.lang = lang;
  document.title = pack.title;
  document.querySelector("meta[name='description']")?.setAttribute("content", pack.description);
  Object.entries(pack.map).forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (!element) return;
    if (typeof text === "object" && text.html) {
      element.innerHTML = text.html;
      return;
    }
    element.textContent = text;
  });
  if (langToggle) langToggle.textContent = lang === "ru" ? "RU / EN" : "EN / RU";
}

applyTranslations(currentLang);

function setActiveNav(hash = window.location.hash) {
  if (!hash) return;
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === hash);
  });
}

window.addEventListener("hashchange", () => setActiveNav());
setActiveNav();

const introSeen = localStorage.getItem("noSignalIntroSeen") === "true";
if (introSeen) {
  if (bootText) bootText.textContent = "SIGNAL RESTORED";
  window.setTimeout(() => boot?.classList.add("is-hidden"), 520);
} else {
  window.setTimeout(() => {
    if (bootText) bootText.textContent = "SIGNAL FOUND";
  }, 900);

  window.setTimeout(() => {
    boot?.classList.add("is-hidden");
    localStorage.setItem("noSignalIntroSeen", "true");
  }, 1700);
}

function showToast(message) {
  if (!toastStack) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastStack.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2800);
}

function syncSoundToggle() {
  if (!soundButton) return;
  soundButton.textContent = soundOn ? "sound on" : "sound off";
  document.body.classList.toggle("audio-on", soundOn);
}

function raiseFear(amount) {
  fearLevel = Math.min(100, fearLevel + amount);
  const formatted = String(Math.round(fearLevel)).padStart(2, "0");
  if (fearOutput) fearOutput.textContent = `${formatted}%`;
  fearBar?.style.setProperty("--fear", `${fearLevel}%`);
  document.body.classList.toggle("fear-high", fearLevel >= 66);
  document.body.classList.toggle("fear-critical", fearLevel >= 82);
  if (fearLevel >= 82 && !criticalLineShown) {
    criticalLineShown = true;
    appendTerminalLine(criticalLines[0]);
    showToast("save corrupted");
  }
  showToast("fear level rising");
}

function startAmbient() {
  if (trailerAudioLocked) return Promise.resolve();
  if (sounds.ambient.paused) sounds.ambient.currentTime = 0;
  return sounds.ambient.play();
}

function stopAmbient() {
  sounds.ambient.pause();
}

function stopAllSiteSounds() {
  Object.values(sounds).forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
}

function lockSiteAudioForTrailer(video) {
  trailerAudioLocked = true;
  stopAllSiteSounds();
  if (video) video.volume = 0.84;
}

function unlockSiteAudioAfterTrailer() {
  if (!trailerAudioLocked) return;
  trailerAudioLocked = false;
  if (soundOn) startAmbient().catch(armAudioUnlock);
}

function armAudioUnlock() {
  if (audioUnlockArmed || !soundOn) return;
  audioUnlockArmed = true;
  showToast("audio armed / click to unlock");

  const unlock = () => {
    if (!soundOn || trailerAudioLocked) return;
    startAmbient()
      .then(() => {
        audioUnlockArmed = false;
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("keydown", unlock);
      })
      .catch(() => {});
  };

  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
}

function tryAutoStartAmbient(delay = 0) {
  if (!soundOn) return;
  window.setTimeout(() => {
    startAmbient().catch(armAudioUnlock);
  }, delay);
}

function playSound(name, force = false) {
  if (trailerAudioLocked) return;
  if (!force && !soundOn) return;
  const sound = sounds[name];
  if (!sound) return;
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

window.addEventListener("pointermove", (event) => {
  fx?.style.setProperty("--mx", `${event.clientX}px`);
  fx?.style.setProperty("--my", `${event.clientY}px`);
});

playButton?.addEventListener("click", () => {
  tape?.classList.add("is-playing");
  tape?.classList.add("is-video-open");
  tapeState.textContent = "tape playing";
  if (inlineTrailer) {
    lockSiteAudioForTrailer(inlineTrailer);
    inlineTrailer.currentTime = 0;
    inlineTrailer.play().catch(() => {});
  }
  playSound("glitch");
  showToast("tape corrupted");
  raiseFear(9);
});

inlineTrailer?.addEventListener("ended", () => {
  tape?.classList.remove("is-playing");
  if (tapeState) tapeState.textContent = "tape ended";
  unlockSiteAudioAfterTrailer();
  showToast("tape ended");
});

inlineTrailer?.addEventListener("play", () => {
  tape?.classList.add("is-playing");
  if (tapeState) tapeState.textContent = "tape playing";
  lockSiteAudioForTrailer(inlineTrailer);
});

inlineTrailer?.addEventListener("pause", () => {
  if (inlineTrailer.ended) return;
  unlockSiteAudioAfterTrailer();
});

soundButton?.addEventListener("click", () => {
  soundOn = !soundOn;
  syncSoundToggle();
  playSound("click", true);
  if (soundOn && !trailerAudioLocked) {
    startAmbient().catch(armAudioUnlock);
  } else {
    stopAmbient();
  }
  raiseFear(4);
});

syncSoundToggle();
tryAutoStartAmbient(introSeen ? 620 : 1800);

function scramble() {
  if (!scrambleTitle) return;
  const original = "NO SIGNAL";
  let frame = 0;
  const timer = window.setInterval(() => {
    scrambleTitle.textContent = original
      .split("")
      .map((letter, index) => {
        if (letter === " ") return " ";
        if (index < frame) return original[index];
        return glyphs[Math.floor(Math.random() * glyphs.length)];
      })
      .join("");

    frame += 1;
    if (frame > original.length) {
      window.clearInterval(timer);
      scrambleTitle.textContent = original;
    }
  }, 42);
}

function appendTerminalLine(text) {
  if (!terminalOutput) return;
  const line = document.createElement("p");
  line.textContent = `> ${text}`;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function updatePuzzleStatus() {
  if (!puzzleStatus) return;

  puzzleSteps.forEach((step) => {
    const key = step.dataset.step;
    const done =
      (key === "scan" && puzzleScanned) ||
      (key === "freq" && puzzleFrequencyLocked) ||
      (key === "open" && puzzleOpened);
    step.classList.toggle("is-done", done);
  });

  if (puzzleOpened) {
    puzzleStatus.textContent = "route unlocked / B-7 opened before command";
    secretDoor?.classList.add("is-open");
    stationMap?.classList.add("is-unlocked");
    ending?.classList.add("is-visible");
    if (mapStatus) mapStatus.textContent = "MAP DESYNC 88%";
    showToast("B-7 route updated");
    showToast("save corrupted");
    appendTerminalLine("save file rewritten / route memory changed");
    return;
  }

  const scan = puzzleScanned ? "scan ok" : "scan missing";
  const freq = puzzleFrequencyLocked ? "31.6 locked" : "frequency missing";
  puzzleStatus.textContent = `${scan} / ${freq} / door sealed`;
}

frequency?.addEventListener("input", () => {
  const value = Number(frequency.value);
  const formatted = value.toFixed(1).padStart(4, "0");
  frequencyOutput.textContent = `${formatted} Hz`;

  const locked = Math.abs(value - 31.6) <= 0.4;
  hiddenFragment?.classList.toggle("is-visible", locked);
  puzzleFrequencyLocked = locked || puzzleFrequencyLocked;
  frequencyStatus.textContent = locked
    ? "signal locked / hidden fragment recovered"
    : value < 31.6
      ? "signal weak / move higher"
      : "signal drifting / move lower";
  if (locked && !frequencyFearRaised) {
    frequencyFearRaised = true;
    playSound("scanner");
    showToast("frequency locked");
    raiseFear(8);
  }
  updatePuzzleStatus();
});

terminalForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const command = terminalInput.value.trim().toLowerCase();
  if (!command) return;

  appendTerminalLine(command);
  if (command === "scan") {
    puzzleScanned = true;
    showToast("sector scan complete");
  }
  if (command === "open b-7" && puzzleScanned && puzzleFrequencyLocked) {
    puzzleOpened = true;
    appendTerminalLine("B-7 route unlocked / platform wall is now a door");
    playSound("unlock");
  } else if (command === "open b-7" && (!puzzleScanned || !puzzleFrequencyLocked)) {
    appendTerminalLine("access denied / scan sector and lock 31.6 Hz first");
    playSound("glitch");
  } else {
    appendTerminalLine(terminalReplies[command] ?? "unknown command / type help");
    playSound("click");
  }
  raiseFear(7);
  updatePuzzleStatus();
  terminalInput.value = "";
});

secretTitle?.addEventListener("click", () => {
  secretClicks += 1;
  raiseFear(3);
  if (secretClicks < 3) return;

  easter?.classList.add("is-visible");
  playSound("glitch");
  window.setTimeout(() => easter?.classList.remove("is-visible"), 1700);
  secretClicks = 0;
});

inventoryItems.forEach((item) => {
  item.addEventListener("click", () => {
    raiseFear(5);
    playSound("click");
    appendTerminalLine(`предмет осмотрен: ${itemLabels[item.dataset.item] ?? item.dataset.item}`);
  });
});

shots.forEach((shot) => {
  shot.addEventListener("click", () => {
    const image = shot.querySelector("img");
    const caption = shot.querySelector("figcaption");
    if (!image || !lightbox || !lightboxImage || !lightboxCaption) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption?.textContent ?? "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    playSound("click");
    raiseFear(2);
  });
});

function closeLightbox() {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (event.key === "Escape") closeTrailerModal();
  if (event.key === "Escape") closePressModal();
  if (event.key === "Escape") closeWishlistModal();
  if (event.key === "Escape") closeDemoModal();
});

function openTrailerModal() {
  trailerModal?.classList.add("is-open");
  trailerModal?.setAttribute("aria-hidden", "false");
  if (!trailerVideo) return;
  lockSiteAudioForTrailer(trailerVideo);
  trailerVideo.currentTime = 0;
  trailerVideo.play().catch(() => {});
}

function closeTrailerModal() {
  trailerModal?.classList.remove("is-open");
  trailerModal?.setAttribute("aria-hidden", "true");
  trailerVideo?.pause();
  if (trailerVideo) trailerVideo.currentTime = 0;
  unlockSiteAudioAfterTrailer();
  tape?.classList.remove("is-playing");
  if (tapeState) tapeState.textContent = "tape paused";
}

trailerClose?.addEventListener("click", closeTrailerModal);
trailerModal?.addEventListener("click", (event) => {
  if (event.target === trailerModal) closeTrailerModal();
});

trailerVideo?.addEventListener("ended", unlockSiteAudioAfterTrailer);
trailerVideo?.addEventListener("play", () => {
  lockSiteAudioForTrailer(trailerVideo);
});
trailerVideo?.addEventListener("pause", () => {
  if (trailerVideo.ended) return;
  unlockSiteAudioAfterTrailer();
});

function openPressModal() {
  pressModal?.classList.add("is-open");
  pressModal?.setAttribute("aria-hidden", "false");
  playSound("click");
}

function closePressModal() {
  pressModal?.classList.remove("is-open");
  pressModal?.setAttribute("aria-hidden", "true");
}

pressOpen?.addEventListener("click", openPressModal);
pressClose?.addEventListener("click", closePressModal);
pressModal?.addEventListener("click", (event) => {
  if (event.target === pressModal) closePressModal();
});

function openDemoModal() {
  closeWishlistModal();
  demoModal?.classList.add("is-open");
  demoModal?.setAttribute("aria-hidden", "false");
  playSound("click");
  showToast("demo package found");
  raiseFear(4);
}

function closeDemoModal() {
  demoModal?.classList.remove("is-open");
  demoModal?.setAttribute("aria-hidden", "true");
}

demoOpenButtons.forEach((button) => button.addEventListener("click", openDemoModal));
demoClose?.addEventListener("click", closeDemoModal);
demoConfirm?.addEventListener("click", () => {
  demoConfirm.textContent = "download queued";
  showToast("download queued");
  showToast("checksum locked");
  playSound("unlock");
  raiseFear(7);
});
demoModal?.addEventListener("click", (event) => {
  if (event.target === demoModal) closeDemoModal();
});

function openWishlistModal() {
  wishlistModal?.classList.add("is-open");
  wishlistModal?.setAttribute("aria-hidden", "false");
  playSound("unlock");
  showToast("wishlist confirmed");
  showToast("external route opened");
  raiseFear(6);
}

function closeWishlistModal() {
  wishlistModal?.classList.remove("is-open");
  wishlistModal?.setAttribute("aria-hidden", "true");
}

wishlistOpen?.addEventListener("click", openWishlistModal);
wishlistConfirm?.addEventListener("click", () => {
  showToast("wishlist confirmed");
  playSound("unlock");
});
wishlistClose?.addEventListener("click", closeWishlistModal);
wishlistModal?.addEventListener("click", (event) => {
  if (event.target === wishlistModal) closeWishlistModal();
});

externalRoutes.forEach((route) => {
  route.addEventListener("click", () => {
    showToast("external route opened");
    playSound("click");
    raiseFear(3);
  });
});

langToggle?.addEventListener("click", () => {
  currentLang = currentLang === "ru" ? "en" : "ru";
  localStorage.setItem("noSignalLang", currentLang);
  applyTranslations(currentLang);
  showToast(currentLang === "ru" ? "language: ru" : "language: en");
  playSound("click");
});

archiveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const signal = button.dataset.signal ?? "glitch";
    playSound(signal);
    showToast(signal === "scanner" ? "frequency locked" : "tape corrupted");
    appendTerminalLine(`signal archive played: ${button.querySelector("span")?.textContent ?? signal}`);
    raiseFear(signal === "unlock" ? 10 : 6);
  });
});

if ("IntersectionObserver" in window) {
  const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
      });
      if (window.location.hash) setActiveNav();
    },
    { rootMargin: "-28% 0px -58% 0px", threshold: [0.08, 0.2, 0.4] },
  );

  sections.forEach((section) => observer.observe(section));
}

distressForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  raiseFear(13);
  playSound("glitch");
  if (distressOutput) {
    distressOutput.textContent = "signal received before it was sent / extraction denied";
  }
});

window.setInterval(scramble, 3600);
