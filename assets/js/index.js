/**
 * Created by fanzhang on 8/31/16.
 */
function moveTag(num) {
  $('.ui-feedback').hide();
  $('.tabText').removeClass('active');
  switch (num) {
    case 1: {
      $('#app-setup').show();
      $('.tabText.first').removeClass('disabled').addClass('active');
    }
      break;
    case 2: {
      $('#upload').show();
      $('.tabText.second').removeClass('disabled').addClass('active');
    }
      break;
    case 3: {
      $('#sharing').show();
      $('.tabText.third').removeClass('disabled').addClass('active');
    }
      break;
    case 4: {
      $('#automation').show();
      $('.tabText.forth').removeClass('disabled').addClass('active');
    }
  }
}

// step2
function changeCategoryText(num) {

  $('.categoryTitle').fadeOut(500);
  setTimeout(function () {
    $('.categoryTitle').hide()
  }, 500);

  switch (num) {
    case 1: {
      setTimeout(function () {
        $('#GATitle').fadeIn(500)
      }, 500)
    }
      break;
    case 2: {
      setTimeout(function () {
        $('#ECTitle').fadeIn(500)
      }, 500)
    }
      break;
    case 3: {
      setTimeout(function () {
        $('#CNN').fadeIn(500)
      }, 500)
    }
      break;
  }
}

function gotoTest(num) {
  var height = 28;
  $('.iconfortest' + num + ' .fa').removeClass('invisible').css('opacity', '1.0');
  $('.testMessageWindow').animate({ scrollTop: height * (num - 1) == 0 ? '' : height * (num - 1) + "px" }, 1000);
  var target = $('.iconfortest' + (num - 1 ) + ' .fa');
  target.removeClass('fa-spin').removeClass('fa-refresh');
  var seed = Math.floor((Math.random() * 10) % 2);
  if (seed === 0) {
    target.addClass('fa-check')
  } else if (seed === 1) {
    target.addClass('fa-times')
  } else {
    target.addClass('fa-question')
  }
}

function detailedSteps(array) {
  var arr = array == undefined ? [
    'Find Login Buttion',
    'Username and password login',
    'Find Shopping List',
    'Click add to cart',
    'Finding Shopping Cart',
    'Click Shopping Cart',
    'Finish Up'
  ] : array;

  var totalLength = arr.length;
  var testDetail = 1;
  var itervalTestDetail1 = setInterval(function () {
    if (testDetail < totalLength + 1) {
      $('.QAStepsDetail').html(arr[testDetail++ - 1])
    } else {
      // finished all stuff...
      clearInterval(itervalTestDetail1);
    }
  }, randomSec(1));
}

function detailedSteps2(array, ind) {
  var arr = array == undefined ? [
    'Find Login Buttion',
    'Username and password login',
    'Find Shopping List',
    'Click add to cart',
    'Finding Shopping Cart',
    'Click Shopping Cart',
    'Finish Up'
  ] : array;

  var totalLength = arr.length;
  var testDetail = 1;
  var itervalTestDetail1 = setInterval(function () {
    if (testDetail < totalLength + 1) {
      $('.QAStepsDetail').html(arr[testDetail++ - 1])
    } else {
      // finished all stuff...
      clearInterval(itervalTestDetail1);
      setTimeout(function () {
        testRun2(ind)
      }, 3000)
    }
  }, randomSec(1));
}

function gotoScreen(num) {
  var height = 28;
  $($('.screenDetectionItem')[num-1]).animate({'opacity':'1'},600)
  $('.iconforscreen' + num + ' .fa').removeClass('invisible').animate({'opacity': '1.0'});
  $('.screenDetectionWindow').animate({ scrollTop: height * (num - 1) == 0 ? '' : height * (num - 1) + "px" }, 1000);
  var target = $('.iconforscreen' + (num - 1 ) + ' .fa');
  target.removeClass('fa-spin').removeClass('fa-refresh');
  // Math.floor((Math.random() * 10) % 2) === 0 ? target.addClass('fa-check') : target.addClass('fa-times');
  target.addClass('fa-check')
}

function testRun() {
  var testCase = 1;
  var totalLength = $('.testMessageWindow').children().length;
  gotoTest(testCase++)
  detailedSteps();
  var itervalTest = setInterval(function () {
    if (testCase < totalLength + 1) {
      detailedSteps();
      gotoTest(testCase++)
    } else {
      // finished all stuff...
      clearInterval(itervalTest);
      $('.iconfortest' + totalLength + ' .fa').removeClass('fa-spin').removeClass('fa-refresh').addClass('fa-check');
      $('.testQAText').html('AI Predefined Tests Finished')
      $('.app-profiling-status').html('<i class="fa fa-check"></i>Your app finished profiling!')
      $('.nextPageBtn').animate({ 'opacity': '1.0' }, 500)
    }
  }, randomSec(10));
}

