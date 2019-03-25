export default function popup() {
  const popup = $('.popup');
  popup.each((i, element) => {
    const el = $(element);
    const closeLink = el.find('.popup__close');
    closeLink.on('click', (e) => {
      e.preventDefault();
      el.removeClass('popup--is-active');
    });
    if (el.hasClass('popup__next')) {
      location.href = 'finish.html';
    }
  });
   
}