export function cookieParser() {
  const data = {};
  document.cookie.split(";").map((ele) => {
    return (data[ele.trim().split("=")[0]] = ele.split("=")[1]);
  });
  return data;
}

export const validateExpiryDate = (date) =>{


  let newDate = date.split('/');

  console.log(newDate,'ui')

  let isValid = newDate[0] !== '00' && Number(newDate[0]) <= 12

  isValid = isValid && newDate.join('').length === 4

  const expiryDateErrorText = document.getElementById('exiparyDateErrorText');

  if(!isValid){
   expiryDateErrorText.textContent = 'Enter Valid Expiry Date!'
  }
  else{
   expiryDateErrorText.textContent = ''
  }

  
}

export const validateCardNumber = (num) =>{
       
        const newNum = num.replace(/\s/g,'');

        const isValid = newNum.length === 12;

        console.log(isValid)
       
        const errorText = document.getElementById('cardNumberErrorText')

          
        if(!isValid){      
            errorText.textContent = 'Enter Valid Card Number!'
        }
        else{
         errorText.textContent = ''        
        }
}  