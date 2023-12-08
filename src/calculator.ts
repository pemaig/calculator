import { display } from './elements.js'
import { type Operators } from './types.js'

export let previousValue: number = 0
export let currentOperation: Operators = '='
export let isInsertMode: boolean = false

export function getInsertMode (): boolean {
  return isInsertMode
}

export function setInsertMode (val: boolean): void {
  isInsertMode = val
}

export function getDisplayedValue (): number {
  return Number(display.innerText)
}

export function setDisplayedValue (newVal: number): void {
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
