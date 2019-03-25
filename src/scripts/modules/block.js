export default function block() {
  const blocks = $('.panel-block');
  blocks.each((i, el) => {
    const closeLink = $(el).find('.panel__close-link');
    closeLink.on('click', (e) => {
      e.preventDefault();
      $(el).fadeOut(300);
    });
  })

  function moveBlock(col, block) {
    if (col.has(block).length) {
      block.fadeOut(300);
      return;
    }
    const clone = $(block).clone();
    $(block).remove();
    if ($(col).find('.add-block').length) {
      col.insertBefore(clone, $(col).find('.add-block'));
    } else {
      $(col).append(clone);
    }
  }

  const popupAdd = $('.popup--add');
  const addBlock = $('.add-block');
  addBlock.on('click', (e) => {
    e.preventDefault();
    popupAdd.addClass('popup--is-active');
  });


  function addByHeight(el) {
    const blockId = el.data('value');
    const block = $(`#${blockId}`);
    const cols = $('.panels__col--blocks');

    let heights = [];
    cols.each((i, el) => {
      
      let totalHeight = 0;
      $(el).children().each(function(){
          totalHeight = totalHeight + $(this).outerHeight(true);
      });
      heights.push(totalHeight);
    });

    const index = heights.indexOf(Math.min(...heights));
    // console.log(index)

    moveBlock(cols.eq(index), block);
  }

  const items = popupAdd.find('.add__item');
  items.each((i, element) => {
    const el = $(element);

    el.on('click', (e) => {
      const blockId = el.data('value');
      const block = $(`#${blockId}`);
      block.fadeIn(300);
      // addByHeight(el);
    });
  });


}