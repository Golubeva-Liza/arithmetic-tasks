import './checkboxes.scss';
import { useState, useMemo, useRef } from 'react';

const Checkboxes = ({className, checked, setChecked}) => {

   // const [checked, setChecked] = useState([]);
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
      // console.log(newChecked);
   }

   const onKeyDown = (e, id) => {

      if (e.code == 'ArrowDown') {
         if (id === 0){ return; }
         itemRefs.current[id - 1].focus();

      } else if (e.code == 'ArrowUp'){
         if (id === checkValues.length - 1){ return; }
         itemRefs.current[id + 1].focus();
      }
      console.log(e.code);
   }

//tabIndex="0" onFocus={(e) => onFocus(e)}
// if (id === checkValues.length - 1){ 
//    e.target.tabIndex = -1; 
// }
//  else if (e.code == 'Tab'){
//    itemRefs.current[checkValues.length - 1].tabIndex = 0;
// }

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
                     onKeyDown={(e) => onKeyDown(e, id)}
                  />
                  <span className="checkbox__check"></span>
               </label>
            ))
         }
      </div>
   );
};

export default Checkboxes;