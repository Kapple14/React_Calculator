import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import './Calculator.css';

class Calculator extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {currentDisplay: '', 
                  currentValue: '',
                  commaActive: false, 
                  Ans: 0, 
                  priorNumber: '',
                  inputValue: 0, 
                  operation: '',
                  calculated: true,
                  resetButton:'AC',
                  calculationNumbers:[...Array(10).keys()].reverse()
                };
    
    this.enter = this.enter.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.setOperation = this.setOperation.bind(this);

    this.commaClicked = this.commaClicked.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.changeSign = this.changeSign.bind(this);

    this.add = this.add.bind(this);
    this.substract = this.substract.bind(this);
    this.multiply = this.multiply.bind(this);
    this.divide = this.divide.bind(this);
    this.modulo = this. modulo.bind(this);

    this.operations = [
                        {placeholder:'/', operation: this.divide, visualized: true}, 
                        {placeholder:'x', operation: this.multiply, visualized: true}, 
                        {placeholder:'-', operation: this.substract, visualized: true}, 
                        {placeholder:'+', operation: this.add, visualized: true},
                        {placeholder:'%', operation: this.modulo, visualized: false}
                      ];
   
  }

  inputChange(e)
  {
  
      this.setState({currentDisplay:this.state.currentValue + e.target.value, currentValue: this.state.currentValue + e.target.value})

  }

  commaClicked()
  {
    if(this.state.commaActive===false && this.state.currentValue==='')
    {
      this.setState({currentDisplay:this.state.currentValue+'0.', currentValue: this.state.currentValue+'0.', commaActive: true});
    }

    else if(this.state.commaActive===false)
    {
      this.setState({currentDisplay:this.state.currentValue+'.', currentValue: this.state.currentValue+'.', commaActive: true});
    }

  }

  resetInput()
  {
    if (this.state.resetButton === 'C')
    {
      this.setState({currentDisplay: this.state.priorNumber, currentValue: this.state.priorNumber, priorNumber:'', resetButton: 'AC', commaActive:false});
    }

    else
    {
      this.setState({currentDisplay: '', currentValue: '', commaLevel:1, resetButton: 'AC', operation:'', commaActive:false});
    }
  }

  changeSign()
  {
    this.setState({currentDisplay: Number(this.state.currentDisplay)*(-1), currentValue: Number(this.state.currentValue)*(-1)});
  }

  enter()
  {
    if(this.state.operation !='')
    {
      this.state.operation(Number(this.state.priorNumber), Number(this.state.currentValue));
    }
    else
    {}
  }

  setOperation(e)
  {
    this.setState({currentDisplay: this.state.calculated ? this.state.currentValue: this.state.priorNumber, currentValue: '', priorNumber: this.state.calculated ? this.state.currentDisplay: this.state.priorNumber, operation: this.operations.find(operation => operation.placeholder === e.target.value).operation, calculated: false, commaActive:false, resetButton: 'C'});
  }

  add(a, b)
  {
    let output = a + b;
    output = output.toString();
    this.setState({currentDisplay: output, currentValue: output, priorNumber: '', Ans: output, operation: '', calculated: ~this.state.calculated, resetButton: 'AC'});
  }

  substract(a, b)
  {
    let output = a - b;
    output = output.toString();
    this.setState({currentDisplay: output, currentValue: output, priorNumber: '', Ans: output, operation: '', calculated: ~this.state.calculated, resetButton: 'AC'});
  }

  multiply(a, b)
  {
    let output = a * b;
    this.setState({currentDisplay: output, currentValue: output, priorNumber: '', Ans: output, operation: '', calculated: ~this.state.calculated, resetButton: 'AC'});
  }

  divide(a, b)
  {
    let output = a / b;
    output = output.toString();
    this.setState({currentDisplay: output, currentValue: output, priorNumber: '', Ans: output, operation: '', calculated: ~this.state.calculated, resetButton: 'AC'});
  }

  modulo(a, b)
  {
    let output = a % b;
    output = output.toString();
    this.setState({currentDisplay: output, currentValue: output, priorNumber: '', Ans: output, operation: '', calculated: ~this.state.calculated, resetButton: 'AC'});
  }

  render()
  {
    return(
        <div className='CalculatorApp'>
          <div className='display'>{(Number(this.state.currentDisplay)<100000000)? Number(this.state.currentDisplay).toLocaleString('de-DE',{maximumSignificantDigits:10}): Number(this.state.currentDisplay).toExponential(5)}</div>
          <div className='calculatorToolBox'>
            <div className='calculatorAdditionalKeys'>
              <button onClick={this.resetInput}>{this.state.resetButton}</button>
              <button onClick={this.changeSign}>+/-</button>
              <button value={'%'} onClick={this.setOperation}>%</button>
            </div>
            <div className='calculatorNumbers'>
              {this.state.calculationNumbers.map(numberButton => (<button value={numberButton.toString()} onClick={this.inputChange} key={'ButtonOfValue'+numberButton} id={'ButtonOfValue'+numberButton}>{numberButton}</button>))}
              <button onClick={this.commaClicked} id='ButtonOfValueComma' value={','} className={this.state.commaState}>,</button>
            </div>
            <div className='calculatorTools'>
              {this.operations.map(operation => (operation.visualized ? <button value={operation.placeholder} onClick={this.setOperation} key={operation.placeholder}>{operation.placeholder}</button> : <></>))}
              <button onClick={this.enter}>=</button>
            </div>
          </div>
        </div>
    );
  }

}

export default Calculator;