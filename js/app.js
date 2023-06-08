






var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;


//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}


//Menu
let iconMenu = document.querySelector(".menu__icon");
let menulist = document.querySelector(".menu__list");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu__body");

function clickOff(event) {
  console.log(event);
  iconMenu.classList.remove("_active");
  menuBody.classList.remove("_active");
  html.classList.remove("lock");
}

if (iconMenu) {
   iconMenu.addEventListener("click", function () {
      iconMenu.classList.toggle("_active");
      html.classList.toggle("lock");
      menuBody.classList.toggle("_active");
   });
   menulist.addEventListener("mouseup", clickOff );

document.addEventListener('click', function (e) {
  var target = e.target;
  var its_menu = target == menuBody || menuBody.contains(target);
  var its_iconMenu = target == iconMenu || iconMenu.contains(target);
  var menu_is_active = menuBody.classList.contains('_active');

  if (!its_menu && !its_iconMenu && menu_is_active) {
    clickOff();
  }
});
}

// Ð’ÑÐ¿Ð¾Ð¼Ð¾Ð³Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ð¼Ð¾Ð´ÑƒÐ»Ð¸ Ð¿Ð»Ð°Ð²Ð½Ð¾Ð³Ð¾ Ñ€Ð°ÑÑÐºÑ€Ñ‹Ñ‚Ð¸Ñ Ð¸ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ñ Ð¾Ð±ÑŠÐµÐºÑ‚Ð° ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Ð¡Ð¾Ð·Ð´Ð°ÐµÐ¼ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ðµ 
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Ð¡Ð¾Ð·Ð´Ð°ÐµÐ¼ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ðµ 
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
// Ð’ÑÐ¿Ð¾Ð¼Ð¾Ð³Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ðµ Ð¼Ð¾Ð´ÑƒÐ»Ð¸ Ð±Ð»Ð¾ÐºÐ¸Ñ€Ð¾Ð²ÐºÐ¸ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ¸ Ð¸ ÑÐºÐ¾Ñ‡ÐºÐ° ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 500) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}


//================================================================================================================================================================================================================================================================================================================
// ÐŸÑ€Ð¾Ñ‡Ð¸Ðµ Ð¿Ð¾Ð»ÐµÐ·Ð½Ñ‹Ðµ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¸ ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ñ…ÐµÑˆÐ° Ð² Ð°Ð´Ñ€ÐµÑÐµ ÑÐ°Ð¹Ñ‚Ð°
function getHash() {
	if (location.hash) { return location.hash.replace('#', ''); }
}

// FLS (Full Logging System)
function FLS(message) {
	setTimeout(() => {
		if (window.FLS) {
			console.log(message);
		}
	}, 0);
}
// ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ñ†Ð¸Ñ„Ñ€Ñ‹ Ð¸Ð· ÑÑ‚Ñ€Ð¾ÐºÐ¸
function getDigFromString(item) {
	return parseInt(item.replace(/[^\d]/g, ''))
}
// Ð¤Ð¾Ñ€Ð¼Ð°Ñ‚Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ Ñ†Ð¸Ñ„Ñ€ Ñ‚Ð¸Ð¿Ð° 100 000 000
function getDigFormat(item) {
	return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
}
// Ð£Ð±Ñ€Ð°Ñ‚ÑŒ ÐºÐ»Ð°ÑÑ Ð¸Ð· Ð²ÑÐµÑ… ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð² Ð¼Ð°ÑÑÐ¸Ð²Ð°
function removeClasses(array, className) {
	for (var i = 0; i < array.length; i++) {
		array[i].classList.remove(className);
	}
}
// Ð£Ð½Ð¸ÐºÐ°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ Ð¼Ð°ÑÑÐ¸Ð²Ð°
function uniqArray(array) {
	return array.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}
// Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð¿Ð¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ñ Ð¸Ð½Ð´ÐµÐºÑÐ° Ð²Ð½ÑƒÑ‚Ñ€Ð¸ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ
function indexInParent(parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};
// ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚Ð° Ð¼ÐµÐ´Ð¸Ð° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¾Ð² Ð¸Ð· Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ð¾Ð² 
function dataMediaQueries(array, dataSetValue) {
	// ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð¾Ð±ÑŠÐµÐºÑ‚Ð¾Ð² Ñ Ð¼ÐµÐ´Ð¸Ð° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°Ð¼Ð¸
	const media = Array.from(array).filter(function (item, index, self) {
		if (item.dataset[dataSetValue]) {
			return item.dataset[dataSetValue].split(",")[0];
		}
	});
	// Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ Ð¾Ð±ÑŠÐµÐºÑ‚Ð¾Ð² Ñ Ð¼ÐµÐ´Ð¸Ð° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°Ð¼Ð¸
	if (media.length) {
		const breakpointsArray = [];
		media.forEach(item => {
			const params = item.dataset[dataSetValue];
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ ÑƒÐ½Ð¸ÐºÐ°Ð»ÑŒÐ½Ñ‹Ðµ Ð±Ñ€ÐµÐ¹ÐºÐ¿Ð¾Ð¸Ð½Ñ‚Ñ‹
		let mdQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mdQueries = uniqArray(mdQueries);
		const mdQueriesArray = [];

		if (mdQueries.length) {
			// Ð Ð°Ð±Ð¾Ñ‚Ð°ÐµÐ¼ Ñ ÐºÐ°Ð¶Ð´Ñ‹Ð¼ Ð±Ñ€ÐµÐ¹ÐºÐ¿Ð¾Ð¸Ð½Ñ‚Ð¾Ð¼
			mdQueries.forEach(breakpoint => {
				const paramsArray = breakpoint.split(",");
				const mediaBreakpoint = paramsArray[1];
				const mediaType = paramsArray[2];
				const matchMedia = window.matchMedia(paramsArray[0]);
				// ÐžÐ±ÑŠÐµÐºÑ‚Ñ‹ Ñ Ð½ÑƒÐ¶Ð½Ñ‹Ð¼Ð¸ ÑƒÑÐ»Ð¾Ð²Ð¸ÑÐ¼Ð¸
				const itemsArray = breakpointsArray.filter(function (item) {
					if (item.value === mediaBreakpoint && item.type === mediaType) {
						return true;
					}
				});
				mdQueriesArray.push({
					itemsArray,
					matchMedia
				})
			});
			return mdQueriesArray;
		}
	}
}
//================================================================================================================================================================================================================================================================================================================
//===Dropdown Block================================================================================================================================

/*
ÐºÐ»Ð°ÑÑÑ‹ Ð´Ð»Ñ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÐµÐ½Ð¸Ñ ÐµÐ³Ð¾ Ñ‚Ð¸Ð¿Ð°
block-click-on      - Ð¿Ð¾ ÐºÐ»Ð¸ÐºÑƒ Ð½Ð° Ð½Ñ‘Ð¼ Ñƒ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑŒÑÐºÐ¾Ð³Ð¾ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð° Ð½Ð°Ð·Ð½Ð°Ñ‡Ð¸Ñ‚ÑÑ _active
block-click-off     - Ð¿Ð¾ ÐºÐ»Ð¸ÐºÑƒ Ð½Ð° Ð½Ñ‘Ð¼ Ñƒ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑŒÑÐºÐ¾Ð³Ð¾ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð° ÑÐ½Ð¸Ð¼ÐµÑ‚ÑÑ _active
block-click-toggle  - Ð¿Ð¾ ÐºÐ»Ð¸ÐºÑƒ Ð½Ð° Ð½Ñ‘Ð¼ Ñƒ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑŒÑÐºÐ¾Ð³Ð¾ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð° Ð¸Ð½Ð²ÐµÑ€Ñ‚Ð¸Ñ€ÑƒÐµÑ‚ÑÑ _active

block-click-lock    - Ð±Ð»Ð¾ÐºÐ¸Ñ€ÑƒÐµÑ‚ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÑƒ

Ð•ÑÐ»Ð¸ Ð¿Ñ€Ð¾ÑÑ‚Ð¾ Ð´Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ block-click-toggle, Ñ‚Ð¾ _active Ð´Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑÑ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑŽ

<div class="block-click-toggle" data-target-el='target-4'></div>
ÐºÐ»Ð°ÑÑ target-4 - ÐºÐ¾Ð¼Ñƒ Ð½ÑƒÐ¶ÐµÐ½ _active

Ð¢Ð°Ðº Ð¶Ðµ ÑÐºÑ€Ð¸Ð¿Ñ‚ Ð¼ÐµÐ½ÑÐµÑ‚ input type Ñ text Ð½Ð° password (ÐºÐ¾Ð³Ð´Ð° Ð½ÑƒÐ¶ÐµÐ½ Ð³Ð»Ð°Ð· Ð¿Ñ€Ð¸ Ð²Ð²Ð¾Ð´Ðµ Ð¿Ð°Ñ€Ð¾Ð»Ñ)
*/

clicksOn  = document.getElementsByClassName('block-click-on')
clicksOff = document.getElementsByClassName('block-click-off')
clicksToggle = document.getElementsByClassName('block-click-toggle')
var alltargets = [];
var touched = 0;
var target;

if (clicksOn)
  for (key in clicksOn) {
    if (!isNaN(key) && clicksOn[key]) {

        //console.log(clicksOn[key], key);
        let targetName = clicksOn[key].dataset['targetEl'];
        
        let el
        if (!targetName) el = clicksToggle[key].parentElement
          else 
           el = document.getElementsByClassName(targetName)[0];


        if (el) {
         //if (alltargets.indexOf(targetName) == -1) alltargets[alltargets.length] = targetName;
         alltargets[alltargets.length] = el; // !

         clicksOn[key].addEventListener('click', (e) => { 
           setActive(el, 1, e.currentTarget); 
           e.stopPropagation; 
           e.preventDefault; 
           touched = 1;

           target = e.currentTarget.className;
         }, false); 
       }
     }
   }


   if (clicksToggle)
    for (key in clicksToggle) {
      if (!isNaN(key) && clicksToggle[key]) {

        //console.log(clicksOn[key], key);
        let targetName = clicksToggle[key].dataset['targetEl'];
        

        let el
        if (!targetName) 
           el = clicksToggle[key].parentElement
          else 
           el = document.getElementsByClassName(targetName)[0];


        if (el) {
//         if (alltargets.indexOf(targetName) == -1) alltargets[alltargets.length] = targetName;
         alltargets[alltargets.length] = el; // !

         clicksToggle[key].addEventListener('click', (e) => { 
           setActive(el, 2, e.currentTarget); 
           touched = 1;
           target = e.currentTarget.className;

           if (e.currentTarget.classList.contains('popup-login-form__eye')) {
             if (e.currentTarget.classList.contains('_active'))
              e.currentTarget.previousElementSibling.type = 'text'
            else
              e.currentTarget.previousElementSibling.type = 'password' 

          }
           //
         }, false); 
       }
     }
   }


 function setActive(el, state, target) {

   if (state == 1) {
      el.classList.add('_active')
   }
   if (state == 0) {
      el.classList.remove('_active');
   }
   if (state == 2) {
      el.classList.toggle('_active');
   }

   let lock

   if (target) 
       lock = (target.classList.contains('block-click-lock')) ? 1:0
      else
       lock = 0;

   if (el.classList.contains('_active')) {
      if (lock) 
         document.body.classList.add('_lock')
   } else {
      if (lock) 
         document.body.classList.remove('_lock')
   }

   return el.classList.contains('_active')

 }



 if (clicksOff)
  for (key in clicksOff) {
    if (!isNaN(key) && clicksOff[key]) {

        //console.log(clicksOff[key], key);
        let targetName = clicksOff[key].dataset['targetEl'];
        
        let el
        if (!targetName) el = clicksToggle[key].parentElement
          else 
           el = document.getElementsByClassName(targetName)[0];

        if (el) {
         alltargets[alltargets.length] = el; // !
         clicksOff[key].addEventListener('click', (e) => {
           setActive(el, 0, e.currentTarget);

           touched = 1;
           target = e.currentTarget.className;
         }, false); 
       }
     }
   }


   document.addEventListener( 'click', (e) => {

     let withinBoundaries;
     if (/*!touched && */target != e.currentTarget.className) {
       for (key in alltargets) {
         if (!isNaN(key) && alltargets[key]) {
          // el = document.getElementsByClassName(alltargets[key])[0];

          withinBoundaries = e.composedPath().includes(alltargets[key]);
          if ( ! withinBoundaries ) {
           setActive(alltargets[key], 0)
         }
       }
     }
   }
   touched = 0;
 })

// ÐœÐ¾Ð´ÑƒÑŒ Ñ€Ð°Ð±Ð¾Ñ‚Ñ‹ Ñ Ñ‚Ð°Ð±Ð°Ð¼Ð¸ =======================================================================================================================================================================================================================
/*
Ð”Ð»Ñ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ Ñ‚Ð°Ð±Ð¾Ð² Ð¿Ð¸ÑˆÐµÐ¼ Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚ data-tabs
Ð”Ð»Ñ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ Ð·Ð°Ð³Ð¾Ð»Ð¾Ð²ÐºÐ¾Ð² Ñ‚Ð°Ð±Ð¾Ð² Ð¿Ð¸ÑˆÐµÐ¼ Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚ data-tabs-titles
Ð”Ð»Ñ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ Ð±Ð»Ð¾ÐºÐ¾Ð² Ñ‚Ð°Ð±Ð¾Ð² Ð¿Ð¸ÑˆÐµÐ¼ Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚ data-tabs-body
Ð”Ð»Ñ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ Ð±Ð»Ð¾ÐºÐ¾Ð² Ñ‚Ð°Ð±Ð¾Ð² Ð¼Ð¾Ð¶Ð½Ð¾ ÑƒÐºÐ°Ð·Ð°Ñ‚ÑŒ data-tabs-hash, ÑÑ‚Ð¾ Ð²Ñ‚ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ Ñ…ÐµÑˆÐ°

Ð•ÑÐ»Ð¸ Ð½ÑƒÐ¶Ð½Ð¾ Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ñ‚Ð°Ð±Ñ‹ Ð¾Ñ‚ÐºÑ€Ñ‹Ð²Ð°Ð»Ð¸ÑÑŒ Ñ Ð°Ð½Ð¸Ð¼Ð°Ñ†Ð¸ÐµÐ¹ 
Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ Ðº data-tabs data-tabs-animate
ÐŸÐ¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ, ÑÐºÐ¾Ñ€Ð¾ÑÑ‚ÑŒ Ð°Ð½Ð¸Ð¼Ð°Ñ†Ð¸Ð¸ 500ms, 
ÑƒÐºÐ°Ð·Ð°Ñ‚ÑŒ ÑÐ²Ð¾ÑŽ ÑÐºÐ¾Ñ€Ð¾ÑÑ‚ÑŒ Ð¼Ð¾Ð¶Ð½Ð¾ Ñ‚Ð°Ðº: data-tabs-animate="1000"

Ð•ÑÐ»Ð¸ Ð½ÑƒÐ¶Ð½Ð¾ Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ñ‚Ð°Ð±Ñ‹ Ð¿Ñ€ÐµÐ²Ñ€Ð°Ñ‰Ð°Ð»Ð¸ÑÑŒ Ð² "ÑÐ¿Ð¾Ð¹Ð»ÐµÑ€Ñ‹", Ð½Ð° Ð½ÐµÐºÐ¾Ð¼ Ñ€Ð°Ð·Ð¼ÐµÑ€Ðµ ÑÐºÑ€Ð°Ð½Ð¾Ð², Ð¿Ð¸ÑˆÐµÐ¼ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€Ñ‹ ÑˆÐ¸Ñ€Ð¸Ð½Ñ‹.
ÐÐ°Ð¿Ñ€Ð¸Ð¼ÐµÑ€: data-tabs="992" - Ñ‚Ð°Ð±Ñ‹ Ð±ÑƒÐ´ÑƒÑ‚ Ð¿Ñ€ÐµÐ²Ñ€Ð°Ñ‰Ð°Ñ‚ÑŒÑÑ Ð² ÑÐ¿Ð¾Ð¹Ð»ÐµÑ€Ñ‹ Ð½Ð° ÑÐºÑ€Ð°Ð½Ð°Ñ… Ð¼ÐµÐ½ÑŒÑˆÐµ Ð¸Ð»Ð¸ Ñ€Ð°Ð²Ð½Ð¾ 992px
*/
function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]');
	let tabsActiveHash = [];

	if (tabs.length > 0) {
		const hash = getHash();
		if (hash && hash.startsWith('tab-')) {
			tabsActiveHash = hash.replace('tab-', '').split('-');
		}
		tabs.forEach((tabsBlock, index) => {
			tabsBlock.classList.add('_tab-init');
			tabsBlock.setAttribute('data-tabs-index', index);
			tabsBlock.addEventListener("click", setTabsAction);
			initTabs(tabsBlock);
		});

		// ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ ÑÐ»Ð¾Ð¹Ð»ÐµÑ€Ð¾Ð² Ñ Ð¼ÐµÐ´Ð¸Ð° Ð·Ð°Ð¿Ñ€Ð¾ÑÐ°Ð¼Ð¸
		let mdQueriesArray = dataMediaQueries(tabs, "tabs");
		if (mdQueriesArray && mdQueriesArray.length) {
			mdQueriesArray.forEach(mdQueriesItem => {
				// Ð¡Ð¾Ð±Ñ‹Ñ‚Ð¸Ðµ
				mdQueriesItem.matchMedia.addEventListener("change", function () {
					setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
				});
				setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
			});
		}
	}
	// Ð£ÑÑ‚Ð°Ð½Ð¾Ð²ÐºÐ° Ð¿Ð¾Ð·Ð¸Ñ†Ð¸Ð¹ Ð·Ð°Ð³Ð¾Ð»Ð¾Ð²ÐºÐ¾Ð²
	function setTitlePosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item;
			let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
			let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
			let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
			let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
			tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
			tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
			tabsContentItems.forEach((tabsContentItem, index) => {
				if (matchMedia.matches) {
					tabsContent.append(tabsTitleItems[index]);
					tabsContent.append(tabsContentItem);
					tabsMediaItem.classList.add('_tab-spoller');
				} else {
					tabsTitles.append(tabsTitleItems[index]);
					tabsMediaItem.classList.remove('_tab-spoller');
				}
			});
		});
	}
	// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚Ð¾Ð¼
	function initTabs(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

		if (tabsActiveHashBlock) {
			const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
			tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
		}
		if (tabsContent.length) {
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsContent.forEach((tabsContentItem, index) => {
				tabsTitles[index].setAttribute('data-tabs-title', '');
				tabsContentItem.setAttribute('data-tabs-item', '');

				if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
					tabsTitles[index].classList.add('_tab-active');
				}
				tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
			});
		}
	}
	function setTabsStatus(tabsBlock) {
		let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
		let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
			}
		}
		const tabsBlockAnimate = isTabsAnamate(tabsBlock);
		if (tabsContent.length > 0) {
			const isHash = tabsBlock.hasAttribute('data-tabs-hash');
			tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
			tabsContent.forEach((tabsContentItem, index) => {
				if (tabsTitles[index].classList.contains('_tab-active')) {
					if (tabsBlockAnimate) {
						_slideDown(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = false;
					}
					if (isHash && !tabsContentItem.closest('.popup')) {
						setHash(`tab-${tabsBlockIndex}-${index}`);
					}
				} else {
					if (tabsBlockAnimate) {
						_slideUp(tabsContentItem, tabsBlockAnimate);
					} else {
						tabsContentItem.hidden = true;
					}
				}
			});
		}
	}
	function setTabsAction(e) {
		const el = e.target;
		if (el.closest('[data-tabs-title]')) {
			const tabTitle = el.closest('[data-tabs-title]');
			const tabsBlock = tabTitle.closest('[data-tabs]');
			if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
				let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
				tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
				tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
				tabTitle.classList.add('_tab-active');
				setTabsStatus(tabsBlock);
			}
			e.preventDefault();
		}
	}
}

