/**
 * PROBLEMS:
 * - dot sign
 * - cases with Infinity/NaN: division by 0;
 * - chaining operations: val + oper + val + oper + result
 */

const numsButtons = Array.from(document.getElementsByClassName("num"));
const opersButtons = Array.from(document.getElementsByClassName("oper"));

const display = document.getElementsByClassName("display")[0];
const clearBtn = document.getElementsByClassName("clear")[0];
const resultBtn = document.getElementsByClassName("result")[0];

const sumBtn = document.getElementsByClassName("sum")[0];
const subBtn = document.getElementsByClassName("sub")[0];
const mulBtn = document.getElementsByClassName("mul")[0];
const divBtn = document.getElementsByClassName("div")[0];

let previousValue = null;
let currentOperation = null;
let withDot = false;

function getDisplayedValue() {
  return Number(display.innerText);
}

function setDisplayedValue(newVal) {
  if (newVal === null) return;

  display.innerText = String(newVal);
}

function getPreviousValue() {
  return previousValue ?? 0;
}

function setPreviousValue(val) {
  previousValue = val;
}

function getCurrentOperation() {
  return currentOperation;
}

function setCurrentOperation(newOperation) {
  currentOperation = newOperation;
}

function clearBtnOnClick(e) {
  setDisplayedValue(0);
  setPreviousValue(null);
  setCurrentOperation(null);
}

function numsButtonsOnClick(e) {
  const input = e.target.innerText;
  const displayedValue = getDisplayedValue();
  const newDisplayedValue =
    displayedValue === 0 ? input : `${displayedValue}${input}`;

  setDisplayedValue(newDisplayedValue);
}

function operationBtnOnClick(e) {
  const newOperation = e.target.innerText;
  const result = calculateResult();

  setPreviousValue(result);
  setCurrentOperation(newOperation);
  setDisplayedValue(0);
}

function calculateResult() {
  const previousValue = getPreviousValue();
  const displayedValue = getDisplayedValue();
  const currentOperation = getCurrentOperation();
  let result = previousValue || displayedValue;

  currentOperation === "+" && (result += displayedValue);
  currentOperation === "-" && (result -= displayedValue);
  currentOperation === "*" && (result *= displayedValue);
  currentOperation === "/" && (result /= displayedValue);

  return result;
}

function resultBtnOnclick(e) {
  let result = calculateResult();

  setPreviousValue(result);
  setCurrentOperation(null);
  setDisplayedValue(result);
}

numsButtons.forEach((button) =>
  button.addEventListener("click", numsButtonsOnClick),
);
opersButtons.forEach((button) =>
  button.addEventListener("click", operationBtnOnClick),
);
clearBtn.addEventListener("click", clearBtnOnClick);
resultBtn.addEventListener("click", resultBtnOnclick);
