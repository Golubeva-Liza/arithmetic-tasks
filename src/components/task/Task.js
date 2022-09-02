import './task.scss';
import { useState, useRef, useEffect } from 'react';
import { useInput } from '../../hooks/useInput';
import useMessage from '../../hooks/useMessage';
import { useCorrectAnswer } from '../../hooks/useCorrectAnswer';

import {createNumArr, createRandomNum} from '../../lib/getNums';
import {fieldsDefault, arithOperations} from '../../settings';
import clearNumFields from '../../lib/clearNumFields';

import Inputs from '../input/Input';
import Button from '../button/Button';
import Checkboxes from '../checkboxes/Checkboxes';
import MultiplyTask from '../multiplyTask/MultiplyTask';


const Task = ({mode, hintDigit, setHintDigit}) => {
   const firstNum = useInput(fieldsDefault),
         secondNum = useInput(fieldsDefault),
         resultNum = useInput(fieldsDefault);

   //числа, которые являются вычислительными в процессе умножения
   const firstSum = useInput(fieldsDefault),
         secondSum = useInput(fieldsDefault),
         thirdSum = useInput(fieldsDefault);

   //чекбоксы для отметок
   const [checked, setChecked] = useState([]);

   const {messageCode, setMessageCode, message} = useMessage();
   const {showAnswer, hideAnswer, mistake, setMistake} = useCorrectAnswer();
   const firstUpdate = useRef(true);


   useEffect(() => {
      //предотвращение запуска useEffect при первом рендере
      if (firstUpdate.current) {
         firstUpdate.current = false;
         return;
      }
      clearAllFields();
   }, [mode])


   useEffect(() => {
      if (messageCode !== 0 || mistake.length){
         setMessageCode(0);
         setMistake([]);
      }
   }, [firstNum.value, secondNum.value])


   const checkAnswer = () => {
      setMistake([]);
      
      const first = +firstNum.value.join(''),
            second = +secondNum.value.join(''),
            result = +resultNum.value.join('');

      if (mode == 'addition'){
         first + second === result ? setMessageCode(1) : setMessageCode(2);

      } else if (mode == 'subtraction'){
         first - second === result ? setMessageCode(1) : setMessageCode(2);

      } else if (mode == 'multiplication'){
         first * second === result ? setMessageCode(1) : setMessageCode(2);
      }
   }


   const randomNums = () => {
      clearAllFields();

      let first = createRandomNum(10, 1000);
      let second;

      if (mode == 'addition'){
         second = createRandomNum(10, 1000);

      } else if (mode == 'subtraction'){
         second = createRandomNum(10, first - 1);

      } else if (mode == 'multiplication'){
         clearNumFields(firstSum, secondSum, thirdSum);
         setHintDigit('');
         first = createRandomNum(2, 150);
         second = createRandomNum(2, 150);
      }

      firstNum.setValue(createNumArr(first));
      secondNum.setValue(createNumArr(second));
      //настройка - сколько цифр в числах максимум
   }

   const clearAllFields = () => {
      clearNumFields(firstNum, secondNum, resultNum);
      setChecked([]);
      setMessageCode(0);
      setMistake([]);

      if (mode == 'multiplication'){
         setHintDigit('');
      };
   }

   return (
      <div className="main">
         <div className="main__change-task">
            <Button light onClick={randomNums}>сгенерировать пример</Button>
         </div>

         {mode == 'multiplication' ?   
            <MultiplyTask 
               firstNum={firstNum} 
               secondNum={secondNum} 
               resultNum={resultNum}
               firstSum={firstSum} 
               secondSum={secondSum} 
               thirdSum={thirdSum}
               mistake={mistake}
               hintDigit={hintDigit}
               /> 
            : (
            <div className="task">
               <div className="task__top">
                  <div className="task__sign">{arithOperations[mode].sign}</div>
                  <div className="task__numbers">
                     <Checkboxes 
                        className={`task__checkboxes ${mode == 'subtraction' ? 'task__checkboxes_minus' : ''}`}
                        checked={checked} setChecked={setChecked}
                     />                        

                     <Inputs state={firstNum} count={7} />
                     <Inputs state={secondNum} count={7} />
                  </div>
               </div>

               <hr className="task__line"/>

               <div className="task__answer task__numbers">
                  <Inputs state={resultNum} count={7} mistake={mistake}/>
               </div>
            </div>
         )}

         <div className="main__verify">
            {message}

            {messageCode == 2 ? (
               <Button light 
                  className="main__show-answer"
                  onClick={mistake.length ? hideAnswer : () => showAnswer(mode, firstNum.value, secondNum.value, resultNum.value)}>
                  {mistake.length ? 'спрятать подсказку' : 'показать подсказку'}
               </Button>
            ) : null}
            
            <Button
               disabled={firstNum.value.join('') == '' || secondNum.value.join('') == '' || resultNum.value.join('') === ''}
               onClick={messageCode == 1 ? clearAllFields : checkAnswer}>
               {messageCode == 1 ? 'очистить поля' : 'проверка решения'}
            </Button>
            
         </div>
      </div>
   );
};

export default Task;
//mistake.length ? hideAnswer : () => showAnswer(mode, firstNum.value, secondNum.value, resultNum.value)