export default function selectInput() {
  const timeInputStart = document.querySelector('.time-input--start');
  const timeInputEnd = document.querySelector('.time-input--end');
  if (timeInputStart === null) return;
  
  function processInput(timeInput) {
    timeInput.querySelectorAll('input').forEach(el => el.addEventListener('change', () => {
      el.dispatchEvent(new Event('changeWD', {
        bubbles: true,
      }));
    }));
  }

  processInput(timeInputStart);
  processInput(timeInputEnd);

  const infoTypesStatus = document.querySelector('.info-types--time');
  const infoTypesStatusInputs = infoTypesStatus.querySelectorAll('input');

  function checkStatus() {
    const active = infoTypesStatus.querySelector('.info-types__radio:checked');
      if (active.value === '1') {
        timeInputEnd.style.display = '';
      } else {
        timeInputEnd.style.display = 'none';
      }
  }

  checkStatus();

  Array.from(infoTypesStatusInputs).forEach(el => {
    el.addEventListener('change', (e) => {
      e.preventDefault();
      checkStatus();
    });
  });


  

}