import { useEffect, useState } from 'react';
import './App.css';
import { Switch } from '@mui/material';
// import { Switch } from '@mui/material';

class Calculator {

  somar(num1: number, num2: number): number {
    return num1 + num2;
  }

  subtrair(num1: number, num2: number): number {
    return num1 - num2;
  }

  dividir(num1: number, num2: number): number {
    if (num2 === 0) throw new Error('Não é possível dividir por zero');
    return num1 / num2;
  }

  multiplicar(num1: number, num2: number): number {
    return num1 * num2;
  }
}

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [valor, setValor] = useState("");
  const [prev, setPrev] = useState("0");
  const [operador, setOperador] = useState('');

  const handleChangeDarkMode = (event: any) => {
    setDarkMode(event.target.checked)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }, [darkMode]);

  const digitarNumero = (numero: string): void => {
    if (prev == '' && operador == '' && numero != ".") {
      setValor(numero)
    } else {
      setValor(valor + numero)
    }
  }

  const digitarOperador = (op: string) => {
    if (valor) {
      setOperador(op)
      setPrev(valor)
      setValor("");
    }
  }

  // const formatarNumero = (num: string) => {
  //   const numero = parseFloat(num.replace(",", "."));
  //   return new Intl.NumberFormat("pt-BR", {
  //     style: 'decimal',
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 6
  //   }).format(numero);
  // };

  const calcular = () => {


    if (!valor || !prev || operador == "") {
      return
    }

    const calculator = new Calculator();
    const operadorMap: Record<string, (num1: number, num2: number) => number> = {
      '+': calculator.somar,
      "-": calculator.subtrair,
      "×": calculator.multiplicar,
      "÷": calculator.dividir
    }

    try {
      const func = operadorMap[operador];
      const result = func(parseFloat(prev), parseFloat(valor))
      const resultCalc = result.toString()
      setValor(resultCalc);
      setOperador("")
      setPrev("");
    } catch (error: any) {
      setValor(error.message ?? "Invalid Args");
    }
  }

  const clear = () => {
    setValor("");
    setPrev("0");
    setOperador("");
  }

  return (
    <>
      {/* <button id="toggle-theme" onClick={() =>{
        const body = document.body;
        body.classList.toggle('dark-theme');
      }}>Alternar Tema</button> */}

      <div>
        <label>Dark Mode</label>
        <Switch
          id='theme-switch'
          checked={darkMode}
          onChange={(ev) => handleChangeDarkMode(ev)}
          name='theme-switch'
        />
      </div>

      <div className="container">

        <div className="display">
          <div className='history'>
            {operador && <div>{prev} {operador}</div>}
          </div>
          <div className="value">{valor || prev}</div>
        </div>

        <div className="grid">
          <button className="clear" onClick={() => clear()}>C</button>
          <button className="operator" onClick={() => digitarOperador('÷')}>÷</button>
          <button onClick={() => digitarNumero('7')}>7</button>
          <button onClick={() => digitarNumero('8')}>8</button>
          <button onClick={() => digitarNumero('9')}>9</button>
          <button className="operator" onClick={() => digitarOperador('×')}>×</button>

          <button onClick={() => digitarNumero('4')}>4</button>
          <button onClick={() => digitarNumero('5')}>5</button>
          <button onClick={() => digitarNumero('6')}>6</button>
          <button className="operator" onClick={() => digitarOperador('-')}>-</button>

          <button onClick={() => digitarNumero('1')}>1</button>
          <button onClick={() => digitarNumero('2')}>2</button>
          <button onClick={() => digitarNumero('3')}>3</button>
          <button className="operator" onClick={() => digitarOperador('+')}>+</button>

          <button className='grid-columnn-2' onClick={() => digitarNumero('0')}>0</button>
          <button onClick={() => digitarNumero('.')}>.</button>
          <button className="operator" onClick={() => calcular()}>=</button>
        </div>
      </div>
    </>
  )
}

export default App
