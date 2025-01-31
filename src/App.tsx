import { useState } from 'react';
import './App.css';

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
  const [valor, setValor] = useState("");
  const [prev, setPrev] = useState("");
  const [operador, setOperador] = useState('');

  const digitarNumero = (numero: string): void => {
    setValor(valor + numero)
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
      "+": calculator.somar,
      "-": calculator.subtrair,
      "*": calculator.multiplicar,
      "/": calculator.dividir
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

  return (
    <>
      <div className="container">

        <div className="display">
          <div className='history'>
            {operador && <div>{prev} {operador}</div>}
          </div>
          <div className="value">{valor || prev}</div>
        </div>

        <div className="grid">
          <button onClick={() => digitarNumero('7')}>7</button>
          <button onClick={() => digitarNumero('8')}>8</button>
          <button onClick={() => digitarNumero('9')}>9</button>
          <button onClick={() => digitarOperador('/')}>÷</button>
          <button onClick={() => digitarNumero('4')}>4</button>
          <button onClick={() => digitarNumero('5')}>5</button>
          <button onClick={() => digitarNumero('6')}>6</button>
          <button onClick={() => digitarOperador('*')}>×</button>
          <button onClick={() => digitarNumero('1')}>1</button>
          <button onClick={() => digitarNumero('2')}>2</button>
          <button onClick={() => digitarNumero('3')}>3</button>
          <button onClick={() => digitarOperador('-')}>-</button>
          <button onClick={() => digitarNumero('0')}>0</button>
          <button onClick={() => digitarNumero('.')}>.</button>
          <button onClick={() => digitarOperador('+')}>+</button>
          <button onClick={() => calcular()}>=</button>
        </div>
      </div>
    </>
  )
}

export default App
