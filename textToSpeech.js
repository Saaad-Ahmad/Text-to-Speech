const textArea = document.getElementById("text");
const select = document.querySelector("select");
const button = document.getElementById("listen");
const stopButton = document.getElementById("stopButton");
let speech = new SpeechSynthesisUtterance();
let voices = [];

function loadVoices() {
  voices = window.speechSynthesis.getVoices();
  select.innerHTML = ""; // Clear previous options

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.value = index; // Use index to reference the voice
    option.innerText = `${voice.name} (${voice.lang})`;
    select.appendChild(option);
  });
  if (voices.length > 0) {
    speech.voice = voices[0];
  }
}
window.speechSynthesis.onvoiceschanged = loadVoices; 

button.addEventListener("click", () => {
  speech.text = textArea.value;
  const selectedVoice = voices[select.value]; // Get voice by index
  speech.voice = selectedVoice;
  speech.lang = selectedVoice.lang;
  window.speechSynthesis.speak(speech);
});

stopButton.addEventListener("click", () => {
  window.speechSynthesis.cancel();
});

function saveData() {
  localStorage.setItem("data", textArea.value);
}
function showTask() {
  textArea.value = localStorage.getItem("data");
}
showTask();
textArea.addEventListener("input", saveData);