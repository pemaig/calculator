/**
 * PROBLEMS:
 * - dot sign
 * - cases with Infinity/NaN: division by 0;
 * - chaining operations: val + oper + val + oper + result
 */
type Operations = '+' | '-' | '*' | '/'

const numsButtons = Array.from(document.getElementsByClassName('num'))
const operationButtons = Array.from(document.getElementsByClassName('oper'))

const display = document.getElementsByClassName('display')[0] as HTMLElement
const clearBtn = document.getElementsByClassName('clear')[0] as HTMLElement
const resultBtn = document.getElementsByClassName('result')[0] as HTMLElement

let previousValue: number | null = null
let currentOperation: Operations | null = null

function getDisplayedValue (): number {
  return Number(display.innerText)
}

function setDisplayedValue (newVal: number | string): void {
  display.innerText = String(newVal)
}

function getPreviousValue (): number {
  return previousValue ?? 0
}

function setPreviousValue (val: number | null): void {
  previousValue = val
}

function getCurrentOperation (): Operations | null {
  return currentOperation
}

function setCurrentOperation (newOperation: Operations | null): void {
  currentOperation = newOperation
}

function clearBtnOnClick (_: Event): void {
  setDisplayedValue(0)
  setPreviousValue(null)
  setCurrentOperation(null)
}

function numsButtonsOnClick (e: Event): void {
  const input = (e.target as HTMLElement).innerText
  const displayedValue = getDisplayedValue()
  const newDisplayedValue =
    displayedValue === 0 ? input : `${displayedValue}${input}`

  setDisplayedValue(newDisplayedValue)
}

function operationBtnOnClick (e: Event): void {
  const newOperation = (e.target as HTMLElement).innerText
  const result = calculateResult()

  setPreviousValue(result)
  setCurrentOperation(newOperation as Operations)
  setDisplayedValue(0)
}

function calculateResult (): number {
  const previousValue = getPreviousValue()
  const displayedValue = getDisplayedValue()
  const currentOperation = getCurrentOperation()
  let result = previousValue ?? displayedValue

  currentOperation === '+' && (result += displayedValue)
  currentOperation === '-' && (result -= displayedValue)
  currentOperation === '*' && (result *= displayedValue)
  currentOperation === '/' && (result /= displayedValue)

  return result
}

function resultBtnOnclick (_: Event): void {
  const result = calculateResult()

  setPreviousValue(result)
  setCurrentOperation(null)
  setDisplayedValue(result)
}

numsButtons.forEach((button) => { button.addEventListener('click', numsButtonsOnClick) })
operationButtons.forEach((button) => { button.addEventListener('click', operationBtnOnClick) })
clearBtn.addEventListener('click', clearBtnOnClick)
resultBtn.addEventListener('click', resultBtnOnclick)
