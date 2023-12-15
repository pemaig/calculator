import { display } from './elements.js'
import { type Operators } from './types.js'

let previousValue: number = 0
let currentOperation: Operators = '='
let isInsertMode: boolean = true
let isFloat: boolean = false

export function getIsFloat (): boolean {
  return isFloat
}

export function setIsFloat (val: boolean): void {
  isFloat = val
}

export function getInsertMode (): boolean {
  return isInsertMode
}

export function setInsertMode (val: boolean): void {
  isInsertMode = val
}

export function getDisplayedValue (): string {
  return display.innerText
}

export function setDisplayedValue (newVal: number | string): void {
  display.innerText = String(newVal)
}

export function getPreviousValue (): number {
  return previousValue
}

export function setPreviousValue (val: number): void {
  previousValue = val
}

export function getCurrentOperation (): Operators {
  return currentOperation
}

export function setCurrentOperation (newOperation: Operators): void {
  currentOperation = newOperation
}
