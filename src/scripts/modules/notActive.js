export default function notActive() {
  const notActiveElements = document.querySelectorAll('.not-active');
  if (notActiveElements.length === 0) return;

  notActiveElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.popup--tmp').classList.add('popup--is-active');
  }));
}