tabs();
let addWindowScrollEvent = false;
//====================================================================================================================================================================================================================================================================================================
// ÐŸÐ»Ð°Ð²Ð½Ð°Ñ Ð½Ð°Ð²Ð¸Ð³Ð°Ñ†Ð¸Ñ Ð¿Ð¾ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ
function pageNavigation() {
	// data-goto - ÑƒÐºÐ°Ð·Ð°Ñ‚ÑŒ ID Ð±Ð»Ð¾ÐºÐ°
	// data-goto-header - ÑƒÑ‡Ð¸Ñ‚Ñ‹Ð²Ð°Ñ‚ÑŒ header
	// data-goto-top - Ð½ÐµÐ´Ð¾ÐºÑ€ÑƒÑ‚Ð¸Ñ‚ÑŒ Ð½Ð° ÑƒÐºÐ°Ð·Ð°Ð½Ð½Ñ‹Ð¹ Ñ€Ð°Ð·Ð¼ÐµÑ€
	// data-goto-speed - ÑÐºÐ¾Ñ€Ð¾ÑÑ‚ÑŒ (Ñ‚Ð¾Ð»ÑŒÐºÐ¾ ÐµÑÐ»Ð¸ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÑ‚ÑÑ Ð´Ð¾Ð¿ Ð¿Ð»Ð°Ð³Ð¸Ð½)
	// Ð Ð°Ð±Ð¾Ñ‚Ð°ÐµÐ¼ Ð¿Ñ€Ð¸ ÐºÐ»Ð¸ÐºÐµ Ð½Ð° Ð¿ÑƒÐ½ÐºÑ‚
	document.addEventListener("click", pageNavigationAction);
	// Ð•ÑÐ»Ð¸ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½ scrollWatcher, Ð¿Ð¾Ð´ÑÐ²ÐµÑ‡Ð¸Ð²Ð°ÐµÐ¼ Ñ‚ÐµÐºÑƒÑ‰Ð¸Ð¹ Ð¿ÑƒÐºÑ‚ Ð¼ÐµÐ½ÑŽ
	document.addEventListener("watcherCallback", pageNavigationAction);
	// ÐžÑÐ½Ð¾Ð²Ð½Ð°Ñ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ
	function pageNavigationAction(e) {
		if (e.type === "click") {
			const targetElement = e.target;
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]');
				const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : '';
				const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false;
				const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
				const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
				gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
				e.preventDefault();
			}
		} else if (e.type === "watcherCallback" && e.detail) {
			const entry = e.detail.entry;
			const targetElement = entry.target;
			// ÐžÐ±Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ° Ð¿ÑƒÐ½ÐºÑ‚Ð¾Ð² Ð½Ð°Ð²Ð¸Ð³Ð°Ñ†Ð¸Ð¸, ÐµÑÐ»Ð¸ ÑƒÐºÐ°Ð·Ð°Ð½Ð¾ Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ðµ navigator Ð¿Ð¾Ð´ÑÐ²ÐµÑ‡Ð¸Ð²Ð°ÐµÐ¼ Ñ‚ÐµÐºÑƒÑ‰Ð¸Ð¹ Ð¿ÑƒÐºÑ‚ Ð¼ÐµÐ½ÑŽ
			if (targetElement.dataset.watch === 'navigator') {
				const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`);
				let navigatorCurrentItem;
				if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
					navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`);
				} else if (targetElement.classList.length) {
					for (let index = 0; index < targetElement.classList.length; index++) {
						const element = targetElement.classList[index];
						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
							break;
						}
					}
				}
				if (entry.isIntersecting) {
					// Ð’Ð¸Ð´Ð¸Ð¼ Ð¾Ð±ÑŠÐµÐºÑ‚
					// navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
					navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null;
				} else {
					// ÐÐµ Ð²Ð¸Ð´Ð¸Ð¼ Ð¾Ð±ÑŠÐµÐºÑ‚
					navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null;
				}
			}
		}
	}
	// ÐŸÑ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ° Ð¿Ð¾ Ñ…ÐµÑˆÑƒ
	if (getHash()) {
		let goToHash;
		if (document.querySelector(`#${getHash()}`)) {
			goToHash = `#${getHash()}`;
		} else if (document.querySelector(`.${getHash()}`)) {
			goToHash = `.${getHash()}`;
		}
		goToHash ? gotoBlock(goToHash, true, 500, -100) : null;
	}
}
// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ ÑˆÐ°Ð¿ÐºÐ¾Ð¹ Ð¿Ñ€Ð¸ ÑÐºÑ€Ð¾Ð»Ðµ
function headerScroll() {
	addWindowScrollEvent = true;
	const header = document.querySelector('header.header');
	const headerShow = header.hasAttribute('data-scroll-show');
	const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
	const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
	let scrollDirection = 0;
	let timer;
	document.addEventListener("windowScroll", function (e) {
		const scrollTop = window.scrollY;
		clearTimeout(timer);
		if (scrollTop >= startPoint) {
			!header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
			if (headerShow) {
				if (scrollTop > scrollDirection) {
					// downscroll code
					header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
				} else {
					// upscroll code
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}
				timer = setTimeout(() => {
					!header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
				}, headerShowTimer);
			}
		} else {
			header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
			if (headerShow) {
				header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
			}
		}
		scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
	});
}
// ÐŸÑ€Ð¸Ð»Ð¸Ð¿Ð°ÑŽÑ‰Ð¸Ð¹ Ð±Ð»Ð¾Ðº
function stickyBlock() {
	addWindowScrollEvent = true;
	// data-sticky Ð´Ð»Ñ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ Ð²Ð½ÑƒÑ‚Ñ€Ð¸ ÐºÐ¾Ñ‚Ð¾Ñ€Ð¾Ð³Ð¾ Ð¿Ñ€Ð¸Ð»Ð¸Ð¿Ð°ÐµÑ‚ Ð±Ð»Ð¾Ðº *
	// data-sticky-header Ð´Ð»Ñ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ, ÑƒÑ‡Ð¸Ñ‚Ñ‹Ð²Ð°ÐµÐ¼ Ð²Ñ‹ÑÐ¾Ñ‚Ñƒ Ñ…ÐµÐ´ÐµÑ€Ð°
	// data-sticky-top="" Ð´Ð»Ñ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ, Ð¼Ð¾Ð¶Ð½Ð¾ ÑƒÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¾Ñ‚ÑÑ‚ÑƒÐ¿ ÑÐ²ÐµÑ€Ñ…Ñƒ
	// data-sticky-bottom="" Ð´Ð»Ñ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ, Ð¼Ð¾Ð¶Ð½Ð¾ ÑƒÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¾Ñ‚ÑÑ‚ÑƒÐ¿ ÑÐ½Ð¸Ð·Ñƒ
	// data-sticky-item Ð´Ð»Ñ Ð¿Ñ€Ð¸Ð»Ð¸Ð¿Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±Ð»Ð¾ÐºÐ° *
	function stickyBlockInit() {
		const stickyParents = document.querySelectorAll('[data-sticky]');
		if (stickyParents.length) {
			stickyParents.forEach(stickyParent => {
				let stickyConfig = {
					media: stickyParent.dataset.sticky ? parseInt(stickyParent.dataset.sticky) : null,
					top: stickyParent.dataset.stickyTop ? parseInt(stickyParent.dataset.stickyTop) : 0,
					bottom: stickyParent.dataset.stickyBottom ? parseInt(stickyParent.dataset.stickyBottom) : 0,
					header: stickyParent.hasAttribute('data-sticky-header') ? document.querySelector('header.header').offsetHeight : 0
				}
				stickyBlockItem(stickyParent, stickyConfig);
			});
		}
	}
	function stickyBlockItem(stickyParent, stickyConfig) {
		const stickyBlockItem = stickyParent.querySelector('[data-sticky-item]');
		const headerHeight = stickyConfig.header;
		const offsetTop = headerHeight + stickyConfig.top;
		const startPoint = stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;

		document.addEventListener("windowScroll", stickyBlockActions);
		//window.addEventListener("resize", stickyBlockActions);

		function stickyBlockActions(e) {
			const endPoint = (stickyParent.offsetHeight + stickyParent.getBoundingClientRect().top + scrollY) - (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
			let stickyItemValues = {
				position: "relative",
				bottom: "auto",
				top: "0px",
				left: "0px",
				width: "auto"
			}
			if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
				if (offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight < window.innerHeight) {
					if (scrollY >= startPoint && scrollY <= endPoint) {
						stickyItemValues.position = `fixed`;
						stickyItemValues.bottom = `auto`;
						stickyItemValues.top = `${offsetTop}px`;
						stickyItemValues.left = `${stickyBlockItem.getBoundingClientRect().left}px`; // Ð£Ñ‡ÐµÑÑ‚ÑŒ Ñ€Ð°Ð·Ð½Ð¸Ñ†Ñƒ Ð² ÑˆÐ¸Ñ€Ð¸Ð½Ðµ ÑÐºÑ€Ð°Ð½Ð°?
						stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
					} else if (scrollY >= endPoint) {
						stickyItemValues.position = `absolute`;
						stickyItemValues.bottom = `${stickyConfig.bottom}px`;
						stickyItemValues.top = `auto`;
						stickyItemValues.left = `0px`;
						stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
					}
				}
			}
			stickyBlockType(stickyBlockItem, stickyItemValues);
		}
	}
	function stickyBlockType(stickyBlockItem, stickyItemValues) {
		stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
	}
	stickyBlockInit();
}
// ÐŸÑ€Ð¸ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ð¸ Ð¼Ð¾Ð´ÑƒÐ»Ñ Ð¾Ð±Ñ€Ð°Ð±Ð¾Ñ‚Ñ‡Ð¸Ðº ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ñ Ð·Ð°Ð¿ÑƒÑÑ‚Ð¸Ñ‚ÑÑ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡ÐµÑÐºÐ¸
setTimeout(() => {
	if (addWindowScrollEvent) {
		let windowScroll = new Event("windowScroll");
		window.addEventListener("scroll", function (e) {
			document.dispatchEvent(windowScroll);
		});
	}
}, 0);
// ÐŸÐ¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð´Ð¾Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ Ð´Ð»Ñ ÑƒÐ²ÐµÐ»Ð¸Ñ‡ÐµÐ½Ð¸Ñ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ÐµÐ¹
// import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// ÐœÐ¾Ð´ÑƒÐ»ÑŒ Ð¿Ð»Ð°Ð²Ð½Ð¾Ð¹ Ð¿Ñ€Ð¾ÐºÑ‚ÑƒÑ‚ÐºÐ¸ Ðº Ð±Ð»Ð¾ÐºÑƒ
let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = '';
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = 'header.header';
			headerItemHeight = document.querySelector(headerItem).offsetHeight;
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad',
		};
		// Ð—Ð°ÐºÑ€Ñ‹Ð²Ð°ÐµÐ¼ Ð¼ÐµÐ½ÑŽ, ÐµÑÐ»Ð¸ Ð¾Ð½Ð¾ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¾
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

		if (typeof SmoothScroll !== 'undefined') {
			// ÐŸÑ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ° Ñ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸ÐµÐ¼ Ð´Ð¾Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ
			new SmoothScroll().animateScroll(targetBlockElement, '', options);
		} else {
			// ÐŸÑ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ° ÑÑ‚Ð°Ð½Ð´Ð°Ñ€Ñ‚Ð½Ñ‹Ð¼Ð¸ ÑÑ€ÐµÐ´ÑÑ‚Ð²Ð°Ð¼Ð¸
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		}
		FLS(`[gotoBlock]: Ð®Ñ…ÑƒÑƒ...ÐµÐ´ÐµÐ¼ Ðº ${targetBlock}`);
	} else {
		FLS(`[gotoBlock]: ÐžÐ¹ Ð¾Ð¹..Ð¢Ð°ÐºÐ¾Ð³Ð¾ Ð±Ð»Ð¾ÐºÐ° Ð½ÐµÑ‚ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ: ${targetBlock}`);
	}
};

