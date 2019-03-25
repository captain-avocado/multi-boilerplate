export default function landings() {
  const landings = document.querySelector('.landings');
  if (landings === null) return;

  const panelSecond = document.querySelector('.panel--second');
  const panelThird = document.querySelector('.panel--third');
  const img = document.querySelector('.landings__image');

  const infoTypesTime = document.querySelector('.info-types--land-time');
  const infoTypesTimeInputs = infoTypesTime.querySelectorAll('input');
  const infoTypesStatus = document.querySelector('.info-types--land-status');
  const infoTypesStatusInputs = infoTypesStatus.querySelectorAll('input');

  function renderLandings() {
      const active = infoTypesStatus.querySelector('.info-types__radio:checked');
      const activeTime = infoTypesTime.querySelector('.info-types__radio:checked');
      if (active.value === 'no') {
        panelSecond.style.display = 'none';
        panelThird.style.display = 'none';
        if (img !== null) img.style.display = 'none';
      } else {
        panelSecond.style.display = '';
        if (activeTime.value === 'later') {
          panelThird.style.display = 'none';
          if (img !== null) img.style.display = '';
        } else {
          panelThird.style.display = '';
          if (img !== null) img.style.display = 'none';
        }
      }
  }

  renderLandings();

  Array.from(infoTypesStatusInputs).forEach(el => {
    el.addEventListener('change', (e) => {
      e.preventDefault();
      renderLandings();
    });
  });

  Array.from(infoTypesTimeInputs).forEach(el => {
    el.addEventListener('change', (e) => {
      e.preventDefault();
      // console.log('hh');

      const active = infoTypesTime.querySelector('.info-types__radio:checked');
      if (active.value === 'later') {
        panelThird.style.display = 'none';
        if (img !== null) img.style.display = '';
      } else {
        panelThird.style.display = ''; 
        if (img !== null) img.style.display = 'none';
      }
    });
  });

  const popup = document.querySelector('.popup--webinar');
  const inputMore = document.querySelector('.inputs__more');
  inputMore.addEventListener('click', (e) => {
    e.preventDefault();
    popup.classList.add('popup--is-active');
  });

   
}