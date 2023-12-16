import { display } from './elements.js'
import { type Operators } from './types.js'

let previousValue: number = 0
let currentOperation: Operators = '='
let isInsertMode: boolean = true

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
