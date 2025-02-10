let characterInput = document.getElementById("character-length-input");
let checkUpperCase = document.getElementById("include-upper-case");
let checkLowerCase = document.getElementById("include-lower-case");
let checkNumbers = document.getElementById("include-numbers");
let checkSymbols = document.getElementById("include-symbols");
let passwordStrength = document.getElementById("strength-output");
let copiedTextWord = document.querySelector(".copied-text");

let generatePasswordButton = document.querySelector(
  ".generate-password-button"
);

document.getElementById("copy-password").addEventListener("click", function () {
  let generatedPassword = document.querySelector(".password-text").innerHTML;

  if (
    checkNumbers.checked ||
    checkSymbols.checked ||
    checkLowerCase.checked ||
    checkUpperCase.checked
  ) {
    navigator.clipboard
      .writeText(generatedPassword)
      .then(() => {
        console.log("copied to clipboard");
        copiedTextWord.style.visibility = "visible";
      })
      .catch((err) => console.log("something went wrong!", err));
  } else {
    return;
  }
});
characterInput.addEventListener("input", function () {
  document.getElementById("character-length-value").innerHTML =
    characterInput.value;

  const min = this.min;
  const max = this.max;
  const value = this.value;
  const percentage = ((value - min) / (max - min)) * 100;

  // Dynamically update the background gradient
  this.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18161F ${percentage}%)`;
});

function passwordGenerator(passwordLength) {
  console.log(passwordLength, "password length");
  let numbers = "0123456789";
  let lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  let upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let specialCharacters = "!@#$%^&*()_+[]{}|;:,.<>?";

  let password = "";
  let selectedChars = "";
  copiedTextWord.style.visibility = "hidden";
  if (checkUpperCase.checked) {
    selectedChars += upperCaseLetters;
  }

  if (checkLowerCase.checked) {
    selectedChars += lowerCaseLetters;
  }

  if (checkNumbers.checked) {
    selectedChars += numbers;
  }

  if (checkSymbols.checked) {
    selectedChars += specialCharacters;
  }

  console.log(selectedChars, "selected chars");
  for (let i = 0; i < passwordLength; i++) {
    password += selectedChars.charAt(
      Math.floor(Math.random() * selectedChars.length)
    );
  }

  let strengthBars = document.querySelectorAll(".bar");

  if (
    password.length > 7 &&
    checkNumbers.checked &&
    checkSymbols.checked &&
    checkLowerCase.checked &&
    checkUpperCase.checked
  ) {
    passwordStrength.innerHTML = "STRONG";
    strengthBars.forEach((ele, index) => {
      ele.style.background = "transparent";
      ele.style.border = "2px solid white";
      if (index == 0 || index == 1 || index == 2 || index == 3) {
        ele.style.background = "#A4FFAF";
        ele.style.border = "2px solid #A4FFAF";
      }
    });
  } else if (
    password.length > 4 &&
    checkLowerCase.checked &&
    checkUpperCase.checked
  ) {
    passwordStrength.innerHTML = "MEDIUM";
    strengthBars.forEach((ele, index) => {
      ele.style.background = "transparent";
      ele.style.border = "2px solid white";
      if (index == 0 || index == 1 || index == 2) {
        ele.style.background = "#F8CD65";
        ele.style.border = "2px solid #F8CD65";
      }
    });
  } else if (password.length > 4 && checkLowerCase.checked) {
    passwordStrength.innerHTML = "WEAK";
    strengthBars.forEach((ele, index) => {
      ele.style.background = "transparent";
      ele.style.border = "2px solid white";
      if (index == 0 || index == 1) {
        ele.style.background = "#FB7C58";
        ele.style.border = "2px solid #FB7C58";
      }
    });
  } else if (
    !checkSymbols.checked &&
    !checkLowerCase.checked &&
    !checkUpperCase.checked &&
    !checkNumbers.checked
  ) {
    passwordStrength.innerHTML = "";
    strengthBars.forEach((ele) => {
      ele.style.background = "transparent";
      ele.style.border = "2px solid white";
    });
  } else {
    passwordStrength.innerHTML = "TOO WEAK!";
    strengthBars.forEach((ele, index) => {
      ele.style.background = "transparent";
      ele.style.border = "2px solid white";
      if (index == 0) {
        ele.style.background = "#F64A4A";
        ele.style.border = "2px solid #F64A4A";
      }
    });
  }

  return password;
}

generatePasswordButton.addEventListener("click", function () {
  document.querySelector(".password-text").innerHTML = passwordGenerator(
    characterInput.value
  );
});
