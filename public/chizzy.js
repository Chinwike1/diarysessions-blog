// CODE FOR THE HAMBURGER SIDE MENU
const hamburger = document.querySelector('.hamburger');
const menu = document.getElementById('side-menu');
const menuLinks = document.querySelectorAll('#side-menu li');
let showMenu = false;

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    hamburger.classList.remove('close');
  });
});

if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

function toggleMenu() {
  if (!showMenu) {
    showMenu = true;
    menu.classList.toggle('open');
    hamburger.classList.toggle('close');
  } else {
    showMenu = false;
    menu.classList.toggle('open');
    hamburger.classList.toggle('close');
  }
}

// CODE FOR HIDE NAVBAR ON SCROLL
var x = window.matchMedia('(max-width: 768px)');
var navigationHide = document.querySelector('.navigation-hide');

function navbarScroll(x) {
  if (navigationHide) {
    if (x.matches) {
      var prevScrollPos = window.pageYOffset;
      window.onscroll = function () {
        //*/ Place all functions to be called on scroll below /*/
        scrollTopFunction();
        //*/***********************************************/*/
        var currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) {
          navigationHide.style.top = '0';
        } else {
          if (showMenu) {
            navigationHide.style.top = '0';
          } else {
            navigationHide.style.top = '-60px';
          }
        }
        prevScrollPos = currentScrollPos;
      };
    }
  }
}
navbarScroll(x);

x.addListener(navbarScroll);

// CODE FOR DELETE BUTTON FADEAWAY
let deleteBtns = document.querySelectorAll('.deleteBtn');

window.addEventListener('click', (e) => {
  deleteBtns = document.querySelectorAll('.deleteBtn');
  deleteBtns.forEach(function (deleteBtn) {
    if (e.target == deleteBtn) {
      e.target.parentElement.classList.add('fadeaway');
      setTimeout((removeElement) => {
        e.target.parentElement.remove();
      }, 300);
    }
  });
});
