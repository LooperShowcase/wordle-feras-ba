const namber_of_words = 6;
const namber_of_chars = 5;
let words = document.getElementById("container");
for (let i = 0; i < namber_of_words; i++) {
  let singleword = document.createElement("div");
  singleword.className = "word";
  for (let j = 0; j < namber_of_chars; j++) {
    let singlechar = document.createElement("div");
    singlechar.className = "char";
    singleword.appendChild(singlechar);
  }
  words.appendChild(singleword);
}
let curentWord = 0;
let currentChar = 0;
document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    if (currentChar > 0) {
      let wordDiv = words.children[curentWord];
      let charToDelete = wordDiv.children[currentChar - 1];
      charToDelete.innerHTML = "";
      currentChar--;
    }
  } else if (event.key === "Enter") {
    if (currentChar === 5) {
      let wordDiv = words.children[curentWord];
      animateCSS(wordDiv, "rollOut");
      curentWord++;
      currentChar = 0;
    }
  } else if (currentChar < 5 && isLetter(event.key)) {
    let wordDiv = words.children[curentWord];
    let cherDiv = wordDiv.children[currentChar];
    cherDiv.innerHTML = event.key.toUpperCase();
    currentChar++;
  }
});

const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }
    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

function isLetter(str) {
  return str.length == 1 && str.match(/[a-z/]/i);
}
