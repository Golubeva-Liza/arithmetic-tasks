import './checkboxes.scss';
import { useState, useMemo, useRef } from 'react';
import movingArrows from '../../lib/movingArrows';

const Checkboxes = ({className, checked, setChecked}) => {

   const checkValues = useMemo(() => ([7, 6, 5, 4, 3, 2]), []);
   const itemRefs = useRef([]);


   const changeCheckbox = (value) => {
      
      const currentIndex = checked.indexOf(value);
      let newChecked = [...checked];

      if (currentIndex === -1){
         newChecked.push(value);
      } else{
         newChecked.splice(currentIndex, 1);
      }
      
      setChecked(newChecked);
   }
   

   return (
      <div className={className}>
         {
            checkValues.map((el, id) => (
               <label className="checkbox" key={id}>
                  <input 
                     ref={el => itemRefs.current[id] = el}
                     className="checkbox__input"
                     type="checkbox"
                     value={el}
                     checked={checked.indexOf(el) === -1 ? false : true}
                     onChange={() => changeCheckbox(el)}
                     tabIndex={id == checkValues.length - 1 ? 0 : -1}
                     onKeyDown={(e) => movingArrows(e, id, itemRefs, checkValues.length)}
                  />
                  <span className="checkbox__check"></span>
               </label>
            ))
         }
      </div>
   );
};

export default Checkboxes;