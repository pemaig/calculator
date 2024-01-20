import { clearBtn, display, numsButtons, operationButtons, resultBtn } from './elements.js'
import { Calculator } from './calculator.js'

/**
 * PROBLEMS:
 * + chaining operations: val + operation + val + operation + result
 * + error handling
 * + dot sign
 * - make OOP with design patterns in mind
 * - rename project to serious_calculator
 * - add tests
 * - cases with Infinity/NaN: division by 0;
 * - could be too many symbols, need to set boundary
 * - add vite
 * - refactor styles with css grid
 * - add keyboard support
 */
//
// function clearBtnOnClick (_: Event): void {
//     Calculator.setDisplayedValue(0)
//     Calculator.setPreviousValue(0)
//     Calculator.setCurrentOperation('=')
//     Calculator.setInsertMode(false)
// }
//
// function numsButtonsOnClick (e: Event): void {
//     const input = (e.target as HTMLElement).innerText
//     const displayedValue = Calculator.getDisplayedValue()
//     const isInsertMode = Calculator.getInsertMode()
//     const isAlreadyWithDot = displayedValue.includes('.')
//     const isDotInput = input === '.'
//     let newDisplayedValue: string | number = input
//    
//     function numsInputStrategy (): void {
//         if (isInsertMode) {
//             // use Number to avoid leading zero
//             newDisplayedValue = Number(`${displayedValue}${input}`)
//         }
//     }
//    
//     function dotInputStrategy (): void {
//         if (isInsertMode && isAlreadyWithDot) { return }
//        
//         if (isInsertMode) {
//             newDisplayedValue = `${displayedValue}${input}`
//         } else {
//             newDisplayedValue = `0${input}`
//         }
//     }
//    
//     if (isDotInput) {
//         dotInputStrategy()
//     } else {
//         numsInputStrategy()
//     }
//    
//     if (!isInsertMode) {
//         Calculator.setInsertMode(true)
//     }
//    
//     Calculator.setDisplayedValue(newDisplayedValue)
// }
//
// function isUnaryOperator (operator: string): boolean {
//     return (
//         operator === '+/-' ||
//         operator === '%'
//     )
// }
//
// function operationBtnOnClick (e: Event): void {
//     const newOperation = (e.target as HTMLElement).innerText as Operators
//     let result: number
//  
//     if (isUnaryOperator(newOperation)) {
//         Calculator.setCurrentOperation(newOperation)
//         result = calculateResult()
//         Calculator.setCurrentOperation('=')
//     } else {
//         result = calculateResult()
//         Calculator.setCurrentOperation(newOperation)
//     }
//  
//     Calculator.setPreviousValue(result)
//     Calculator.setDisplayedValue(result)
//     Calculator.setInsertMode(false)
// }
//
// function calculateResult (): number {
//     const leftOperand = Calculator.getPreviousValue()
//     const rightOperand = Number(Calculator.getDisplayedValue())
//     const currentOperation = Calculator.getCurrentOperation()
//     let result = leftOperand
//  
//     switch (currentOperation) {
//         case '+/-':
//             result = 0 - rightOperand
//             break
//         case '%':
//             result = rightOperand / 100
//             break
//         case '+':
//             result += rightOperand
//             break
//         case '-':
//             result -= rightOperand
//             break
//         case '*':
//             result *= rightOperand
//             break
//         case '/':
//             result /= rightOperand
//             break
//         case '=':
//         default:
//             result = rightOperand
//     }
//  
//     return result
// }
//
// function resultBtnOnClick (_: Event): void {
//     const result = calculateResult()
//
//     Calculator.setDisplayedValue(result)
//     Calculator.setCurrentOperation('=')
//     Calculator.setInsertMode(false)
// }
//
// function errorHandler (error: ErrorEvent): void {
//     console.error(error)
// }
//
// Elements.numsButtons.forEach((button) => { button.addEventListener('click', numsButtonsOnClick) })
// Elements.operationButtons.forEach((button) => { button.addEventListener('click', operationBtnOnClick) })
// Elements.clearBtn.addEventListener('click', clearBtnOnClick)
// Elements.resultBtn.addEventListener('click', resultBtnOnClick)
// window.addEventListener('error', errorHandler)

const calculator = Calculator.getInstance(display)

numsButtons.forEach(btn => {
    btn.addEventListener('click', () => { calculator.insertNumber((btn as HTMLElement).innerText) })
})
clearBtn.addEventListener('click', () => { calculator.clear() })
operationButtons.forEach(btn => {
    btn.addEventListener('click', () => { calculator.setOperation((btn as HTMLElement).innerText) })
})
resultBtn.addEventListener('click', () => { calculator.compute() })