pageNavigation();
//======================================== Scroll To Top Button + Fixed Header
var html, scrollToTopButton;
window.onload = function() {
  html = document.documentElement;
  body = document.body;
  scrollToTopButton = document.getElementById("scrollToTopButton");

  window.onscroll = function() {
    windowScroll();
    controlScrollToTopButton();
  };
};

function scrollToTop(totalTime, easingPower) {
  //console.log("here");
  var timeInterval = 1; //in ms
  var scrollTop = Math.round(body.scrollTop || html.scrollTop);
  //var by=- scrollTop;
  var timeLeft = totalTime;
  var scrollByPixel = setInterval(function() {
    var percentSpent = (totalTime - timeLeft) / totalTime;
    if (timeLeft >= 0) {
      var newScrollTop = scrollTop * (1 - easeInOut(percentSpent, easingPower));
      body.scrollTop = newScrollTop;
      html.scrollTop = newScrollTop;
      //console.log(easeInOut(percentSpent,easingPower));
      timeLeft--;
    } else {
      clearInterval(scrollByPixel);
      //Add hash to the url after scrolling
      //window.location.hash = hash;
    }
  }, timeInterval);
}

function easeInOut(t, power) {
  if (t < 0.5) {
    return 0.5 * Math.pow(2 * t, power);
  } else {
    return 0.5 * (2 - Math.pow(2 * (1 - t), power));
  }
}

