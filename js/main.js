// Menu mobile
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
});

// Bouton retour en haut : apparaît après un certain défilement
document.addEventListener('DOMContentLoaded', function () {
  var backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  var toggleVisibility = function () {
    backToTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility();

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Envoi des formulaires Netlify en AJAX, avec message de confirmation sans rechargement de page
document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('form[data-netlify]');

  forms.forEach(function (form) {
    var success = form.parentElement.querySelector('.form-success');
    var error = form.parentElement.querySelector('.form-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (error) error.hidden = true;

      var body = new URLSearchParams(new FormData(form)).toString();

      fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      }).then(function (response) {
        if (!response.ok) throw new Error('Réponse serveur invalide');
        form.hidden = true;
        if (success) success.hidden = false;
      }).catch(function () {
        if (error) error.hidden = false;
      });
    });
  });
});
