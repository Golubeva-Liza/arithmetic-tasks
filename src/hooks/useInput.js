import { useState } from "react";

export function useInput(initialValue) {
   //initialValue - массив
   const [value, setValue] = useState(initialValue);

   const onChange = (e, num) => {
      const thisValue = e.target.value;

      //если новое значение не является числом, то ничего не меняется
      if (!/^\d+$/.test(thisValue) && thisValue !== ''){
         return;
      }
      
      let newValue;

      //если цифра уже есть и вводится новая, то новое значение формируется из "новой" цифры, появившейся в числе, неважно, ввели его в начале или в конце
      if (thisValue.length > 1 && thisValue[0] == value[num]) {
         newValue = thisValue[1];
      } else {
         newValue = thisValue[0];
      }

      const updatedInputs = [...value.slice(0, num), newValue, ...value.slice(num + 1)];
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