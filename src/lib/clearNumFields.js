import {fieldsDefault} from '../settings';

const clearNumFields = (...fields) => {
   if (fields.length){
      fields.forEach(item => {
         item.setValue(fieldsDefault);
      })
   }
}

export default clearNumFields;