//window.onscroll = controlScrollToTopButton;

function controlScrollToTopButton() {
  
  if (!scrollToTopButton) return;
  var windowInnerHeight = 2 * window.innerHeight;
  if (
    body.scrollTop > windowInnerHeight ||
    html.scrollTop > windowInnerHeight
    ) {
    scrollToTopButton.classList.add("show");
} else {
  scrollToTopButton.classList.remove("show");
}
}


var mainNav = document.querySelector('.header');

function windowScroll() {
  if (!mainNav) return;
  mainNav.classList.toggle("_fixed", mainNav.scrollTop > 50 || 
    document.documentElement.scrollTop > 50);
}


var mainNav = document.querySelector('.header');

window.onscroll = function() {
  windowScroll();
};

function windowScroll() {
  mainNav.classList.toggle("_fixed", mainNav.scrollTop > 50 || document.documentElement.scrollTop > 50);
}


/*
Ð§Ñ‚Ð¾Ð±Ñ‹ Ð¿Ð¾Ð»Ðµ ÑƒÑ‡Ð°ÑÑ‚Ð²Ð¾Ð²Ð°Ð»Ð¾ Ð² Ð²Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ð¸ Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚ data-required
ÐžÑÐ¾Ð±Ñ‹Ðµ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐºÐ¸:
data-required="email" - Ð²Ð°Ð´Ð¸Ð´Ð°Ñ†Ð¸Ñ E-mail

Ð§Ñ‚Ð¾Ð±Ñ‹ Ð¿Ð¾Ð»Ðµ Ð²Ð°Ð»Ð¸Ð´Ð¸Ñ€Ð¾Ð²Ð°Ð»Ð¾ÑÑŒ Ð¿Ñ€Ð¸ Ð¿Ð¾Ñ‚ÐµÑ€Ðµ Ñ„Ð¾ÐºÑƒÑÐ°, 
Ðº Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ñƒ data-required Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚ data-validate

Ð§Ñ‚Ð¾Ð±Ñ‹ Ð²Ñ‹Ð²ÐµÑÑ‚Ð¸ Ñ‚ÐµÐºÑÑ‚ Ð¾ÑˆÐ¸Ð±ÐºÐ¸, Ð½ÑƒÐ¶Ð½Ð¾ ÑƒÐºÐ°Ð·Ð°Ñ‚ÑŒ ÐµÐ³Ð¾ Ð² Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚Ðµ data-error

data-popup-message - ÑƒÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ ÑÐµÐ»ÐµÐºÑ‚Ð¾Ñ€ Ð¿Ð¾Ð¿Ð°Ð¿Ð° ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ð¹ Ð½ÑƒÐ¶Ð½Ð¾ Ð¿Ð¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¿Ð¾ÑÐ»Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸ Ñ„Ð¾Ñ€Ð¼Ñ‹ (Ñ€ÐµÐ¶Ð¸Ð¼Ñ‹ data-ajax Ð¸Ð»Ð¸ data-dev) ! Ð½ÐµÐ¾Ð±Ñ…Ð¾Ð´Ð¸Ð¼Ð¾ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡Ð¸Ñ‚ÑŒ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð» Ð¿Ð¾Ð¿Ð°Ð¿Ð¾Ð² Ð² app.js
data-ajax - Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÑÐµÐ¼ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ñ„Ð¾Ñ€Ð¼Ñ‹ AJAX Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¾Ð¼ Ð¿Ð¾ Ð°Ð´Ñ€ÐµÑÑƒ ÑƒÐºÐ°Ð·Ð°Ð½Ð½Ð¾Ð¼Ñƒ Ð² action Ð¼ÐµÑ‚Ð¾Ð´Ð¾Ð¼ ÑƒÐºÐ°Ð·Ð°Ð½Ð½Ñ‹Ð¼ Ð² method
data-dev - Ñ€ÐµÐ¶Ð¸Ð¼ Ñ€Ð°Ð·Ñ€Ð°Ð±Ð¾Ñ‚Ñ‡Ð¸ÐºÐ° - ÑÐ¼Ð¸Ñ‚Ð¸Ñ€ÑƒÐµÐ¼ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÑƒ Ñ„Ð¾Ñ€Ð¼Ñ‹
data-goto-error - Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚Ð¸Ñ‚ÑŒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñƒ Ðº Ð¾ÑˆÐ¸Ð±ÐºÐµ
*/

