import * as Calculator from './calculator.js'
import * as Elements from './elements.js'
import { type Operators } from './types.js'

/**
 * PROBLEMS:
 * + chaining operations: val + operation + val + operation + result
 * + error handling
 * + dot sign
 * - rename project to serious_calculator
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
  Calculator.setIsFloat(false)
}

function numsButtonsOnClick (e: Event): void {
  const input = (e.target as HTMLElement).innerText
  const displayedValue = Calculator.getDisplayedValue()
  const isInsertMode = Calculator.getInsertMode()
  const isFloat = Calculator.getIsFloat()
  const isOnlyZero = displayedValue === '0'
  const isDotInput = input === '.'
  
  if (isInsertMode) {
    if (isOnlyZero) {
      if (isDotInput) {
        Calculator.setDisplayedValue(`${displayedValue}${input}`)
        Calculator.setIsFloat(true)
      } else {
        Calculator.setDisplayedValue(input)
      }
    } else {
      if (isDotInput && isFloat) {
        return
      } else {
        Calculator.setDisplayedValue(`${displayedValue}${input}`)
      }
    }
  } else {
    if (isDotInput) {
      Calculator.setDisplayedValue(`0${input}`)
      Calculator.setIsFloat(true)
    } else {
      Calculator.setDisplayedValue(input)
    }
    
    Calculator.setInsertMode(true)
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
  Calculator.setIsFloat(false)
}

function calculateResult (): number {
  const leftOperand = Calculator.getPreviousValue()
  const rightOperand = Number(Calculator.getDisplayedValue())
  const currentOperation = Calculator.getCurrentOperation()
  let result = leftOperand
  
  switch (currentOperation) {
    case '+/-':
      result = 0 - rightOperand
      break
    case '%':
      result = rightOperand / 100
      break
    case '+':
      result += rightOperand
      break
    case '-':
      result -= rightOperand
      break
    case '*':
      result *= rightOperand
      break
    case '/':
      result /= rightOperand
      break
    case '=':
    default:
      result = rightOperand
  }
  
  return result
}

function resultBtnOnClick (_: Event): void {
  const result = calculateResult()

  Calculator.setDisplayedValue(result)
  Calculator.setCurrentOperation('=')
  Calculator.setInsertMode(false)
  Calculator.setIsFloat(false)
}

function errorHandler (error: ErrorEvent): void {
  console.error(error)
}

Elements.numsButtons.forEach((button) => { button.addEventListener('click', numsButtonsOnClick) })
Elements.operationButtons.forEach((button) => { button.addEventListener('click', operationBtnOnClick) })
Elements.clearBtn.addEventListener('click', clearBtnOnClick)
Elements.resultBtn.addEventListener('click', resultBtnOnClick)
window.addEventListener('error', errorHandler)
