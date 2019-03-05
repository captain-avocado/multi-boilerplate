export default function infoTypes() {
  const infoPayment = document.querySelector('.info-types--payment');
  const infoPaymentTypes = infoPayment.childNodes;

  infoPaymentTypes.forEach(el => el.addEventListener('click', () => {
    const prevActiveType = infoPayment.querySelector('.info-types__type--is-active');
    if (prevActiveType === el) return;

    prevActiveType.classList.remove('info-types__type--is-active');
    el.classList.add('info-types__type--is-active');
    
    const firstPanel = infoPayment.closest('.panel');
    const panelsAfterFirst = firstPanel.parentElement.querySelectorAll('.panel--middle');
    const inputs = document.querySelectorAll('.panel--first > :not(.info-types)')
    console.log(inputs)
    if (el.classList.contains('info-types__type--not-need')) {
      panelsAfterFirst.forEach(el => el.classList.add('panel--hidden'));
      inputs.forEach(el => el.classList.add('hidden'));
      infoPayment.style.marginBottom = 0;
    } else {
      panelsAfterFirst.forEach(el => el.classList.remove('panel--hidden'));
      inputs.forEach(el => el.classList.remove('hidden'));
      infoPayment.style.marginBottom = '';
    }

  })); 

   
}