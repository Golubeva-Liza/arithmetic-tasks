import './App.scss';
import { useState } from 'react';
import Radio from '../radio/Radio';
import Button from '../button/Button';
import {Right, Wrong, Arrow} from '../../resources';
import Checkboxes from '../checkboxes/Checkboxes';
import Task from '../task/Task';

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
               <div className="main__change-task">
                  {/* <Button light className="main__btn">ввести числа вручную</Button> */}
                  <Button light>сгенерировать пример</Button>
               </div>

               <Task/>

               <div className="main__verify">
                  <div className="main__message main__message_wrong">
                     {/* <Right/>
                     правильно */}
                     <Wrong/>
                     неправильно
                  </div>
                  <Button>проверка решения</Button>
               </div>
            </div>
         </section>
      </div>
   );
}

export default App;
