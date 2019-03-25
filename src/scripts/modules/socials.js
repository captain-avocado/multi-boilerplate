export default function socials() {
  const socialsItem = $('.socials__item');
  socialsItem.each((i, element) => {
    const el = $(element);
    const input = el.find('input');
    const link = el.find('a');
    link.on('click', (e) => {
      e.preventDefault();
      input.val('');
    });
  });
}