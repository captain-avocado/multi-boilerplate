import OverlayScrollbars from 'overlayscrollbars';


export default function tags(inputId) {
  //скролл дропдауна
  OverlayScrollbars(document.querySelectorAll('.dropdown-search__wrapper'), {
    className: 'os-theme-dark',
    sizeAutoCapable: true,
    paddingAbsolute: true,
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

  const inputItem = document.getElementById(inputId);

  const input = inputItem.querySelector('.select-input__input');
  const dropdown = inputItem.querySelector('.dropdown-search');

  let inputActive = false;

  input.addEventListener('focus', (e) => {
    inputActive = true;
  });

  input.addEventListener('blur', (e) => {
    inputActive = false;
  });

  document.addEventListener('click', closeDropdown);

  function closeDropdown(e) {
    if (e.target.closest('.dropdown-search') === null
      && !e.target.classList.contains('select-input__input')) {
      dropdown.classList.remove('dropdown-search--is-active');
      input.classList.remove('select-input__input--is-active');
    }
  }


  function deleteAllChildNodes(myNode) {
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  }

  let activeItems = [];

  function updateActiveItems() {
    activeItems.forEach((el) => {
      createActiveItem(el);
    });
  }

  function deselectActiveItem(item) {
    item.parentElement.removeChild(item);
  }

  function createActiveItem(itemText) {
    const item = document.createElement('li');
    item.classList.add('active-items__item');
    item.setAttribute('data-item', text);

    const wrapper = document.createElement('div');
    wrapper.classList.add('active-items__wrapper');
    wrapper.classList.add('active-items__wrapper--theme');
    const text = document.createElement('span');
    text.classList.add('active-items__text');
    text.innerText = itemText;
    wrapper.appendChild(text);

    const icon = document.createElement('img');
    icon.classList.add('active-items__icon-remove');
    icon.src = 'images/content/icon-remove.svg';
    wrapper.appendChild(icon);

    item.appendChild(wrapper);

    // const icon = item.querySelector('.active-items__icon-remove');
    icon.addEventListener('click', () => { deselectActiveItem(item); });
    return item;
  }

  function createItem(text) {
    const li = document.createElement('li');
    li.classList.add('dropdown-search__word');
    li.setAttribute('data-item', text);
    li.innerText = text;

    const icon = document.createElement('img');
    icon.src = 'images/content/icon-active.svg';
    icon.classList.add('dropdown-search__icon-active');

    li.appendChild(icon);


    li.addEventListener('click', (e) => {
      icon.classList.toggle('dropdown-search__icon-active--is-active');
    });
    return li;
  }


  input.addEventListener('keydown', (e) => {
    const val = input.value;
    // console.log(val)
    
    if (e.keyCode === 13 && val.length > 3 && val.replace(/\s/g, '').length) {
      inputItem.querySelector('.active-items').appendChild(createActiveItem(val));
    }
  })

  // input.addEventListener('keyup', (e) => {
  //   console.log('keyup')
  //   if (!inputActive || input.value.length <= 3) {
  //     if (dropdown.classList.contains('dropdown-search--is-active')) {
  //       dropdown.classList.remove('dropdown-search--is-active');
  //       input.classList.remove('select-input__input--is-active');
  //     }
  //     return;
  //   }

  //   let openDropdown = false;

  //   const list = dropdown.querySelector('ul');
  //   deleteAllChildNodes(list);

  //   Object.keys(autoComplete).map(function (objectKey, index) {
  //     autoComplete[objectKey].forEach(value => {

  //       if (value.includes(input.value)) {
  //         openDropdown = true;

  //         activeItems.push(value);
  //         const item = createItem(value);
  //         list.appendChild(item)
  //       }
  //     });
  //   });

  //   if (openDropdown) {
  //     dropdown.classList.add('dropdown-search--is-active');
  //     input.classList.add('select-input__input--is-active');
  //   } else {
  //     dropdown.classList.remove('dropdown-search--is-active');
  //     input.classList.remove('select-input__input--is-active');
  //   }


  // });

}