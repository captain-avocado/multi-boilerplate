// const wdInputs = document.querySelectorAll('.wd-input');

// let wd = {};

// wdInputs.forEach(el => el.addEventListener('change', captureChanges));

// function captureChanges(e) {  
//   const el = e.target;

  

//   const type = el.getAttribute('data-wd-input-type');
//   const fieldId = el.getAttribute('data-wd-input-field');

//   let path = el.id;
//   let branchValue = el.value;



//   if (type !== undefined) {
//     switch (type) {
//       case 'directions': {
        
//         break;
//       }
//       case 'schedule': {

//         const calendar = document.querySelector(`#${fieldId}`);
//         const date = calendar.querySelector('.calendar__cell--today div').getAttribute('data-date');

//         const radioValue = calendar.querySelector('[name="wd-webinar-general_data-schedule-time_limited"]:checked').value;

//         const timezoneValue = calendar.querySelector('#wd-webinar-general_data-schedule-timezone').value;

//         const timeStartHour = calendar.querySelector('#time-start-hour').value;
//         const timeStartMin = calendar.querySelector('#time-start-min').value;

//         const timeLimited = (radioValue === 'webinar-time-limited');
//         const timeEndHour = (!timeLimited) ? (timeStartHour) : calendar.querySelector('#time-end-hour').value;
//         const timeEndMin = (!timeLimited) ? (timeStartMin) : calendar.querySelector('#time-end-min').value;

//         const timeStart = timeStartHour + ':' + timeStartMin + ':' +'00';
//         const timeEnd = timeEndHour + ':' + timeEndMin + ':' +'00';

//         const dateStringStart = `${date} ${timeStart} ${timezoneValue.substring(0, 10)}`;
//         const dateStringEnd = `${date} ${timeEnd} ${timezoneValue.substring(0, 10)}`;

//         console.log(dateStringStart)
//         console.log(dateStringEnd)
//         console.log(new Date(dateStringStart).getTime()/1000)
//         console.log(new Date(dateStringEnd).getTime()/1000)
        
//         // console.log(timezoneValue)
//         // console.log(radioValue)
//         // console.log(timeStart)
//         // console.log(timeEnd)

//         const  schedule = {
//           "time_limited": radioValue,
//           "time_start": new Date(dateStringStart).getTime()/1000,
//           "time_end": new Date(dateStringEnd).getTime()/1000,
//           "timezone": timezoneValue.substring(0, 10)
//         };

//         path = calendar.id;
//         branchValue = schedule;

//         break;
//       }
//     }
//   } else {
//   }


//   // let path 

  
//   let path = path.split('-');

//   let q = wd;

//   for (let i = 0; i < path.length; i++) {
//     if (q[path[i]] === undefined) {
//       if (i === path.length - 1) {
//         q[path[i]] = branchValue;
//       } else {
//         q[path[i]] = {};
//       }
//     }
//     q = q[path[i]];
//   }

//   q = branchValue;

//   console.log(wd)

// }

// document.addEventListener('changeWD',captureChanges);
// const timeInputs = document.querySelectorAll('.time-input__input');
// timeInputs.forEach(el => el.addEventListener('change', () => {
//   el.dispatchEvent(new Event('changeWD', {
//     bubbles: true,
//   }));
// }));


// const calendarCells = document.querySelectorAll('.calendar__cell-content');
// calendarCells.forEach(el => {
//   el.setAttribute('data-wd-input-field', 'wd-webinar-general_data-schedule');
//   el.setAttribute('data-wd-input-type', 'schedule');
//   // el.addEventListener('click', captureChanges);
// });



function Q(query){
  return document.querySelectorAll(query);
}

function q(query){
  return document.querySelector(query);
}



var wd = {};


function captureChanges(e) {
  let el = e.target;
  console.log(el);

  let input_type = el.hasAttribute('data-wd-input-type')?el.getAttribute('data-wd-input-type'):'default';
  let input_field = el.hasAttribute('data-wd-input-field')?el.getAttribute('data-wd-input-field'):el.id;
  let input_value = null;
  
  switch (input_type)
  {
    case 'directions':
      {

        break;
      }
    case 'schedule': {
      let schedule = read_calendarShedule( q('#' + input_field) );
      console.log(schedule);
      input_value = schedule;
      break;
    }
    
    default: input_value = el.value;
  }
  

  let path = input_field.split('-');
  let iter = wd;

  for (let i = 0; i < path.length; i++) {
    if (iter[path[i]] === undefined) {
      if (i === path.length - 1) {
        iter[path[i]] = input_value;
      } else {
        iter[path[i]] = {};
      }
    }
    iter = iter[path[i]];
  }

  iter = input_value;

  console.log(wd)

  // console.log(q);
}