function testRun2(ind) {
  gotoTest(ind)
  if (ind == ($('.testMessageWindow').children().length + 1 )) {
    var totalLength = $('.testMessageWindow').children().length;
    $('.iconfortest' + totalLength + ' .fa').removeClass('fa-spin').removeClass('fa-refresh').addClass('fa-check');
    $('.testQAText').html('AI Predefined Tests Finished');
    $('.app-profiling-status').html('<i class="fa fa-check"></i>Your app finished profiling!');
    $('.nextPageBtn').animate({ 'opacity': '1.0' }, 500);
  } else {
    detailedSteps2(screenArray, ++ind);
  }
}

function screenRun() {
  var testCaseSC = 1;
  var totalLength = $('.screenDetectionWindow h6').length;
  gotoScreen(testCaseSC++)
  var itervalScreen = setInterval(function () {
    if (testCaseSC < totalLength + 1) {
      gotoScreen(testCaseSC++)
    } else {
      // finished all stuff...
      clearInterval(itervalScreen);
      $('.iconforscreen' + totalLength + ' .fa').removeClass('fa-spin').removeClass('fa-refresh').addClass('fa-times');
      $('.screenQAText').html('AI Predefined Screens Detection Finished')
      $('.detailedTestCaseCard').animate({ 'opacity': '1.0' }, 500)
      testRun2(1);
      $('.ndBotLeftBig').animate({ 'height': '300px' }, 800);
      $('.stepDetailWrap').animate({ 'opacity': '1' }, 800);
    }
  }, randomSec(1));
}

function jumpToMap() {
  var win = window.open('map.html', '_blank');
  win.focus();
}

function addScreens(row, col, url) {
  var tR = $('#tr' + row);
  if (!tR) {
    $('#mapContainer').appendChild('<div class="row" id="tr' + row + '"></div>')
  } else {
    while (--col > 0) {
      tR.append('<div class="spaceMap"></div>')
    }
    tR.append('<img src="img/app/Ecommerce_02.jpg" class="screenMap" />')
  }
}

function randomSec(sec) {
  return Math.floor((Math.random() * 10) % sec + 1) * 1000
}

function showScreenDetectionSteps(index) {
  if (index == 8) return;
  var screensStepSC = 1;
  $('.userFlorWrap#tr' + index).fadeIn();
  var parent = $('.userFlorWrap#tr' + index);
  var totalLength = parent.children().length - 3;
  showScreen(screensStepSC++, parent);
  var itervalScreenShow = setInterval(function () {
    if (screensStepSC < totalLength + 1) {
      showScreen(screensStepSC++, parent)
    } else {
      clearInterval(itervalScreenShow);
      setTimeout(function () {
        $(parent.children('.imageWrapSpiner')).fadeOut();
        setTimeout(function () {
          $(parent.children('h6')).fadeIn();
          setTimeout(function () {
            showScreenDetectionSteps(index + 1)
          }, 600);
        }, 800);
      }, 1000);

    }
  }, randomSec(1));
}

function showScreen(num, parent) {
  $(parent.children('.imageWrap')[num - 1]).fadeIn()
}

var screenArray = [
  'Find Login Buttion',
  'Username and password login',
  'Find Shopping List',
  'Click add to cart',
  'Finding Shopping Cart',
  'Click Shopping Cart',
  'Finish Up'
]


function changeImage(num,cardNum) {
  switch (num) {
    case -1: {
      $('.androidBG .screens').css({ 'background': 'url("img/app/black.jpg") center center no-repeat' })
    }
      break;
    case 0: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2cart1.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/list.jpg") center center no-repeat' })
    }
      break;
    case 1: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2ship1.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/list1.jpg") center center no-repeat' })
    }
      break;
    case 2: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2billing1.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/detail1.jpg") center center no-repeat' })
    }
      break;
    case 3: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2billing2.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/detail2.jpg") center center no-repeat' })
    }
      break;
    case 4: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2addNew1.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart2.jpg") center center no-repeat' })
    }
      break;
    case 5: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2card2.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart5.jpg") center center no-repeat' })
    }
      break;
    case 6: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2card3.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart3.jpg") center center no-repeat' })
    }
      break;
    case 7: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2card4.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart1.jpg") center center no-repeat' })
    }
      break;
    case 8: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2card5.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cartD1.jpg") center center no-repeat' })
    }
      break;
    case 9: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2err1.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart.jpg") center center no-repeat' })
    }
      break;
    case 10: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2err2.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart6.jpg") center center no-repeat' })
    }
      break;
    case 11: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2err2.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart4.jpg") center center no-repeat' })
    }
      break;
    case 12: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2err2.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/list2.jpg") center center no-repeat' })
    }
      break;
    case 13: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2err2.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart.jpg") center center no-repeat' })
    }
      break;
    case 14: {
      if(cardNum==2) $('.androidBG .screens').css({ 'background': 'url("img/app/2err2.jpg") center center no-repeat' })
      else $('.androidBG .screens').css({ 'background': 'url("img/app/cart6.jpg") center center no-repeat' })
    }
      break;
  }
}
