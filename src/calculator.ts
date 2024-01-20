import { type Operators } from './types.js'

export class Calculator {
    private static _instance: Calculator
    
    private readonly _display: HTMLElement
    private _currentValue!: number | string
    private _previousValue!: number | string
    private _currentOperation!: Operators
    
    static getInstance (displayElement: HTMLElement): Calculator {
        if (Calculator._instance === undefined) {
            Calculator._instance = new Calculator(displayElement)
        }
        
        return Calculator._instance
    }
    
    private constructor (displayElement: HTMLElement) {
        this._display = displayElement
        this.clear()
    }
    
    private updateDisplay (showDefaultValue: boolean = false): void {
        if (showDefaultValue) {
            this._display.innerText = '0'
            return
        }
        this._display.innerText = this._currentValue.toString()
    }
    
    clear (): void {
        this._currentValue = ''
        this._previousValue = ''
        this._currentOperation = '='
        this.updateDisplay(true)
    }
    
    insertNumber (value: string): void {
        const isPeriod = value === '.'
        const isCurrentValEmpty = this._currentValue.toString() === ''
        const isCurrentValWithPeriod = this._currentValue.toString().includes('.')
        let newValue = this._currentValue.toString() + value.toString()
        
        if (isPeriod && isCurrentValWithPeriod) {
            return
        }
        if (isPeriod && isCurrentValEmpty) {
            newValue = '0.'
        }
        
        this._currentValue = newValue
        this.updateDisplay()
    }
    
    setOperation (operation: string): void {
        const isUnary = operation === '+/-' || operation === '%'
        
        if (isUnary) {
            this._currentOperation = operation as Operators
            this.compute(true)
        } else {
            this.compute()
            this._currentOperation = operation as Operators
        }
        this._previousValue = this._currentValue
        this._currentValue = ''
    }
    
    compute (isUnary: boolean = false): void {
        let result = parseFloat(this._previousValue.toString())
        const rightOperand = parseFloat(this._currentValue.toString())
        
        if (
            !isUnary &&
            (isNaN(result) || isNaN(rightOperand))
        ) {
            return
        }
        
        switch (this._currentOperation) {
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
        
        this._currentValue = result
        this.updateDisplay()
    }
}
