import OverlayScrollbars from 'overlayscrollbars';


export default function inputFile() {
  const dropdownSearch = document.querySelector('.dropdown-search');
  if (dropdownSearch === null) return;

  const inputSearch = document.querySelector('.inputs__input--search');
  const inputSearchIcon = document.querySelector('.inputs__dropdown-open');

  function toggleDropdown(e) {
    e.preventDefault();
    dropdownSearch.classList.toggle('dropdown-search--is-active');
  }

  inputSearch.addEventListener('focus', toggleDropdown);
  // inputSearch.addEventListener('blur', toggleDropdown);
  inputSearchIcon.addEventListener('click', toggleDropdown);

  const itemsList = document.querySelector('.active-items');

  var instance = OverlayScrollbars(dropdownSearch.querySelector('.dropdown-search__list'),{
    className       : "os-theme-dark",
    sizeAutoCapable : true,
    paddingAbsolute : true
  });
  console.log(dropdownSearch.querySelector('.dropdown-search__list'))
  console.log(OverlayScrollbars)
  console.log(instance)




  function deselectActiveItem(item) {
    const dataItem = item.getAttribute('data-item');

    const dropdownSearchItem = dropdownSearch.querySelector(`[data-item="${dataItem}"`);
    dropdownSearchItem.querySelector('img').classList.remove('dropdown-search__icon-active--is-active');

    const activeItem = itemsList.querySelector(`[data-item="${dataItem}"`);
    if (activeItem !== null) {
      activeItem.parentElement.removeChild(activeItem);
    }
  }

  function createActiveItem(itemText, dataItem) {
    const item = document.createElement('li');
    item.classList.add('active-items__item');
    item.setAttribute('data-item', dataItem);

    const text = document.createElement('span');
    text.classList.add('active-items__text');
    text.innerText = itemText;
    item.appendChild(text);

    const icon = document.createElement('img');
    icon.classList.add('active-items__icon-remove');
    icon.src = 'images/content/icon-remove.svg';
    icon.addEventListener('click', () => { deselectActiveItem(item); });
    item.appendChild(icon);

    return item;
  }

  function appendActiveItem(item) {
    if (itemsList.querySelector(`[data-item="${item.getAttribute('data-item')}"`) !== null) return;
    itemsList.appendChild(item);
  }

  function selectDropdownItem(el) {
    const icon = el.querySelector('.dropdown-search__icon-active');
    icon.classList.toggle('dropdown-search__icon-active--is-active');
    if (icon.classList.contains('dropdown-search__icon-active--is-active')) {
      const text = el.innerText;
      const item = createActiveItem(text, el.getAttribute('data-item'));
      appendActiveItem(item);
    } else {
      deselectActiveItem(el);
    }
  }

  const items = dropdownSearch.querySelectorAll('.dropdown-search__word');
  items.forEach(el => el.addEventListener('click', () => { selectDropdownItem(el); }));



}