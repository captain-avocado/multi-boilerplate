
export default function calendar(calendarId) {
  const calendar = document.getElementById(calendarId);
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  $(calendar).find('.calendar__cell').on('click', (e) => {
    // e.preventDefault();
    const el = e.currentTarget;
    const calendar = e.currentTarget.closest('.calendar');
    const prevActive = calendar.querySelector('.calendar__cell--today');
    if (!el.classList.contains('calendar__cell--out')) {

      if (prevActive !== null) { 
        if (prevActive.isEqualNode(el)) return; 
        prevActive.classList.remove('calendar__cell--today');
      }
      
      if (new Date(el.querySelector('div').getAttribute('data-date')) < date) return;
      el.classList.add('calendar__cell--today');

      el.querySelector('.calendar__cell-content').dispatchEvent(new Event('changeWD', {
        bubbles: true,
      }));      
    }
  });


  function formDate(date) {
    let tempoDate = date.getDate();
    let tempoMonth = date.getMonth() + 1;
    if (tempoMonth < 10) tempoMonth = '0' + tempoMonth;
    if (tempoDate < 10) tempoDate = '0' + tempoDate;  
    console.log(new Date(`${date.getFullYear()}-${tempoMonth}-${tempoDate}`))
    return `${date.getFullYear()}-${tempoMonth}-${tempoDate}`; 
  }

  //узнать текущий месяц и год
  //заполнить первую строку предыдущими датами (если есть)
  //продолжать заполнять, прибавляя день
  //заполнить последнюю строку следующими датами (если есть)

  //функция отображения дней принимает на вход месяц и год
  function renderMonth(year, month) {
      const mon = month - 1;//месяцы с 0 индекса
      let curDate = new Date(year, mon);
      
      const rows = calendar.querySelectorAll('tr');
      const firstRow = rows[1];
      const firstRowChildNodes = firstRow.children;

      let tmpDate = new Date(year, mon);
      let curDay = (curDate.getDay() === 0) ? (7) : (curDate.getDay());

      tmpDate.setDate(curDate.getDate() - curDay + 1);
      for (let i = 0; i < curDay - 1; i++) {
        firstRowChildNodes[i].querySelector('div').innerText = tmpDate.getDate();
        tmpDate.setDate(tmpDate.getDate() + 1);
        firstRowChildNodes[i].classList.add('calendar__cell--out');
      }

      $('.calendar__cell--today').removeClass('calendar__cell--today');

      for (let i = curDay - 1; i < 7; i++) {
          if (i >= 0) firstRowChildNodes[i].querySelector('div').innerText = curDate.getDate();
          if (i >= 0) firstRowChildNodes[i].querySelector('div').setAttribute('data-date', formDate(curDate));

          if (curDate.toDateString() === date.toDateString()) {
            firstRowChildNodes[i].classList.add('calendar__cell--today');
          }

          curDate.setDate(curDate.getDate() + 1);

          if (firstRowChildNodes[i].classList.contains('calendar__cell--out')) {
            firstRowChildNodes[i].classList.remove('calendar__cell--out');
          }
      }

      for (let j = 2; j < rows.length; j++) {
        const rowChildNodes = rows[j].children;
        for (let i = 0; i < 7; i++) {
          rowChildNodes[i].querySelector('div').innerText = curDate.getDate();
          if (curDate.getMonth() !== mon) {
            rowChildNodes[i].classList.add('calendar__cell--out');
          } else {
            rowChildNodes[i].querySelector('div').setAttribute('data-date', formDate(curDate));
            if (rowChildNodes[i].classList.contains('calendar__cell--out')) {
              rowChildNodes[i].classList.remove('calendar__cell--out');
            }
            if (curDate.toDateString() === date.toDateString()) {
              $(rowChildNodes[i]).addClass('calendar__cell--today');
            }
          }
          curDate.setDate(curDate.getDate() + 1);
        }
      }
  }

  // const date = new Date();
  let curMonth = date.getMonth() + 1;
  let curYear = date.getFullYear();

  const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];
  renderMonth(curYear, curMonth);

  const nextLink = calendar.querySelector('.calendar__control--next');
  const prevLink = calendar.querySelector('.calendar__control--prev');

  prevLink.addEventListener('click', (e) => {
    e.preventDefault();
    curMonth--;
    if (curMonth < 1) {
      curMonth = 12;
      curYear--;
    }
    const monthName = monthNames[curMonth - 1];
    renderMonth(curYear, curMonth);
    calendar.querySelector('.calendar__month').innerText =  `${monthName} ${curYear}`;
  });

  nextLink.addEventListener('click', (e) => {
    e.preventDefault();
    curMonth++;
    if (curMonth > 12) {
      curMonth = 1;
      curYear++;
    }
    const monthName = monthNames[curMonth - 1];
    renderMonth(curYear, curMonth);
    calendar.querySelector('.calendar__month').innerText =  `${monthName} ${curYear}`;
  });


}