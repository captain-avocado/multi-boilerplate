// import $ from 'jquery';
import mask from 'jquery-mask-plugin';
import validation from 'jquery-validation';

export default function inputs() {
  const infoTypes = document.querySelector('.info-types--legal');
  if (infoTypes === null) return;

  //добавить всем скрывающимся элементам класс individ, ip, entity
  //скрывать и показывать при определенном выборе 
  //а также навешивать required

  const widgets = document.querySelectorAll('.ajax-widget');

  function displayInputs() {
    const checkedRadio = $(infoTypes).find('.info-types__radio:checked');
    const value = checkedRadio.val();

    // $(`.panel-inputs.${value}`).addClass('widget-visible');   
    // $(`.panel-inputs:not(.${value})`).removeClass('widget-visible');  

    $(`.panel-inputs.${value}`).removeClass('hidden');   
    $(`.panel-inputs:not(.${value})`).addClass('hidden');   
    
    $(`.input-structure.${value}`).removeClass('hidden');  
    $(`.input-structure.${value} input`).attr('required', 'true');

    $(`.input-structure:not(.${value})`).addClass('hidden');  
    $(`.input-structure:not(.${value}) input`).removeAttr('required');

    if (value === 'entity') {
      $('.entity-visible').removeClass('hidden');
      $('.entity-hidden').addClass('hidden');
      $('.info-types--payment').addClass('info-types--no-margin');
    } else {
      $('.entity-visible').addClass('hidden');
      $('.entity-hidden').removeClass('hidden');
      $('.info-types--payment').removeClass('info-types--no-margin');
    }
  }

  displayInputs();
  
  $('.info-types__radio').on('change', e => {
    e.preventDefault();
    displayInputs();  
  });




  // function createInput(label, className) {
  //   let inputBlock = document.createElement('li');
  //   inputBlock.classList.add('inputs__item');
  //   inputBlock.classList.add(className);
  //   inputBlock.innerHTML = `<label for="" class="inputs__label">
  //     <div class="inputs__text">${label}</div>
  //     <input type="text" class="inputs__input">
  //     <div class="inputs__hint"></div>
  //   </label>`;
  //   return inputBlock;
  // }

  // function createPanel(panelClass, inputLabels) {
  //   let inputs = document.createElement('ul');
  //   // console.log(inputLabels)
  //   inputLabels.forEach(el => inputs.appendChild(createInput(el)));
  //   // inputs.appendChild(createInput('Contact1'));
  //   // inputs.appendChild(createInput('Contact2'));
  //   // inputs.appendChild(createInput('Contact3'));


  //   let panel = document.createElement('div');
  //   panel.classList.add('panel');
  //   panel.classList.add('panel--web-create');
  //   panel.classList.add(`${panelClass}`);
  //   panel.appendChild(inputs);
    
  //   return panel;
  // }

  // function removeBlocks(removeClass, parent) {
  //   const removeBlocks = document.querySelectorAll(removeClass);
  //   const parentBlock = document.querySelector(parent);
  //   if (removeBlocks !== null && parentBlock !== null) {
  //     removeBlocks.forEach(el => parentBlock.removeChild(el));
  //   }
  // }

  // const wrapper = document.querySelector('.web-create__inputs-wrapper');
  // const next = document.querySelector('.web-create__step-panels');
  // const firstPanel = document.querySelector('.first-info');

  // function removeToIndivid(className) {
  //   removeBlocks('.panel.add-IP', '.web-create__inputs-wrapper');
  //   removeBlocks('li.add-IP', '.first-info');
  //   removeBlocks('.panel.add-entity', '.web-create__inputs-wrapper');
  //   removeBlocks('li.add-entity', '.first-info');

  //   if (wrapper.querySelector('.default') === null) {
  //     const defaultPanel = document.createElement('div');
  //     defaultPanel.classList.add('panel');
  //     defaultPanel.classList.add('default');
  //     defaultPanel.innerHTML = `<ul class="inputs">
  //   <li class="inputs__item">
  //     <label for="" class="inputs__label">
  //       <div class="inputs__text">Телефон</div>
  //       <input type="text" class="inputs__input">
  //       <div class="inputs__hint"></div>
  //     </label>
  //   </li>
  //   <li class="inputs__item">
  //     <label for="" class="inputs__label">
  //       <div class="inputs__text">E-mail</div>
  //       <input type="text" class="inputs__input tel">
  //       <div class="inputs__hint"></div>
  //     </label>
  //   </li>
  //   <li class="inputs__item">
  //     <label for="" class="inputs__label">
  //       <div class="inputs__text">Город, страна</div>
  //       <input type="text" placeholder="например, Москва, Россия" class="inputs__input">
  //       <div class="inputs__hint"></div>
  //     </label>
  //   </li>
  //   <li class="inputs__item">
  //     <label for="" class="inputs__label">
  //       <div class="inputs__text">Дата рождения</div>
  //       <input type="text" placeholder="дд.мм.гг" class="inputs__input">
  //       <div class="inputs__hint"></div>
  //     </label>
  //   </li>
  //   <li class="inputs__item">
  //     <label for="" class="inputs__label">
  //       <div class="inputs__text">Профессиональные интересы</div>
  //       <input type="text" placeholder="например, психология, психоанализ" class="inputs__input">
  //       <div class="inputs__hint"></div>
  //     </label>
  //   </li>        
  // </ul>`;
  //     wrapper.insertBefore(defaultPanel, firstPanel.closest('.panel').nextSibling);
  //   }
  //   if (firstPanel.querySelector('.default') === null) {
  //     firstPanel.appendChild(createInput('Фамилия', 'default'));
  //     firstPanel.appendChild(createInput('Имя', 'default'));
  //     firstPanel.appendChild(createInput('Отчество', 'default'));
  //   }
  // }

  // function createEntityDefaultPanel() {
  //   const panel = document.createElement('div');
  //   panel.classList.add('panel');
  //   panel.classList.add('panel--web-create');
  //   panel.classList.add('add-entity');
  // panel.innerHTML = `<ul class="inputs">
  //   <li class="inputs__item">
  //     <label for="" class="inputs__label">
  //       <div class="inputs__text">Юридический адрес</div>
  //       <input type="text" placeholder="например, Москва, Россия" class="inputs__input inputs__input--addr">
  //       <input type="text" placeholder="например, Невский пр., дом 1, кв. 1" class="inputs__input">
  //     </label>
  //   </li>
  //   <li class="inputs__item">
  //     <label for="" class="inputs__label">
  //       <div class="inputs__text">Фактический адрес</div>
  //       <label class="inputs__match">
  //         <div class="inputs__match-text">Совпадает с юридическим</div>
  //         <input type="checkbox" class="inputs__match-check">
  //         <div class="inputs__match-fake"></div>
  //       </label>
  //       <input type="text" placeholder="например, Москва, Россия" class="inputs__input inputs__input--addr">
  //       <input type="text" placeholder="например, Невский пр., дом 1, кв. 1" class="inputs__input">
  //     </label>
  //   </li>
  // </ul>`;
  //   return panel;
  // }

  // function addIP() {
  //   wrapper.insertBefore(createPanel('add-IP', ['Контактное лицо', 'E-mail','Телефон']), next);
  //   firstPanel.appendChild(createInput('ИНН', 'add-IP'));
  //   firstPanel.appendChild(createInput('ЕГРИП', 'add-IP'));
  // }

  // function addEntity() {
  //   wrapper.insertBefore(createPanel('add-entity', ['Телефон компании', 'E-mail компании','Род деятельности']), next);
  //   wrapper.insertBefore(createEntityDefaultPanel(), next);
  //   wrapper.insertBefore(createPanel('add-entity', ['Контактное лицо', 'E-mail','Телефон']), next);
  //   while (firstPanel.firstChild) {
  //     firstPanel.removeChild(firstPanel.firstChild);
  //   }
  //   firstPanel.appendChild(createInput('Название компании', 'add-entity'));
  //   firstPanel.appendChild(createInput('ИНН', 'add-entity'));
  //   firstPanel.appendChild(createInput('КПП', 'add-entity'));
  //   firstPanel.appendChild(createInput('ОГРН', 'add-entity'));
  //   firstPanel.appendChild(createInput('ФИО Генерального директора', 'add-entity'));
  //   firstPanel.appendChild(createInput('ФИО Генерального директора в родительном падеже', 'add-entity'));
  //   firstPanel.appendChild(createInput('Действует на основании', 'add-entity'));
  //   wrapper.removeChild(wrapper.querySelector('.default'));
  // }

  // const infoTypesList = Array.from(infoTypes.children);
  // infoTypesList.forEach(el => {
  //   el.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     const prevActiveItem = document.querySelector('.info-types__type--is-active');
  //     if (el === prevActiveItem) return;
  //     prevActiveItem.classList.remove('info-types__type--is-active');
  //     removeToIndivid();

  //     if (el.classList.contains('info-types__type--ip')) {
  //       addIP();
  //     } else if (el.classList.contains('info-types__type--entity')) {
  //       addEntity();
  //     }
  //     el.classList.add('info-types__type--is-active');
  //   });
  // });

  

}