import './task.scss';
import { useState, useMemo, useEffect } from 'react';
import Checkboxes from '../checkboxes/Checkboxes';
import { useInput } from '../../hooks/useInput';
import Inputs from '../input/Input';
import Button from '../button/Button';
import {Right, Wrong, Arrow} from '../../resources';
import {createNumArr, createRandomNum} from '../../hooks/functions';
import {fieldsDefault} from '../../settings';


const Task = ({mode}) => {
   const firstNum = useInput(fieldsDefault),
         secondNum = useInput(fieldsDefault),
         resultNum = useInput(fieldsDefault);

   const [mistake, setMistake] = useState([]);

   //0 - нет сообщения, 1 - правильно, 2 - неправильно, 3 - некорректно введены числа
   const [messageCode, setMessageCode] = useState(0);

   //чекбоксы для отметок
   const [checked, setChecked] = useState([]);

   useEffect(() => cleanFields(), [mode])

   const checkAnswer = () => {
      setMistake([]);

      const first = +firstNum.value.join(''),
            second = +secondNum.value.join(''),
            result = +resultNum.value.join('');

      // console.log(first, second, result);

      if (mode == 'Сложение'){
         first + second === result ? setMessageCode(1) : setMessageCode(2);

      } else if (mode == 'Вычитание'){
         first - second === result ? setMessageCode(1) : setMessageCode(2);
      }
   }

   const randomNums = () => {

      cleanFields();

      const first = createRandomNum(10, 1000);
      let second;

      if (mode == 'Сложение'){
         second = createRandomNum(10, 1000);

      } else if (mode == 'Вычитание'){
         second = createRandomNum(10, first - 1);
      }

      // console.log(first, second);

      firstNum.setValue(createNumArr(first));
      secondNum.setValue(createNumArr(second));

      //числа максимум четырехзначные (настройка - сколько цифр в числах максимум или конкретно)
   }

   const cleanFields = () => {
      firstNum.setValue(fieldsDefault);
      secondNum.setValue(fieldsDefault);
      resultNum.setValue(fieldsDefault);
      setChecked([]);
      setMessageCode(0);
      setMistake([]);
   }

   const showAnswer = () => {
      let correctRes;

      if (mode == 'Сложение'){
         correctRes = createNumArr(+firstNum.value.join('') + +secondNum.value.join(''));

      } else if (mode == 'Вычитание'){
         correctRes = createNumArr(+firstNum.value.join('') - +secondNum.value.join(''));
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

   const message = useMemo(() => {
      switch(messageCode) {
         case 0:
            return;
         case 1:
            return (
               <div className="main__message main__message_right">
                  <Right/>
                  правильно
               </div>
            )
         case 2: return (
            <div className="main__message main__message_wrong">
               <Wrong/>
               неправильно
            </div>
         )
         default: return;
      }
   }, [messageCode])


   return (
      <div className="main">
         <div className="main__change-task">
            <Button light onClick={randomNums}>сгенерировать пример</Button>
         </div>


         <div className="task">
            <div className="task__top">
               <div className="task__sign">{mode == 'Сложение' ? '+' : '-'}</div>
               <div className="task__numbers">
                  <Checkboxes 
                     className={`task__checkboxes ${mode == 'Вычитание' ? 'task__checkboxes_minus' : ''}`}
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
               onClick={messageCode == 1 ? cleanFields : checkAnswer}>
               {messageCode == 1 ? 'очистить поля' : 'проверка решения'}
            </Button>
            
         </div>
      </div>
   );
};

export default Task;