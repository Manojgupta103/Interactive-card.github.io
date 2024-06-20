const form = document.querySelector(".form");
const formInput = form.querySelectorAll(".form__input");

const cardNumber = document.querySelector(".card__number");
const cardPerson = document.querySelector(".card__person");
const cardMonth = document.querySelector(".card__date--month");
const cardYear = document.querySelector(".card__date--year");
const cardPin = document.querySelector(".card__pin");

const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#number");
const inputDate = document.querySelectorAll("#date");
const inputPin = document.querySelector("#pin");

const btnSubmit = document.querySelector("#btn-submit");
const formWrapper = document.querySelector(".wrapper");
const completeState = document.querySelector(".complete");

function checkName() {
  // initial value as false because there is no value
  let valid = false;

  const name = inputName.value;
  if (!name) {
    showError(inputName, "Can't be blank.");
    cardPerson.innerHTML = "Eric Choo";
  } else if (!isAlphabet(name)) {
    showError(inputName, "Wrong format");
  } else {
    showSuccess(inputName);
    cardPerson.innerHTML = name;
    valid = true;
  }
  return valid;
}

function checkNumber() {
  let valid = false;

  const number = inputNumber.value;
  if (!number) {
    showError(inputNumber, "Can't be blank.");
    cardNumber.innerHTML = "0000 0000 0000 0000";
  } else if (!isNumber(number)) {
    showError(inputNumber, "Wrong format, numbers only.");
  } else {
    showSuccess(inputNumber);
    cardNumber.innerHTML = formatNumber(number, 16);
    valid = true;
  }
  return valid;
}

function checkDate() {
  let valid = false;
  const [month, year] = inputDate;

  if (month.value > 12 || month.value < 0) {
    showError(month, "Only 12 months in a year");
  } else if (!month.value && !year.value) {
    showError(month, "Can't be blank.");
    showError(year, "Can't be blank.");
    cardMonth.innerHTML = "00";
    cardYear.innerHTML = "00";
  } else if (month.value && !year.value) {
    showError(year, "Can't be blank.");
    cardMonth.innerHTML = formatNumber(month.value, 2);
    cardYear.innerHTML = "00";
  } else if (!month.value && year.value) {
    showError(month, "Can't be blank.");
    cardYear.innerHTML = formatNumber(year.value, 2);
    cardMonth.innerHTML = "00";
  } else if (!isNumber(month.value) && isNumber(year.value)) {
    showSuccess(year);
    showError(month, "Wrong format, numbers only.");
  } else if (isNumber(month.value) && !isNumber(year.value)) {
    showSuccess(month);
    showError(year, "Wrong format, numbers only.");
  } else if (!isNumber(month.value) && !isNumber(year.value)) {
    showError(month, "Wrong format, numbers only.");
    showError(year, "Wrong format, numbers only.");
  } else {
    showSuccess(month);
    showSuccess(year);
    cardMonth.innerHTML = month.value;
    cardYear.innerHTML = year.value;
    cardMonth.innerHTML = formatNumber(month.value, 2);
    cardYear.innerHTML = formatNumber(year.value, 2);
    valid = true;
  }
  return valid;
}

function checkPin() {
  let valid = false;

  const pin = inputPin.value;
  if (!pin) {
    showError(inputPin, "Can't be blank.");
    cardPin.innerHTML = "000";
  } else if (!isNumber(pin)) {
    showError(inputPin, "Wrong format, numbers only.");
  } else {
    showSuccess(inputPin);
    cardPin.innerHTML = formatNumber(pin, 3);
    valid = true;
  }
  return valid;
}

//Show error when input is invalid
function showError(input, message) {
  const invalid = input.closest(".form__item").querySelector(".invalid");
  ////// Doesn't work with classList because of pseudoclass /////
  // input.classList.remove('success')
  // input.classList.add('error')
  input.style.border = "1px solid red";
  invalid.innerHTML = message;
}

// Show/Remain active state when the input is valid
function showSuccess(input) {
  const invalid = input.closest(".form__item").querySelector(".invalid");
  ////// Doesn't work with classList because of pseudoclass //////
  // input.classList.add('success')
  // input.classList.remove('error')
  input.style.background = `linear-gradient(#fff, #fff) padding-box,
    linear-gradient(to right,rgb(100, 72, 254), rgb(96, 5, 148)) border-box`;
  input.style.border = "1px solid transparent";
  invalid.innerHTML = "";
}

// To check name input
function isAlphabet(str) {
  let char = str.split("");

  if (
    char.some(
      (c) =>
        c.charCodeAt() < 65 &&
        c.charCodeAt() != 32 &&
        c.charCodeAt() != 39 &&
        c.charCodeAt() != 47
    )
  ) {
    return false;
  } else if (
    char.some(
      (c) => c.charCodeAt() > 90 && c.charCodeAt() < 97 && c.charCodeAt() > 122
    )
  ) {
    return false;
  }
  return true;
}

//To check cardNumber, date & pin input
function isNumber(str) {
  let char = str.split("");

  if (char.some((c) => c.charCodeAt() < 48 || c.charCodeAt() > 57))
    return false;
  return true;
}

// Number shown in the card
function formatNumber(str, len) {
  str = str + "0".repeat(len - str.length);
  let arr = [];
  for (let i = 0; i <= str.length; i += 4) {
    arr.push(str.slice(i, i + 4));
  }
  return arr.join(" ");
}

form.addEventListener("input", (e) => {
  switch (e.target.id) {
    case "name":
      checkName();
      break;
    case "number":
      checkNumber();
      break;
    case "date":
      checkDate();
      break;
    case "pin":
      checkPin();
      break;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let validName = checkName(),
    validNumber = checkNumber(),
    validDate = checkDate(),
    validPin = checkPin();

  if (validName && validNumber && validDate && validPin) {
    formWrapper.classList.add("hidden");
    completeState.classList.remove("hidden");
    btnSubmit.innerHTML = "Continue";
  }
});
