import './App.scss';
import { useState, useEffect, useCallback } from 'react';
import Radio from '../radio/Radio';
import Checkboxes from '../checkboxes/Checkboxes';
import Task from '../task/Task';

function App() {

   const [modeRadio, setModeRadio] = useState('addition');
   const [hintDigit, setHintDigit] = useState('');//в режиме умножения

   const keyHandler = useCallback((e) => {
      if ( e.shiftKey === true && e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code.includes("Digit")) {

         //у необходимых цифр код будет Digit0, Digit1, Digit2 и тп
         console.log(`Key pressed: ${e.code[e.code.length - 1]}`);
         setHintDigit(e.code[e.code.length - 1]);
      }
   }, [modeRadio])

   useEffect(() => {

      if (modeRadio == 'multiplication'){
         document.addEventListener('keydown', keyHandler);
      } else {
         document.removeEventListener('keydown', keyHandler);
         setHintDigit('');
      }
      
      return function () {
         document.removeEventListener('keydown', keyHandler);
      }
   }, [modeRadio])

   return (
      <div className="app">
         <header className="app__header">
            <h1 className="app__title">Решение арифметических примеров в столбик</h1>
         </header>

         <section className="app__container">
            <div className="mode">
               <h2 className="mode__title">Режим</h2>
               
               <Radio name="mode" value="addition" radio={modeRadio} setRadio={setModeRadio}/>
               <Radio name="mode" value="subtraction" radio={modeRadio} setRadio={setModeRadio}/>
               <Radio name="mode" value="multiplication" radio={modeRadio} setRadio={setModeRadio}/>
            </div>

            <Task mode={modeRadio} hintDigit={hintDigit} setHintDigit={setHintDigit}/>
         </section>
      </div>
   );
}

export default App;
