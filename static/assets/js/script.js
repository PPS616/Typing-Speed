let paragraphs = [
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.",

    "All this happened, more or less. The war parts, anyway, are pretty much true. One guy I knew really was shot in Dresden for taking a teapot that wasn't his. Another guy I knew really did threaten to have his personal enemies killed by hired gunmen after the war. And so on. I've changed all their names.",

    "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. He was laying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his dome-like brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes.",

    "In the city of Florence during the time of the Renaissance, there was an atmosphere of creativity and a fervent exchange of ideas. Artists, philosophers, and inventors congregated in the vibrant Italian city, engaging in passionate discussions and producing works of art that would influence generations to come. Amongst them was a young artist whose ambition and talent were unmatched, leading him to create some of the most renowned paintings of his time. He was also a skilled engineer, dreaming up inventions centuries ahead of their time. This was a period where the boundaries of art and science were blurred, giving rise to an unprecedented era of discovery and innovation that would later be referred to as the cradle of modern civilization. The city's cobblestone streets and grand piazzas were witnesses to the birth of masterpieces that would come to define the very essence of human achievement. As the sun set over the Arno River, casting a golden hue over the city, the young artist set down his brush, contemplating his next creation, a testament to the unyielding spirit of human curiosity and the relentless pursuit of perfection."
];


function getRandomElementFromArray(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

let randomParagraph = getRandomElementFromArray(paragraphs);
document.getElementById('sample-text').innerHTML = randomParagraph

let startTime;
let interval;
let running = false;
const sampleText = randomParagraph
const testArea = document.getElementById('test-area');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset');


function updateComparison() {
  const typedText = testArea.value;
  let comparisonHtml = '';
  sampleText.split('').forEach((char, index) => {
    let typedChar = typedText[index];
    if (typedChar == null) {
      comparisonHtml += char;
    } else if (typedChar === char) {
      comparisonHtml += `<span class="correct">${char}</span>`;
    } else {
      comparisonHtml += `<span class="incorrect">${char}</span>`;
    }
  });
  document.getElementById('sample-text').innerHTML = comparisonHtml;
}

function startTest() {
  const typedText = testArea.value;

  if (!running && typedText.length === 1) {
    running = true;
    startTime = new Date().getTime();
    interval = setInterval(updateTimer, 1000);
  }
  if (typedText === sampleText) {
    finishTest();
  }

  updateComparison();
}

function updateTimer() {
  if (running) {
    const currentTime = new Date().getTime();
    const timeElapsed = (currentTime - startTime) / 1000;
    const timeDisplay = new Date(timeElapsed * 1000).toISOString().substr(11, 8);
    timerDisplay.textContent = timeDisplay;

    // Calculate words per minute
    const typedText = testArea.value.trim();
    const wordCount = typedText.split(/\s+/).length;
    const minutes = timeElapsed / 60;
    const wpm = Math.round(wordCount / minutes);
    document.getElementById('wpm').textContent = `Words per minute: ${wpm}`;
  }
}

function finishTest() {
  clearInterval(interval); // Stop the timer
  running = false;
  // Provide some visual feedback that the test is complete, e.g., change the color of the timer
  timerDisplay.style.color = 'green';
}

function resetTest() {
  clearInterval(interval);
  running = false;
  testArea.value = '';
  testArea.style.borderColor = 'initial';
  timerDisplay.textContent = '00:00:00';
  timerDisplay.style.color = 'black';
  document.getElementById('wpm').textContent = '';
  document.getElementById('sample-text').textContent = sampleText;
  if (interval) {
    clearInterval(interval);
  }
}

testArea.addEventListener('input', startTest);
resetButton.addEventListener('click', resetTest);
