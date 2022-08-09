import './task.scss';
import { useState, useMemo } from 'react';
import Checkboxes from '../checkboxes/Checkboxes';


const Task = ({className}) => {
   // const emailInput = useInput('');

   return (
      <div className="task">
         <div className="task__top">
            <div className="task__sign">+</div>
            <div className="task__numbers">
               <Checkboxes className="task__checkboxes"/>                        

               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
               <input type="text" />
            </div>
         </div>

         <hr className="task__line"/>

         <div className="task__answer task__numbers">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
         </div>
      </div>
   );
};

export default Task;