formFieldsInit({ viewPass: true });
formSubmit();

// Ð Ð°Ð±Ð¾Ñ‚Ð° Ñ Ð¿Ð¾Ð»ÑÐ¼Ð¸ Ñ„Ð¾Ñ€Ð¼Ñ‹. Ð”Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ ÐºÐ»Ð°ÑÑÐ¾Ð², Ñ€Ð°Ð±Ð¾Ñ‚Ð° Ñ placeholder
function formFieldsInit(options = { viewPass: false }) {
   // Ð•ÑÐ»Ð¸ Ð²ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¾, Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð» "ÑÐºÑ€Ñ‹Ñ‚ÑŒ Ð¿Ð»ÐµÐ¹ÑÑ…Ð¾Ð´Ð»ÐµÑ€ Ð¿Ñ€Ð¸ Ñ„Ð¾ÐºÑƒÑÐµ"
   const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');
   if (formFields.length) {
      formFields.forEach(formField => {
         if (!formField.hasAttribute('data-placeholder-nohide')) {
            formField.dataset.placeholder = formField.placeholder;
         }
      });
   }
   document.body.addEventListener("focusin", function (e) {
      const targetElement = e.target;
      if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
         if (targetElement.dataset.placeholder) {
            targetElement.placeholder = '';
         }
         if (!targetElement.hasAttribute('data-no-focus-classes')) {
            targetElement.classList.add('_form-focus');
            targetElement.parentElement.classList.add('_form-focus');
         }
         formValidate.removeError(targetElement);
      }
   });
   document.body.addEventListener("focusout", function (e) {
      const targetElement = e.target;
      if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
         if (targetElement.dataset.placeholder) {
            targetElement.placeholder = targetElement.dataset.placeholder;
         }
         if (!targetElement.hasAttribute('data-no-focus-classes')) {
            targetElement.classList.remove('_form-focus');
            targetElement.parentElement.classList.remove('_form-focus');
         }
         // ÐœÐ¾Ð¼ÐµÐ½Ñ‚Ð°Ð»ÑŒÐ½Ð°Ñ Ð²Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ñ
         if (targetElement.hasAttribute('data-validate')) {
            formValidate.validateInput(targetElement);
         }
      }
   });

   // Ð•ÑÐ»Ð¸ Ð²ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¾, Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ð¾Ð½Ð°Ð» "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¿Ð°Ñ€Ð¾Ð»ÑŒ"
   if (options.viewPass) {
      document.addEventListener("click", function (e) {
         let targetElement = e.target;
         if (targetElement.closest('[class*="__viewpass"]')) {
            let inputType = targetElement.classList.contains('_viewpass-active') ? "password" : "text";
            targetElement.parentElement.querySelector('input').setAttribute("type", inputType);
            targetElement.classList.toggle('_viewpass-active');
         }
      });
   }
}
// Ð’Ð°Ð»Ð¸Ð´Ð°Ñ†Ð¸Ñ Ñ„Ð¾Ñ€Ð¼
let formValidate = {
   getErrors(form) {
      let error = 0;
      let formRequiredItems = form.querySelectorAll('*[data-required]');
      if (formRequiredItems.length) {
         formRequiredItems.forEach(formRequiredItem => {
            if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
               error += this.validateInput(formRequiredItem);
            }
         });
      }
      return error;
   },
   validateInput(formRequiredItem) {
      let error = 0;
      if (formRequiredItem.dataset.required === "email") {
         formRequiredItem.value = formRequiredItem.value.replace(" ", "");
         if (this.emailTest(formRequiredItem)) {
            this.addError(formRequiredItem);
            error++;
         } else {
            this.removeError(formRequiredItem);
         }
      } else if (formRequiredItem.dataset.required === "phone") {
         formRequiredItem.value = formRequiredItem.value.replace(" ", "");
         if (this.phoneTest(formRequiredItem)) {
            this.addError(formRequiredItem);
            error++;
         } else {
            this.removeError(formRequiredItem);
         }
      } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
         this.addError(formRequiredItem);
         error++;
      } else {
         if (!formRequiredItem.value) {
            this.addError(formRequiredItem);
            error++;
         } else {
            this.removeError(formRequiredItem);
         }
      }
      return error;
   },
   addError(formRequiredItem) {
      formRequiredItem.classList.add('_form-error');
      formRequiredItem.parentElement.classList.add('_form-error');
      let inputError = formRequiredItem.parentElement.querySelector('.form__error');
      if (inputError) formRequiredItem.parentElement.removeChild(inputError);
      if (formRequiredItem.dataset.error) {
         formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
      }
   },
   removeError(formRequiredItem) {
      formRequiredItem.classList.remove('_form-error');
      formRequiredItem.parentElement.classList.remove('_form-error');
      if (formRequiredItem.parentElement.querySelector('.form__error')) {
         formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
      }
   },
   formClean(form) {
      form.reset();
      setTimeout(() => {
         let inputs = form.querySelectorAll('input,textarea');
         for (let index = 0; index < inputs.length; index++) {
            const el = inputs[index];
            el.parentElement.classList.remove('_form-focus');
            el.classList.remove('_form-focus');
            formValidate.removeError(el);
         }
         let checkboxes = form.querySelectorAll('.checkbox__input');
         if (checkboxes.length > 0) {
            for (let index = 0; index < checkboxes.length; index++) {
               const checkbox = checkboxes[index];
               checkbox.checked = false;
            }
         }
         if (flsModules.select) {
            let selects = form.querySelectorAll('.select');
            if (selects.length) {
               for (let index = 0; index < selects.length; index++) {
                  const select = selects[index].querySelector('select');
                  
                  flsModules.select.selectBuild(select);
               }
            }
         }
      }, 0);
   },
   emailTest(formRequiredItem) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
   },
   phoneTest(formRequiredItem) {
      var re = /(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}/;
      var valid = re.test(formRequiredItem.value);
      console.log(formRequiredItem.value + ' : ' + valid)
      return !valid;
   }
}

