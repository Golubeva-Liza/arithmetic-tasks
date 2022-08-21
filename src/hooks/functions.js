
const createRandomNum = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createNumArr = (num) => {
   let arr = num.toString().split(''); //число трансформируется в массив цифр
   const length = arr.length;
   
   //добавление пробелов перед числом
   for (let i = 1; i <= 7 - length; i++){
      arr.unshift('');
   }

   return arr;
}

export {createRandomNum, createNumArr};

//createRandomNum(10, 1000)