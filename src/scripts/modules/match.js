export default function match() {
  const matchCheckbox = document.querySelector('.inputs__match--addr-reg');
  if (matchCheckbox === null) return;

  const inputReg = document.querySelector('.inputs__input--addr-reg');
  const inputFact = document.querySelector('.inputs__input--addr-fact');

  function copyInput() {
    inputFact.value = inputReg.value;  
  }

  matchCheckbox.addEventListener('change', () => {
    if (matchCheckbox.checked) {
      copyInput();
      inputReg.addEventListener('input', copyInput);
      inputFact.setAttribute('readonly', 'true');
    } else {
      inputReg.removeEventListener('input', copyInput);
      inputFact.removeAttribute('readonly', 'false');
    }
  });


  const matchCheckUr = document.querySelector('.inputs__match--addr-ur');
  if (matchCheckUr === null) return;

  const inputRegUr1 = document.querySelector('#wd-anketa-data_ul-adress_location');
  const inputRegUr2 = document.querySelector('#wd-anketa-data_ul-adress_street');

  const inputFacrUr1 = document.querySelector('#wd-anketa-data_ul-adress_location_real');
  const inputFacrUr2 = document.querySelector('#wd-anketa-data_ul-adress_street_real');


  function copyInputsUr() {
    inputFacrUr1.value = inputRegUr1.value;
    inputFacrUr2.value = inputRegUr2.value;
  }

  matchCheckUr.addEventListener('change', () => {
    if (matchCheckUr.checked) {
      // console.log('checked')
      copyInputsUr();
      inputRegUr1.addEventListener('input', copyInputsUr);
      inputRegUr2.addEventListener('input', copyInputsUr);
      inputFacrUr1.setAttribute('readonly', 'true');
      inputFacrUr2.setAttribute('readonly', 'true');
    } else {
      inputRegUr1.removeEventListener('input', copyInputsUr);
      inputRegUr2.removeEventListener('input', copyInputsUr);
      inputFacrUr1.removeAttribute('readonly', 'true');
      inputFacrUr2.removeAttribute('readonly', 'true');
    }
  });
  
}