function write_calendarShedule(calendar, calendar_el) {
  if (typeof calendar  !== 'object') return;

  //  1) найти нужный радио-инпут с искомым значением и чекнуть его
  calendar_el.querySelector(`[name="wd-webinar-general_data-schedule-time_limited"][value="${calendar.time_limited}"]`).checked = true;


  //  2) вычленить из строки день-месяц-год
  //     отрендерить нужную страницу календаря и выбрать день с искомым атрибутом
  const date = calendar.time_start.split(' ')[0];
  //?


  //  3) вычленить из каждой строки время
  //     присвоить значение инпутам
  const timeStart = calendar.time_start.split(' ')[1];
  const timeEnd = calendar.time_end.split(' ')[1];
  let tsh = calendar_el.querySelector('#time-start-hour');
  let tsm = calendar_el.querySelector('#time-start-min');
  let teh = calendar_el.querySelector('#time-end-hour');
  let tem = calendar_el.querySelector('#time-end-min');
  tsh.value = timeStart.split(':')[0];
  tsm.value = timeStart.split(':')[1];
  teh.value = timeEnd.split(':')[0];
  tem.value = timeEnd.split(':')[1];
  

  //  4) присвоить значение инпуту и добавить активную иконку в дропдаун

  calendar_el.querySelector('#wd-webinar-general_data-schedule-timezone').value = calendar.timezone;
  calendar_el.querySelector('.dropdown-input').querySelector(`[data-item="${calendar.timezone}"]`).querySelector('img').classList.add('dropdown-input__icon-active--is-active');

  // let date = calendar_el.querySelector('.calendar__cell--today div').getAttribute('data-date');
  



  // let timezoneValue = calendar_el.querySelector('#wd-webinar-general_data-schedule-timezone').value;
  // let timeLimited = (radioValue === 'webinar-time-limited');
  
  // let tsh = calendar_el.querySelector('#time-start-hour').value;
  // let tsm = calendar_el.querySelector('#time-start-min').value;
  // let teh = calendar_el.querySelector('#time-end-hour').value;
  // let tem = calendar_el.querySelector('#time-end-min').value;
  
}


document.querySelectorAll('.wd-input').forEach( (el) => {
  el.addEventListener('change', captureChanges);
});

document.addEventListener('changeWD', captureChanges);


let calendarCells = document.querySelectorAll('.calendar__cell-content');
calendarCells.forEach(function (el) {
  el.setAttribute('data-wd-input-field', 'wd-webinar-general_data-schedule');
  el.setAttribute('data-wd-input-type', 'schedule');
});

function read_calendarShedule(calendar_el)
{	
  let date = calendar_el.querySelector('.calendar__cell--today div').getAttribute('data-date');
  let radioValue = calendar_el.querySelector('[name="wd-webinar-general_data-schedule-time_limited"]:checked').value;
  let timezoneValue = calendar_el.querySelector('#wd-webinar-general_data-schedule-timezone').value;
  let timeLimited = (radioValue === 'webinar-time-limited');
  
  let tsh = calendar_el.querySelector('#time-start-hour').value;
  let tsm = calendar_el.querySelector('#time-start-min').value;
  let teh = calendar_el.querySelector('#time-end-hour').value;
  let tem = calendar_el.querySelector('#time-end-min').value;
  
  let timeStartHour = tsh?tsh:'00';
  let timeStartMin = tsm?tsm:'00';
  let timeEndHour = timeLimited? (teh?teh:'00') : timeStartHour;
  let timeEndMin = timeLimited? (tem?tem:'00') : timeStartMin;
  
  let timeStart = date + ' ' + timeStartHour + ':' + timeStartMin + ':' + '00';
  let timeEnd = date + ' ' + timeEndHour + ':' + timeEndMin + ':' + '00';

  let schedule = {
    time_limited: timeLimited,
    time_start: timeStart,
    time_end: timeEnd,
    timezone: timezoneValue
  };
  
  return schedule;
}