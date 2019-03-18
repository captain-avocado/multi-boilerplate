export default function webiraySubscribe() {
  const subscribeForm = document.getElementById('webiray-subscribe');
  if (subscribeForm === null) return;


  const subscribePopup = subscribeForm.closest('.popup');
  const popupClose = document.querySelectorAll('.popup__close');
  popupClose.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    el.closest('.popup').classList.remove('popup--is-active');
  }));

  const subscribeLinks = document.querySelectorAll('.subscribe');
  subscribeLinks.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    subscribePopup.classList.add('popup--is-active');
  }));

  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (subscribeForm.querySelector('input').value.length === 0) return;

    // создать объект для формы
    var formData = new FormData(subscribeForm);

    // отослать
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://webiray.com/php/sendMail.php');
    xhr.send(formData);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.responseText === 'ok') {
          document.querySelector('.popup--contact').classList.add('popup--is-active');
        } else if (xhr.responseText === 'error2') {
          document.querySelector('.popup--contact-mail').classList.add('popup--is-active');
        } else {
          document.querySelector('.popup--contact-answer').classList.add('popup--is-active');
        }
      } else {
        document.querySelector('.popup--contact-answer').classList.add('popup--is-active');
      }
    };

  });

}