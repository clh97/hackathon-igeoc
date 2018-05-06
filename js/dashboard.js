$('.card').hover( e => {
  $(e.currentTarget.children[2]).toggleClass('card__options--shown');
  // if($(e.currentTarget).hasClass('card__options--shown')) {
  //   $(e.currentTarget).css('height', '260px');
  // } else {
  //   $(e.currentTarget).css('height', '200px');
  // }
})

$('.chatbot').click( () => {
  window.location = 'http://m.me/255165275027203';
})

$('.nav__menu').click( () => {
  $('.nav__items').toggleClass('nav__items--shown')
  $('.black-glass').toggleClass('black-glass--shown')
} )

$('.nav__items h2').click( e => {
  $(e.currentTarget.siblings).css('color', 'var(--cool-black)')
  $(e.currentTarget).css('color', 'var(--yellow-bg)')
})

$('.black-glass').click( () => {
  $('.nav__items').toggleClass('nav__items--shown')
  $('.black-glass').toggleClass('black-glass--shown')
} )