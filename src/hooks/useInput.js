import { useState } from "react";

export function useInput(initialValue) {
   const [value, setValue] = useState(initialValue);

   const onChange = (e, num) => {
      if (e.target.value > 9){
         return;
      }
      const updatedInputs = [...value.slice(0, num), e.target.value, ...value.slice(num + 1)];
      setValue(updatedInputs);
   }

   const removeValue = e => {
      setValue(initialValue);
   }

   return {value, setValue, onChange, removeValue};
}


// const onChange = e => {
//    setValue(e.target.value);
// }

// const removeValue = e => {
//    setValue(initialValue);
// }