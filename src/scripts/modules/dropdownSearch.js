import OverlayScrollbars from 'overlayscrollbars';
import infoTypes from './infoTypes';

export default function dropdownSearch() {
  //скролл дропдауна
  OverlayScrollbars(document.querySelectorAll('.dropdown-search'),{
    className       : 'os-theme-dark',
    sizeAutoCapable : true,
    paddingAbsolute : true,
  });



  const autoComplete = {
    "психология": [
      "психология",
      "психоанализ",
      "детская психология"
    ],
    "обучение": [
        "обучалка",
        "самообучение",
        "домашнее обучение"
    ]
  };

  Object.keys(autoComplete).map(function(objectKey, index) {
    var value = autoComplete[objectKey];
    // console.log(value);
  });  

  //выбрать все инпуты и иконки-триггеры
  // const inputSearch = document.querySelectorAll('.inputs__input--search');
  const inputSearch = document.querySelectorAll('.select-input__input');
  const inputSearchIcon = document.querySelectorAll('.select-input__dropdown-open');

  // const inputSearchIcon = document.querySelectorAll('.inputs__dropdown-open');
  if (inputSearch === null) return;

  //скрите/появление дропдауна
  function toggleDropdown(e) {
    e.preventDefault();
    const dropdownSearch = e.currentTarget.parentElement.querySelector('.dropdown-search');

    if (dropdownSearch.classList.contains('dropdown-search--not-active')) return;

    const input = dropdownSearch.nextElementSibling;
    const openLink = input.nextElementSibling;

    // console.log(input)
    if (dropdownSearch.classList.contains('dropdown-search--is-active')) {
      closeActiveDropdowns();
      getAutocomplete(input, dropdownSearch);
    } else {
      closeActiveDropdowns();
      dropdownSearch.classList.add('dropdown-search--is-active');
      input.classList.add('select-input__input--is-active');
      openLink.classList.add('select-input__dropdown-open--is-active');
    }
  }

  function closeActiveDropdowns() {
    const prevActiveDropdowns = document.querySelectorAll('.dropdown-search--is-active');
    const prevActiveInputs = document.querySelectorAll('.select-input__input--is-active');
    const prevActiveLinks = document.querySelectorAll('.select-input__dropdown-open--is-active');
    
    if (prevActiveDropdowns !== null) {
      prevActiveDropdowns.forEach(el => el.classList.remove('dropdown-search--is-active'));
      prevActiveInputs.forEach(el => el.classList.remove('select-input__input--is-active'));
      prevActiveLinks.forEach(el => el.classList.remove('select-input__dropdown-open--is-active'));
    }
  }

  function openDropdown(e) {
    e.preventDefault();
    closeActiveDropdowns();
    const dropdownSearch = e.currentTarget.parentElement.querySelector('.dropdown-search');
    if (dropdownSearch.classList.contains('dropdown-search--not-active')) return;
    const input = dropdownSearch.nextElementSibling;
    const openLink = input.nextElementSibling;
    dropdownSearch.classList.add('dropdown-search--is-active');
    input.classList.add('select-input__input--is-active');
    openLink.classList.add('select-input__dropdown-open--is-active');
    getAutocomplete(input, dropdownSearch);
  }

  function closeDropdown(e) {
    if (e.target.closest('.dropdown-search') === null && !e.target.classList.contains('select-input__input') && !e.target.classList.contains('select-input__dropdown-open') && !e.target.classList.contains('select-input__dropdown-icon')) {
      closeActiveDropdowns();
    }
  }

  function getEditDistance(a, b) {
    if (a.length === 0) return b.length; 
    if (b.length === 0) return a.length;
  
    var matrix = [];
  
    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
      for (j = 1; j <= a.length; j++) {
        if (b.charAt(i-1) == a.charAt(j-1)) {
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }
  
    return matrix[b.length][a.length];
  };

  function getAutocomplete(input, dropdownSearch) {
    input.addEventListener('keyup', () => {
      if (input.value.length > 3) {
        let openDropdown = false;
        const dropdownWrap = dropdownSearch.querySelector('.dropdown-search__wrapper');
        const prevList = dropdownWrap.querySelector('ul');
        dropdownWrap.removeChild(prevList);
        const dropdownList = document.createElement('ul');
        dropdownList.classList.add('dropdown-search__list');

        Object.keys(autoComplete).map(function(objectKey, index) {
          autoComplete[objectKey].forEach(value => {
            // console.log(input.value)
            // console.log(value)
            if (value.includes(input.value)) {
              
              openDropdown = true;
              const item = document.createElement('li');
              item.classList.add('dropdown-search__word');
              item.innerText = value;

              item.addEventListener('click', () => { selectDropdownItem(item); });
              dropdownList.appendChild(item)
            }
          });
        });  
        // console.log(openDropdown)
        dropdownWrap.appendChild(dropdownList);
        if (openDropdown) {
          const openLink = input.nextElementSibling;
          dropdownSearch.classList.add('dropdown-search--is-active');
          input.classList.add('select-input__input--is-active');
          openLink.classList.add('select-input__dropdown-open--is-active');
        } else {
          const openLink = input.nextElementSibling;
          $(dropdownSearch).removeClass('dropdown-search--is-active');
          $(input).removeClass('select-input__input--is-active');
          $(openLink).removeClass('select-input__dropdown-open--is-active');
        }
      } else {
        const openLink = input.nextElementSibling;
          $(dropdownSearch).removeClass('dropdown-search--is-active');
          $(input).removeClass('select-input__input--is-active');
          $(openLink).removeClass('select-input__dropdown-open--is-active');
      }
    })
  }

  document.addEventListener('click', closeDropdown);
  inputSearch.forEach(el => {
    getAutocomplete(el, el.parentElement.querySelector('.dropdown-search'));
    // el.addEventListener('focus', openDropdown);
    el.addEventListener('keydown', (e) => {
      const val = el.value;
      
      if (e.keyCode === 13 && val.length > 3 && val.replace(/\s/g, '').length) {
        el.closest('li').querySelector('.active-items').appendChild(createActiveItem(el.value, el.value, 'theme'));
      }
    })
  });
  inputSearchIcon.forEach(el => el.addEventListener('click', toggleDropdown));
  

  //снять выделение с элемента
  function deselectActiveItem(item) {
    const dataItem = item.getAttribute('data-item');
    const dropdownSearch = item.closest('.select-input').querySelector('.dropdown-search');

    const dropdownSearchItem = dropdownSearch.querySelector(`[data-item="${dataItem}"]`);
    if(dropdownSearchItem !== null) dropdownSearchItem.querySelector('img').classList.remove('dropdown-search__icon-active--is-active');

    const itemsList = item.closest('.select-input').querySelector('.active-items');

    const activeItem = itemsList.querySelector(`[data-item="${dataItem}"]`);
    if (activeItem !== null) {
      activeItem.parentElement.removeChild(activeItem);
    }
  }

  //создать активный элемент
  function createActiveItem(itemText, dataItem, dataType) {
    const item = document.createElement('li');
    item.classList.add('active-items__item');
    item.setAttribute('data-item', dataItem);

    const wrapper = document.createElement('div');
    wrapper.classList.add('active-items__wrapper');

    if (dataType === 'theme') {
      wrapper.classList.add('active-items__wrapper--theme');
      const text = document.createElement('span');
      text.classList.add('active-items__text');
      text.innerText = itemText;
      wrapper.appendChild(text);
  
      const icon = document.createElement('img');
      icon.classList.add('active-items__icon-remove');
      icon.src = 'images/content/icon-remove.svg';
      wrapper.appendChild(icon);
    }

    if (dataType === 'lead') {
      item.classList.add('active-items__item--lead');

      wrapper.innerHTML = `
        <div class="active-items__row">
          <div class="active-items__avatar"></div>
          <div class="active-items__name"></div>
          <img src="images/content/icon-remove.svg" alt="icon-remove" class="active-items__icon-remove">
        </div>
        <div class="active-items__row">
          <div class="active-items__text">Обязанности</div>
          <div class="active-items__info-types info-types">
            <label class="info-types__type">
              <input type="radio" class="info-types__radio" id="lead-speaker" name="speaker-status" value="lead-speaker" checked>
              <div class="info-types__text">
                ведущий
              </div>
            </label>
            <label class="info-types__type">
              <input type="radio" class="info-types__radio" id="help-speaker" name="speaker-status" value="help-speaker">
              <div class="info-types__text">
                ассистент
              </div>
            </label>
          </div>
        </div>
        <div class="active-items__row">
          <div class="active-items__input">
          <div class="select-input">
          <div class="dropdown-search">
              <div class="dropdown-search__wrapper">
                <ul class="dropdown-search__list">
                  <li class="dropdown-search__item dropdown-search__item--lead">
                    <div class="dropdown-search__word" data-item="author11" data-type="lead">Ответы на вопросы по теории
                      <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                    </div>
                  </li>
                  <li class="dropdown-search__item dropdown-search__item--lead">
                    <div class="dropdown-search__word" data-item="author21" data-type="lead">Ответы на вопросы по теории
                      <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                    </div>
                  </li>
                  <li class="dropdown-search__item dropdown-search__item--lead">
                    <div class="dropdown-search__word" data-item="author31" data-type="lead">Ответы на вопросы по теории
                      <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                    </div>
                  </li>
                  <li class="dropdown-search__item dropdown-search__item--lead">
                      <div class="dropdown-search__word" data-item="author41" data-type="lead">Ответы на вопросы по теории
                        <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                      </div>
                    </li> 
                    <li class="dropdown-search__item dropdown-search__item--lead">
                        <div class="dropdown-search__word" data-item="author51" data-type="lead">Ответы на вопросы по теории
                          <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                        </div>
                      </li> 
                      <li class="dropdown-search__item dropdown-search__item--lead">
                          <div class="dropdown-search__word" data-item="author61" data-type="lead">Ответы на вопросы по теории
                            <img src="images/content/icon-active.svg" alt="icon-active" class="dropdown-search__icon-active">
                          </div>
                        </li>                                      
                </ul>
              </div>
          </div>
        <input type="text" class="select-input__input select-input__input--lead-one">
        <a href="#" class="select-input__dropdown-open">
          <img src="images/content/angle-search.svg" alt="open-dropdown" class="select-input__dropdown-icon">
        </a>
      </div>
          </div>
        </div>
      `;

    }

    item.appendChild(wrapper);
    const icon = item.querySelector('.active-items__icon-remove');
    icon.addEventListener('click', () => { deselectActiveItem(item); });
    const name = item.querySelector('.active-items__name');
    if (name !== null)
      name.innerText = itemText;
    
    return item;
  }

  //присоединить элемент к списку активных элементов
  function appendActiveItem(item, itemList) {   
    if (itemList.querySelector(`[data-item="${item.getAttribute('data-item')}"]`) !== null) return;
    itemList.appendChild(item);
  }

  //выбрать элемент
  function selectDropdownItem(el) {
    // console.log('select')
    const icon = el.querySelector('.dropdown-search__icon-active');
    icon.classList.toggle('dropdown-search__icon-active--is-active');
    if (icon.classList.contains('dropdown-search__icon-active--is-active')) {
      const text = el.innerText;
      const item = createActiveItem(text, el.getAttribute('data-item'), el.getAttribute('data-type'));
      const itemList = el.closest('.select-input').querySelector('.active-items');
      appendActiveItem(item, itemList);

      infoTypes();
    } else {
      deselectActiveItem(el);
    }
  }

  const items = document.querySelectorAll('.dropdown-search__word');
  items.forEach(el => el.addEventListener('click', () => { selectDropdownItem(el); }));



}