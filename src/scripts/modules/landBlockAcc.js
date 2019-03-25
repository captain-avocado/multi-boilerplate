export default function landBlockAcc() {
  const tmpWrap = $('.input-info__tmp-wrap');
  const infoTypesStatus = document.querySelector('.info-types--land-status');
  const infoTypesStatusInputs = infoTypesStatus.querySelectorAll('input');

  function checkStatus() {
    const active = infoTypesStatus.querySelector('.info-types__radio:checked');
      if (active.value === 'no') {
        tmpWrap.fadeOut(0);
      } else {
        tmpWrap.fadeIn(0);
      }
  }

  checkStatus();

  Array.from(infoTypesStatusInputs).forEach(el => {
    el.addEventListener('change', (e) => {
      e.preventDefault();
      checkStatus();
    });
  });

  const popup = document.querySelector('.popup--webinar');
  const inputMore = document.querySelector('.inputs__more');
  inputMore.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('popup--is-active');
  });
}
