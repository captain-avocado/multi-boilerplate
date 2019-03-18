// import $ from 'jquery';

export default function calendar() {
  $('.calendar__cell').on('click', (e) => {
    e.preventDefault();
    const el = e.currentTarget;
    const calendar = e.currentTarget.closest('.calendar');
    const prevActive = calendar.querySelector('.calendar__cell--today');
    if (!el.classList.contains('calendar__cell--out')) {
      if (prevActive !== null && !prevActive.isEqualNode(el)) {
        prevActive.classList.remove('calendar__cell--today');
      }
      el.classList.toggle('calendar__cell--today');
    }
  });
}