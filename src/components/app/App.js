import './App.scss';
import { useState } from 'react';
import Radio from '../radio/Radio';
import Button from '../button/Button';

function App() {

   const [modeRadio, setModeRadio] = useState('Сложение');

   return (
      <div className="app">
         <header className="app__header">
            <h1 className="app__title">Решение арифметических примеров в столбик</h1>
         </header>

         <section className="app__container">
            <div className="mode">
               <h2 className="mode__title">Режим</h2>
               
               <Radio name="mode" text="Сложение" radio={modeRadio} setRadio={setModeRadio}/>
               <Radio name="mode" text="Вычитание" radio={modeRadio} setRadio={setModeRadio}/>
            </div>

            <div className="main">
               <div className="change-task">
                  <Button light className="change-task__btn">ввести числа вручную</Button>
                  <Button>следующий пример</Button>
                  {/* <button className="change-task__btn"></button> */}
               </div>
            </div>
         </section>
      </div>
   );
}

export default App;
