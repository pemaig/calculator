/**
 * PROBLEMS:
 * - dot sign
 * - cases with Infinity/NaN: division by 0;
 * - chaining operations: val + oper + val + oper + result
 * - add tests
 */
type Operations = '+' | '-' | '*' | '/' | '='

const numsButtons = Array.from(document.getElementsByClassName('num'))
const operationButtons = Array.from(document.getElementsByClassName('oper'))

const display = document.getElementsByClassName('display')[0] as HTMLElement
const clearBtn = document.getElementsByClassName('clear')[0] as HTMLElement
const resultBtn = document.getElementsByClassName('result')[0] as HTMLElement

let previousValue: number = 0
let currentOperation: Operations = '='
let isInsertMode: boolean = false

function getInsertMode (): boolean {
  return isInsertMode
}

function setInsertMode (val: boolean): void {
  isInsertMode = val
}

function getDisplayedValue (): number {
  return Number(display.innerText)
}

function setDisplayedValue (newVal: number): void {
  display.innerText = String(newVal)
}

function getPreviousValue (): number {
  return previousValue
}

function setPreviousValue (val: number): void {
  previousValue = val
}

function getCurrentOperation (): Operations {
  return currentOperation
}

function setCurrentOperation (newOperation: Operations): void {
  currentOperation = newOperation
}

function clearBtnOnClick (_: Event): void {
  setDisplayedValue(0)
  setPreviousValue(0)
  setCurrentOperation('=')
  setInsertMode(false)
}

function numsButtonsOnClick (e: Event): void {
  const input = Number((e.target as HTMLElement).innerText)
  const displayedValue = getDisplayedValue()
  
  if (getInsertMode()) {
    setDisplayedValue(Number(`${displayedValue}${input}`))
  } else {
    setDisplayedValue(input)
    if (input !== 0) {
      setInsertMode(true)
    }
  }
}

function operationBtnOnClick (e: Event): void {
  const newOperation = (e.target as HTMLElement).innerText
  const result = calculateResult()

  setPreviousValue(result)
  setDisplayedValue(result)
  setCurrentOperation(newOperation as Operations)
  setInsertMode(false)
}

function calculateResult (): number {
  const leftOperand = getPreviousValue()
  const rightOperand = getDisplayedValue()
  const currentOperation = getCurrentOperation()
  let result = leftOperand

  currentOperation === '+' && (result += rightOperand)
  currentOperation === '-' && (result -= rightOperand)
  currentOperation === '*' && (result *= rightOperand)
  currentOperation === '/' && (result /= rightOperand)
  currentOperation === '=' && (result = rightOperand)

  return result
}

function resultBtnOnclick (_: Event): void {
  const result = calculateResult()

  setDisplayedValue(result)
  setCurrentOperation('=')
  setInsertMode(false)
}

numsButtons.forEach((button) => { button.addEventListener('click', numsButtonsOnClick) })
operationButtons.forEach((button) => { button.addEventListener('click', operationBtnOnClick) })
clearBtn.addEventListener('click', clearBtnOnClick)
resultBtn.addEventListener('click', resultBtnOnclick)
