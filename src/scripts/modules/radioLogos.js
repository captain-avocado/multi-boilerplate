export default function infoTypes() {
  const radioLogos = document.querySelectorAll('.pay-logos__check');
  if (radioLogos.length === 0) return;

  function selectLogo() {
    const prevActiveLogo = document.querySelector('.pay-logos__item--is-active');
    prevActiveLogo.classList.remove('pay-logos__item--is-active');
    const activeRadio = document.querySelector('.pay-logos__check:checked');
    activeRadio.closest('li').classList.add('pay-logos__item--is-active');
  }

  selectLogo();

  radioLogos.forEach(el => el.addEventListener('input', selectLogo));
   
}