/* ÐžÑ‚Ð¿Ñ€Ð°Ð²ÐºÐ° Ñ„Ð¾Ñ€Ð¼ */
function formSubmit(options = { validate: true }) {
   const forms = document.forms;
   if (forms.length) {
      for (const form of forms) {
         form.addEventListener('submit', function (e) {
            const form = e.target;
            formSubmitAction(form, e);
         });
         form.addEventListener('reset', function (e) {
            const form = e.target;
            formValidate.formClean(form);
         });
      }
   }
   async function formSubmitAction(form, e) {
      const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
      if (error === 0) {
         const ajax = form.hasAttribute('data-ajax');
         if (ajax) { // Ð•ÑÐ»Ð¸ Ñ€ÐµÐ¶Ð¸Ð¼ ajax
            e.preventDefault();
            const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
            const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
            const formData = new FormData(form);

            form.classList.add('_sending');
            const response = await fetch(formAction, {
               method: formMethod,
               body: formData
            });
            if (response.ok) {
               let responseResult = await response.json();
               form.classList.remove('_sending');
               formSent(form);
            } else {
               alert("ÐžÑˆÐ¸Ð±ÐºÐ°");
               form.classList.remove('_sending');
            }
         } else if (form.hasAttribute('data-dev')) {  // Ð•ÑÐ»Ð¸ Ñ€ÐµÐ¶Ð¸Ð¼ Ñ€Ð°Ð·Ñ€Ð°Ð±Ð¾Ñ‚ÐºÐ¸
            e.preventDefault();
            formSent(form);
         }
      } else {
         e.preventDefault();
         const formError = form.querySelector('._form-error');
         if (formError && form.hasAttribute('data-goto-error')) {
            gotoBlock(formError, true, 1000);
         }
      }
   }
   // Ð”ÐµÐ¹ÑÑ‚Ð²Ð¸Ñ Ð¿Ð¾ÑÐ»Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸ Ñ„Ð¾Ñ€Ð¼Ñ‹
   function formSent(form) {
      // Ð¡Ð¾Ð·Ð´Ð°ÐµÐ¼ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ðµ Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐ¸ Ñ„Ð¾Ñ€Ð¼Ñ‹
      document.dispatchEvent(new CustomEvent("formSent", {
         detail: {
            form: form
         }
      }));
      // ÐŸÐ¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ð¿Ð¾Ð¿Ð°Ð¿, ÐµÑÐ»Ð¸ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½ Ð¼Ð¾Ð´ÑƒÐ»ÑŒ Ð¿Ð¾Ð¿Ð°Ð¿Ð¾Ð² 
      // Ð¸ Ð´Ð»Ñ Ñ„Ð¾Ñ€Ð¼Ñ‹ ÑƒÐºÐ°Ð·Ð°Ð½Ð° Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ°
      setTimeout(() => {
         if (flsModules.popup) {
            const pop = form.dataset.popupMessage;
            const window = form.dataset.thiswindow;
            //popup ? flsModules.popup.open(pop) : null;
            let pu = document.querySelector(pop);
            if (pu) { 
                popup.close();
                //Ð—Ð°Ð´ÐµÑ€Ð¶ÐºÐ° Ð¿Ð¾ÐºÐ°Ð·Ð° ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð¾Ð± Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐµ
                setTimeout(()=>{pu.classList.add('_active');}, 500);
                //Ð’Ñ€ÐµÐ¼Ñ Ð¿Ð¾ÐºÐ°Ð·Ð° ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð¾Ð± Ð¾Ñ‚Ð¿Ñ€Ð°Ð²ÐºÐµ
                setTimeout(()=>{pu.classList.remove('_active');}, 3000);
            }
         }
      }, 0);
      // ÐžÑ‡Ð¸Ñ‰Ð°ÐµÐ¼ Ñ„Ð¾Ñ€Ð¼Ñƒ
      formValidate.formClean(form);
      // Ð¡Ð¾Ð¾Ð±Ñ‰Ð°ÐµÐ¼ Ð² ÐºÐ¾Ð½ÑÐ¾Ð»ÑŒ
      formLogging(`Ð¤Ð¾Ñ€Ð¼Ð° Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð°!`);
   }
   function formLogging(message) {
      FLS(`[Ð¤Ð¾Ñ€Ð¼Ñ‹]: ${message}`);
   }
}
/* ÐœÐ¾Ð´ÑƒÑŒ Ñ„Ð¾Ñ€Ð¼Ñ‹ "ÐºÐ¾Ð»Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾" */
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
   for (let index = 0; index < quantityButtons.length; index++) {
      const quantityButton = quantityButtons[index];
      quantityButton.addEventListener("click", function (e) {
         let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
         if (quantityButton.classList.contains('quantity__button_plus')) {
            value++;
         } else {
            value = value - 1;
            if (value < 1) {
               value = 1
            }
         }
         quantityButton.closest('.quantity').querySelector('input').value = value;
      });
   }
}
/* ÐœÐ¾Ð´ÑƒÑŒ Ð·Ð²ÐµÐ·Ð´Ð½Ð¾Ð³Ð¾ Ñ€ÐµÐ¹Ñ‚Ð¸Ð½Ð³Ð° */
function formRating() {
   const ratings = document.querySelectorAll('.rating');
   if (ratings.length > 0) {
      initRatings();
   }
   // ÐžÑÐ½Ð¾Ð²Ð½Ð°Ñ Ñ„ÑƒÐ½ÐºÑ†Ð¸Ñ
   function initRatings() {
      let ratingActive, ratingValue;
      // "Ð‘ÐµÐ³Ð°ÐµÐ¼" Ð¿Ð¾ Ð²ÑÐµÐ¼ Ñ€ÐµÐ¹Ñ‚Ð¸Ð½Ð³Ð°Ð¼ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ðµ
      for (let index = 0; index < ratings.length; index++) {
         const rating = ratings[index];
         initRating(rating);
      }
      // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð¸Ñ€ÑƒÐµÐ¼ ÐºÐ¾Ð½ÐºÑ€ÐµÑ‚Ð½Ñ‹Ð¹ Ñ€ÐµÐ¹Ñ‚Ð¸Ð½Ð³
      function initRating(rating) {
         initRatingVars(rating);

         setRatingActiveWidth();

         if (rating.classList.contains('rating_set')) {
            setRating(rating);
         }
      }
      // Ð˜Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð°Ð¹Ñ†Ð¸Ñ Ð¿ÐµÑ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ñ…
      function initRatingVars(rating) {
         ratingActive = rating.querySelector('.rating__active');
         ratingValue = rating.querySelector('.rating__value');
      }
      // Ð˜Ð·Ð¼ÐµÐ½ÑÐµÐ¼ ÑˆÐ¸Ñ€Ð¸Ð½Ñƒ Ð°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ñ… Ð·Ð²ÐµÐ·Ð´
      function setRatingActiveWidth(index = ratingValue.innerHTML) {
         const ratingActiveWidth = index / 0.05;
         ratingActive.style.width = `${ratingActiveWidth}%`;
      }
      // Ð’Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚ÑŒ ÑƒÐºÐ°Ð·Ð°Ñ‚ÑŒ Ð¾Ñ†ÐµÐ½ÐºÑƒ 
      function setRating(rating) {
         const ratingItems = rating.querySelectorAll('.rating__item');
         for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];
            ratingItem.addEventListener("mouseenter", function (e) {
               // ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿ÐµÑ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ñ…
               initRatingVars(rating);
               // ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ñ… Ð·Ð²ÐµÐ·Ð´
               setRatingActiveWidth(ratingItem.value);
            });
            ratingItem.addEventListener("mouseleave", function (e) {
               // ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ñ… Ð·Ð²ÐµÐ·Ð´
               setRatingActiveWidth();
            });
            ratingItem.addEventListener("click", function (e) {
               // ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿ÐµÑ€ÐµÐ¼ÐµÐ½Ð½Ñ‹Ñ…
               initRatingVars(rating);

               if (rating.dataset.ajax) {
                  // "ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ" Ð½Ð° ÑÐµÑ€Ð²ÐµÑ€
                  setRatingValue(ratingItem.value, rating);
               } else {
                  // ÐžÑ‚Ð¾Ð±Ñ€Ð°Ð·Ð¸Ñ‚ÑŒ ÑƒÐºÐ°Ð·Ð°Ð½Ð½ÑƒÑŽ Ð¾Ñ†Ð½ÐºÑƒ
                  ratingValue.innerHTML = index + 1;
                  setRatingActiveWidth();
               }
            });
         }
      }
      async function setRatingValue(value, rating) {
         if (!rating.classList.contains('rating_sending')) {
            rating.classList.add('rating_sending');

            // ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸ÐºÐ° Ð´Ð°Ð½Ð½Ñ‹Ñ… (value) Ð½Ð° ÑÐµÑ€Ð²ÐµÑ€
            let response = await fetch('rating.json', {
               method: 'GET',

               //body: JSON.stringify({
               // userRating: value
               //}),
               //headers: {
               // 'content-type': 'application/json'
               //}

            });
            if (response.ok) {
               const result = await response.json();

               // ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ Ð½Ð¾Ð²Ñ‹Ð¹ Ñ€ÐµÐ¹Ñ‚Ð¸Ð½Ð³
               const newRating = result.newRating;

               // Ð’Ñ‹Ð²Ð¾Ð´ Ð½Ð¾Ð²Ð¾Ð³Ð¾ ÑÑ€ÐµÐ´Ð½ÐµÐ³Ð¾ Ñ€ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð°
               ratingValue.innerHTML = newRating;

               // ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ñ… Ð·Ð²ÐµÐ·Ð´
               setRatingActiveWidth();

               rating.classList.remove('rating_sending');
            } else {
               alert("ÐžÑˆÐ¸Ð±ÐºÐ°");

               rating.classList.remove('rating_sending');
            }
         }
      }
   }
}

