export default function fixedMenu() {
  const menuPanel = document.querySelector('.menu-panel');
  const panelWidth = menuPanel.clientWidth;
  const menuPanelList = menuPanel.querySelector('ul');
  document.addEventListener('scroll', function() {

    const posTop =  menuPanel.getBoundingClientRect().top;
    if (posTop <= 55) {
      menuPanelList.style.width = panelWidth + 'px';
      menuPanelList.classList.add('menu-panel__list--fixed');
    } else {
      menuPanelList.style.width = '';
      menuPanelList.classList.remove('menu-panel__list--fixed');
    }
  });
}