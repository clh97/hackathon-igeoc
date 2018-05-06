const SPLASH_TIMEOUT = 1200;

let splash = document.createElement('div');
let splashImage = document.createElement('img');

configSplash();
configMasks();

$('body').append(splash);

$('document').ready(() => {
  let splashPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, SPLASH_TIMEOUT, 'splash')
  }).then(() => {
    hideSplash();
  })
})

function configSplash() {
  $(splash).css('position', 'absolute');
  $(splash).css('width', '100vw');
  $(splash).css('height', '100vh');
  $(splash).css('left', '0');
  $(splash).css('top', '0');
  $(splash).css('background', 'var(--yellow-bg)');
  $(splash).css('z-index', '3');
  $(splash).css('transition', 'opacity 1s');

  $(splashImage).css('position', 'absolute');
  $(splashImage).css('width', '180px');
  $(splashImage).css('left', 'calc(50% - 90px)');
  $(splashImage).css('top', '50%');
  $(splashImage).css('transform', 'translateY(-50%)');
  $(splashImage).attr('src', './img/logo.svg');

  $(splash).append(splashImage);
}

function hideSplash() {
  let hideSplashPromise = new Promise((resolve, reject) => {
    $(splash).css('opacity', '0');
    setTimeout(resolve, 400, 'splashHide')
  }).then(() => {
    $(splash).css('display', 'none');
  })
}

function configMasks() {
  const code = $('.content__code')[0];
  $(code).inputmask('9999 9999', {"placeholder": "0"})

  const cpf = $('.content__cpf')[0];
  $(cpf).inputmask('999.123.456-78', {"placeholder": "*"})

  const surname = $('.content__surname')[0];
  $(surname).inputmask('Tuxu aaaaaaaaaaaa', {"placeholder": "*"})
}

function checkCode(code) {
  showLoading();
    let codePromise = new Promise((resolve, reject) => {
      if(code === "1111 1111")
        setTimeout(resolve, 1000, 'code');
        else {
          hideLoading();
          this.reject();
        }
      }).then(() => {
        changePage(1);
        hideLoading();
        fadePresentation();
      }).catch(() => {
        hideLoading();
        errorMessage('Código inválido.');
    })
}

function showLoading() {
  let loading = document.createElement('img');
  $(loading).css('position', 'absolute')
  $(loading).css('bottom', '42px')
  $(loading).css('max-width', '50px')
  $(loading).attr('src', 'img/loading.gif');
  $(loading).attr('id', 'loading-icon');
  //if($('.pt-page__container').hasClass)
  $('.pt-page').each( (i, e) => {
    if($(e).hasClass('pt-page-current')) {
      $(e.lastElementChild).append(loading);
    }
  })
}

function hideLoading() {
  $('#loading-icon').remove();
}

function fadePresentation() {
  let presentationPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'fade_presentation');
  }).then(() => {
    $('.content__presentation').css('opacity', '0');
    let remPresentationPromise = new Promise((resolve, reject) => {
      setTimeout(resolve, 500, 'rem_fade_presentation')
    }).then(() => {
      $('.content__presentation').remove();
    })
  })
}

function checkInformations(div) {
  showLoading();
    let inputs = [];
    $(div.children).each((i, e) => {
      if(e.localName === 'input') {
        inputs.push(e);
      }
    })

    const cpf = inputs[0].value;
    const surname = inputs[1].value;

    let newSurname = surname.replace(/[*]/g, "");

    let infoPromise = new Promise((resolve, reject) => {
      if(cpf == "111.123.456-78" & newSurname.toLowerCase() == "tuxu nery")
        setTimeout(resolve, 1000, 'informations');
        else {
          hideLoading();
          this.reject();
        }
      }).then(() => {
        changePage(2);
        hideLoading();
        fadePresentation();
      }).catch(() => {
        hideLoading();
        errorMessage('Informações inválidas.');
    })
}

function savePassword(password) {
  if(window.location.pathname.indexOf('index.html'))
    window.location = window.location.pathname.replace('index.html', 'dash.html');
  else
    window.location = window.location.pathname + 'index.html';
}

function errorMessage(msg) {
  alert(msg);
}

function cardHover(card) {

}