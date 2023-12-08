import * as Calculator from './calculator.js'
import * as Elements from './elements.js'
import { type Operators } from './types.js'

/**
 * PROBLEMS:
 * + chaining operations: val + operation + val + operation + result
 * + error handling
 * - rename project to serious_calculator
 * - dot sign
 * - add tests
 * - cases with Infinity/NaN: division by 0;
 * - could be too many symbols, need to set boundary
 * - make OOP with design patterns in mind
 * - add vite
 * - refactor styles with css grid
 * - add keyboard support
 */

function clearBtnOnClick (_: Event): void {
  Calculator.setDisplayedValue(0)
  Calculator.setPreviousValue(0)
  Calculator.setCurrentOperation('=')
  Calculator.setInsertMode(false)
}

function numsButtonsOnClick (e: Event): void {
  const input = Number((e.target as HTMLElement).innerText)
  const displayedValue = Calculator.getDisplayedValue()
  
  if (Calculator.getInsertMode()) {
    Calculator.setDisplayedValue(Number(`${displayedValue}${input}`))
  } else {
    Calculator.setDisplayedValue(input)
    if (input !== 0) {
      Calculator.setInsertMode(true)
    }
  }
}

function isUnaryOperator (operator: string): boolean {
  return (
    operator === '+/-' ||
      operator === '%'
  )
}

function operationBtnOnClick (e: Event): void {
  const newOperation = (e.target as HTMLElement).innerText as Operators
  let result: number
  
  if (isUnaryOperator(newOperation)) {
    Calculator.setCurrentOperation(newOperation)
    result = calculateResult()
    Calculator.setCurrentOperation('=')
  } else {
    result = calculateResult()
    Calculator.setCurrentOperation(newOperation)
  }
  
  Calculator.setPreviousValue(result)
  Calculator.setDisplayedValue(result)
  Calculator.setInsertMode(false)
}

function calculateResult (): number {
  const leftOperand = Calculator.getPreviousValue()
  const rightOperand = Calculator.getDisplayedValue()
  const currentOperation = Calculator.getCurrentOperation()
  let result = leftOperand
  
  currentOperation === '+' && (result += rightOperand)
  currentOperation === '-' && (result -= rightOperand)
  currentOperation === '*' && (result *= rightOperand)
  currentOperation === '/' && (result /= rightOperand)
  currentOperation === '=' && (result = rightOperand)
  currentOperation === '+/-' && (result = -rightOperand)
  currentOperation === '%' && (result = rightOperand / 100)
  
  return result
}

function resultBtnOnclick (_: Event): void {
  const result = calculateResult()

  Calculator.setDisplayedValue(result)
  Calculator.setCurrentOperation('=')
  Calculator.setInsertMode(false)
}

function ErrorHandler (error: ErrorEvent): void {
  console.error(error)
}

Elements.numsButtons.forEach((button) => { button.addEventListener('click', numsButtonsOnClick) })
Elements.operationButtons.forEach((button) => { button.addEventListener('click', operationBtnOnClick) })
Elements.clearBtn.addEventListener('click', clearBtnOnClick)
Elements.resultBtn.addEventListener('click', resultBtnOnclick)
window.addEventListener('error', ErrorHandler)
