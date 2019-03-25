import mask from 'jquery-mask-plugin';

export default function masks() {
  $('.tel-mask').mask('+7 (000) 000-00-00', {
    placeholder: '+7 (___) ___-___-__',
    onComplete: function (cep, event, input) {
      input.attr('data-complete', 'true');
    },

    onChange: function (cep, event, input) {
      if (input.cleanVal().length < 10) {
        input.attr('data-complete', 'false');
      } else {
        input.attr('data-complete', 'true');
      }
    },

    showMaskOnFocus: false,
    showMaskOnHover: false,
  });


  $('.date-mask').mask('00.00.0000', {
    placeholder: '10.10.2000',
    onComplete: function (cep, event, input) {
      input.attr('data-complete', 'true');
    },

    onChange: function (cep, event, input) {
      if (input.cleanVal().length < 10) {
        input.attr('data-complete', 'false');
      } else {
        input.attr('data-complete', 'true');
      }
    },

    showMaskOnFocus: false,
    showMaskOnHover: false,
  });

  $('.passport-mask').mask('0000 000000', {
    placeholder: '---- ------',
    onComplete: function (cep, event, input) {
      input.attr('data-complete', 'true');
    },

    onChange: function (cep, event, input) {
      if (input.cleanVal().length < 10) {
        input.attr('data-complete', 'false');
      } else {
        input.attr('data-complete', 'true');
      }
    },

    showMaskOnFocus: false,
    showMaskOnHover: false,
  });

  $('.time-mask').mask('00', {
    placeholder: '00',
    onComplete: function (cep, event, input) {
      input.attr('data-complete', 'true');
    },

    onChange: function (cep, event, input) {
      if (input.cleanVal().length < 10) {
        input.attr('data-complete', 'false');
      } else {
        input.attr('data-complete', 'true');
      }
    },

    showMaskOnFocus: false,
    showMaskOnHover: false,
  });

}