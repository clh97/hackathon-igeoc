const SPLASH_TIMEOUT = 1200;

let splash = document.createElement('div');
let splashImage = document.createElement('img');

let app_person = undefined;
let person_name = undefined;
let person_cpf = undefined;
let undiscovered_name = undefined;

configSplash();

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
  let formattedCpf = formataCPF(app_person.cpf).substr(3, app_person.cpf.length);
  $(cpf).inputmask('999' + formattedCpf, {"placeholder": "?"})

  let second_name = app_person
    .nome
    .split(/[ ]+/)[1];
  let count = second_name.length;
  if (second_name === 'de' || second_name === 'da' || second_name === 'do') {
    second_name = app_person
      .nome
      .split(/[ ]+/)[2];
  }

  let str_len = '';
  for (let index = 0; index < count; index++) {
    str_len += '*';
  }

  const surname = $('.content__surname')[0];
  $(surname).inputmask(person_name + ' ' + str_len, {
    "placeholder": "*",
    'translation': {
      '*': {
        pattern: /[a-z*]/
      }
    }
  })

}

function checkCode(code) {
  showLoading();

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://findebt.mybluemix.net/cliente',
    success: data => {
      let content = undefined;

      person = data.filter(p => p.codigo == code.replace(' ', ''))
      let codePromise = new Promise((resolve, reject) => {
        if (person.length == 1) {
          app_person = person[0];
          person_name = person[0]
            .nome
            .split(/[ ]+/)[0];
          configMasks();
          changeUsername(person_name);
          let formattedCpf = formataCPF(app_person.cpf).substr(3, app_person.cpf.length);
          $('.content__cpf')[0].setAttribute('placeholder', `???${formattedCpf}`);


          setTimeout(resolve, 1000, 'code');
        } else {
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
  $('.pt-page').each((i, e) => {
    if ($(e).hasClass('pt-page-current')) {
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

function formataCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function checkInformations(div) {
  showLoading();
  let inputs = [];
  $(div.children).each((i, e) => {
    if (e.localName === 'input') {
      inputs.push(e);
    }
  })

  const cpf = inputs[0].value;
  const surname = inputs[1].value;

  let newSurname = surname.replace(/[*]/g, "");
  let newCpf = cpf
    .replace('.', '')
    .replace('-', '');

  let infoPromise = new Promise((resolve, reject) => {
    console.log(app_person.nome.toLowerCase(), newSurname.toLowerCase())
    console.log(newCpf, app_person.cpf)
    if (newCpf == app_person.cpf & app_person.nome.toLowerCase().includes(newSurname.toLowerCase())) 
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
  if (window.location.pathname.indexOf('index.html')) 
    window.location = window.location.pathname.replace('index.html', 'dash.html');
  else 
    window.location = window.location.pathname + 'index.html';
  }

function errorMessage(msg) {
  alert(msg);
}

function changeUsername(name) {
  $('.content__presentation__hello')[0].innerHTML = $('.content__presentation__hello')[0]
    .innerHTML
    .replace('{{first-name}}', name);
}