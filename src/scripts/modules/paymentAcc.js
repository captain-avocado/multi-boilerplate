export default function paymentAcc() {

  const inputs = $('.panel--payment-need > :not(.info-types)');
  const infoTypes = document.querySelector('.info-types--payment');
  const infoTypesInputs = infoTypes.querySelectorAll('input');

  function checkStatus() {
    const active = infoTypes.querySelector('.info-types__radio:checked');
      if (active.value === 'free') {
        inputs.fadeOut(0);
        infoTypes.style.marginBottom = 0;
      } else {
        inputs.fadeIn(0);
        infoTypes.style.marginBottom = '';
      }
  }

  checkStatus();

  Array.from(infoTypesInputs).forEach(el => {
    el.addEventListener('change', (e) => {
      e.preventDefault();
      checkStatus();
    });
  });
}