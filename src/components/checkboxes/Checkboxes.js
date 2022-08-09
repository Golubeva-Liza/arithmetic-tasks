import './checkboxes.scss';
import { useState, useMemo } from 'react';

const Checkboxes = ({className}) => {

   const [checked, setChecked] = useState([]);

   const checkValues = useMemo(() => ([7, 6, 5, 4, 3, 2]), []);


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

   return (
      <div className={className}>
         {
            checkValues.map((el, id) => (
               <label className="checkbox" key={id}>
                  <input 
                     className="checkbox__input"
                     type="checkbox"
                     value={el}
                     checked={checked.indexOf(el) === -1 ? false : true}
                     onChange={() => changeCheckbox(el)}
                  />
                  <span className="checkbox__check"></span>
               </label>
            ))
         }
      </div>
   );
};

export default Checkboxes;