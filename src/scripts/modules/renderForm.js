export default function renderForm() {

  const pages = document.querySelectorAll('.page');
  const render = new Event('render');
  let page = 'personal-page';

  document.addEventListener('render', () => {
    window.scrollTo(0, 0);

    document.querySelector('.create-steps__item--is-active').classList.remove('create-steps__item--is-active');

    document.querySelector(`.create-steps__item[data-page="${page}"]`).classList.add('create-steps__item--is-active');
    
    pages.forEach(el => {
      if (el.classList.contains(`${page}`)) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  });

  const stepLinks = document.querySelectorAll('.step');
  stepLinks.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    page = el.getAttribute('data-direction');
    document.dispatchEvent(render);
  }));

  document.dispatchEvent(render);
}