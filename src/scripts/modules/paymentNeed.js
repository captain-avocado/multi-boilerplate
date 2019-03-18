export default function paymentNeed() {
  const infoPayment = document.querySelector('.info-types--payment');
  if (infoPayment === null) return;
  const infoPaymentTypes = infoPayment.childNodes;
  const popup = document.querySelector('.popup--need');

  infoPaymentTypes.forEach(el => el.addEventListener('click', () => {
    const prevActiveType = infoPayment.querySelector('.info-types__type--is-active');
    if (prevActiveType === el) return;

    prevActiveType.classList.remove('info-types__type--is-active');
    el.classList.add('info-types__type--is-active');
    

    const firstPanel = infoPayment.closest('.panel');
    const panelsAfterFirst = firstPanel.parentElement.querySelectorAll('.panel--middle');
    const inputs = document.querySelectorAll('.panel--first > :not(.info-types)');
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

  document.querySelector('.popup__close').addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.remove('popup--is-active');
    if (this.classList.contains('popup__next')) {
      location.href = 'finish.html';
    }
  });

  const button = document.querySelector('.web-create__step--pay-next');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const activeInfo = infoPayment.querySelector('.info-types__type--is-active');
    if (activeInfo.classList.contains('info-types__type--not-need')) {
      popup.classList.add('popup--is-active');
    } else {
      location.href = 'finish.html';
    }
  });

   
}