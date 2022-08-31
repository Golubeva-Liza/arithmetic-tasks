import './task.scss';
import { useState, useMemo, useEffect } from 'react';
import { useInput } from '../../hooks/useInput';
import useMessage from '../../hooks/useMessage';
import {createNumArr, createRandomNum} from '../../lib/getNums';
import {fieldsDefault, arithOperations} from '../../settings';

import Inputs from '../input/Input';
import Button from '../button/Button';
import Checkboxes from '../checkboxes/Checkboxes';
import MultiplyTask from '../multiplyTask/MultiplyTask';


const Task = ({mode}) => {
   const firstNum = useInput(fieldsDefault),
         secondNum = useInput(fieldsDefault),
         resultNum = useInput(fieldsDefault);

   //числа, которые являются вычислительными в процессе умножения
   const firstSum = useInput(fieldsDefault),
         secondSum = useInput(fieldsDefault),
         thirdSum = useInput(fieldsDefault);
   const [hintInput, setHintInput] = useState('');//в режиме умножения

   //чекбоксы для отметок
   const [checked, setChecked] = useState([]);
   const [mistake, setMistake] = useState([]);
   const {messageCode, setMessageCode, message} = useMessage();



   useEffect(() => clearFields(), [mode])


   const checkAnswer = () => {
      setMistake([]);

      const first = +firstNum.value.join(''),
            second = +secondNum.value.join(''),
            result = +resultNum.value.join('');

      // console.log(first, second, result);

      if (mode == 'addition'){
         first + second === result ? setMessageCode(1) : setMessageCode(2);

      } else if (mode == 'subtraction'){
         first - second === result ? setMessageCode(1) : setMessageCode(2);

      } else if (mode == 'multiplication'){
         first * second === result ? setMessageCode(1) : setMessageCode(2);
      }
   }

   const randomNums = () => {

      clearFields();

      let first = createRandomNum(10, 1000);
      let second;

      if (mode == 'addition'){
         second = createRandomNum(10, 1000);

      } else if (mode == 'subtraction'){
         second = createRandomNum(10, first - 1);

      } else if (mode == 'multiplication'){
         clearSumFields();
         first = createRandomNum(2, 150);
         second = createRandomNum(2, 150);
      }

      firstNum.setValue(createNumArr(first));
      secondNum.setValue(createNumArr(second));

      //числа максимум четырехзначные (настройка - сколько цифр в числах максимум или конкретно)
   }

   const clearFields = () => {
      firstNum.setValue(fieldsDefault);
      secondNum.setValue(fieldsDefault);
      resultNum.setValue(fieldsDefault);
      setChecked([]);
      setMessageCode(0);
      setMistake([]);

      if (mode == 'multiplication'){
         setHintInput('')
      };
   }

   const clearSumFields = () => {
      firstSum.setValue(fieldsDefault);
      secondSum.setValue(fieldsDefault);
      thirdSum.setValue(fieldsDefault);
      setHintInput('');
   }

   const showAnswer = () => {
      let correctRes;

      if (mode == 'addition'){
         correctRes = createNumArr(+firstNum.value.join('') + +secondNum.value.join(''));

      } else if (mode == 'subtraction'){
         correctRes = createNumArr(+firstNum.value.join('') - +secondNum.value.join(''));

      } else if (mode == 'multiplication'){
         correctRes = createNumArr(+firstNum.value.join('') * +secondNum.value.join(''));
      }

      const inputNum = [];

      correctRes.forEach((el, id) => {
         if (resultNum.value[id] !== el){
            inputNum.push(id);
         };
      })
      setMistake(inputNum);
   }

   const hideAnswer = () => {
      setMistake([]);
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
               hintInput={hintInput} setHintInput={setHintInput}/> 
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
                  onClick={mistake.length ? hideAnswer : showAnswer}>
                  {mistake.length ? 'спрятать подсказку' : 'показать подсказку'}
               </Button>
            ) : null}
            
            <Button
               disabled={firstNum.value.join('') == '' || secondNum.value.join('') == '' || resultNum.value.join('') === ''}
               onClick={messageCode == 1 ? clearFields : checkAnswer}>
               {messageCode == 1 ? 'очистить поля' : 'проверка решения'}
            </Button>
            
         </div>
      </div>
   );
};

export default Task;