// const micButton = document.getElementById('micButton');

// function getEnglishVoices() {
//   return voices.filter(voice =>
//     voice.lang.startsWith("en")
//   );
// }

// micButton.addEventListener("click", (e) =>{
//   e.preventDefault()
//   micButton.src =micButton.getAttribute('src')  === "../ASSETS/micOff.svg"? "../ASSETS/Mic.svg" :"../ASSETS/micOff.svg"
//   getEnglishVoices()
// })
// this works too let isMicOn = false;

// micButton.addEventListener("click", (e) => {
//   e.preventDefault();

//   isMicOn = !isMicOn;
//   micButton.src = isMicOn
//     ? "../ASSETS/Mic.svg"
//     : "../ASSETS/micOff.svg";
// });


const textInput = document.getElementById("textInput");
const micBtn = document.getElementById("micBtn");
const micIcon = document.getElementById("micIcon");
const stopBtn = document.getElementById("stopBtn");

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options");

let voices = [];
let selectedVoice = null;
let isSpeaking = false;

// -------------------
// LOAD VOICES
// -------------------
function loadVoices() {
  voices = speechSynthesis.getVoices();

  const englishVoices = voices.filter(v => v.lang.startsWith("en"));

  optionsContainer.innerHTML = "";

  englishVoices.forEach(voice => {
    const option = document.createElement("div");
    option.className = "option";
    option.dataset.voice = voice.name;

    // Flag logic
    let flag = "🌍";
    if (voice.lang.includes("US")) flag = "🇺🇸";
    if (voice.lang.includes("GB")) flag = "🇬🇧";
    if (voice.lang.includes("NG")) flag = "🇳🇬";
    if (voice.lang.includes("AU")) flag = "🇦🇺";
    if (voice.lang.includes("IN")) flag = "🇮🇳";

    option.innerHTML = `${flag} ${voice.name}`;
    optionsContainer.appendChild(option);
  });

  // Default voice
  selectedVoice = englishVoices[0];
  selected.textContent = `${englishVoices[0].name}`;
}

speechSynthesis.onvoiceschanged = loadVoices;

// -------------------
// DROPDOWN LOGIC
// -------------------
selected.addEventListener("click", (e) => {
  e.stopPropagation();
  optionsContainer.classList.toggle("show");
});

optionsContainer.addEventListener("click", (e) => {
  const option = e.target.closest(".option");
  if (!option) return;

  selected.textContent = option.textContent;
  selectedVoice = voices.find(v => v.name === option.dataset.voice);

  optionsContainer.classList.remove("show");
});



document.addEventListener("click", () => {
  optionsContainer.classList.remove("show");
});

// -------------------
// SPEAK / PAUSE
// -------------------
micBtn.addEventListener("click", () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    micIcon.src = "../ASSETS/micOff.svg";
    return;
  }

  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    micIcon.src = "../ASSETS/micOn.svg";
    return;
  }

  const text = textInput.value.trim();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;

  utterance.onstart = () => {
    micIcon.src = "../ASSETS/micOn.svg";
  };

  utterance.onend = () => {
    micIcon.src = "../ASSETS/micOff.svg";
  };

  speechSynthesis.speak(utterance);
});

// -------------------
// STOP BUTTON
// -------------------
stopBtn.addEventListener("click", () => {
  speechSynthesis.cancel();
  micIcon.src = "../ASSETS/micOff.svg";
});

speechSynthesis.getVoices().forEach(v =>
  console.log(v.name, v.lang)
);




