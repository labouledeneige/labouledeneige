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

// Bloc de texte "voir plus / voir moins" (ex. Quatre axes d'action sur histoire.html) :
// réutilisable partout où un texte risque d'être plus long que la photo à côté.
// Les libellés viennent des attributs data- du bouton pour rester traduits sur en/de.
document.addEventListener('DOMContentLoaded', function () {
  var toggles = document.querySelectorAll('.text-collapse-toggle');

  toggles.forEach(function (bouton) {
    bouton.addEventListener('click', function () {
      var bloc = bouton.closest('.text-collapse');
      var estOuvert = bloc.classList.toggle('is-expanded');
      bouton.setAttribute('aria-expanded', estOuvert ? 'true' : 'false');
      bouton.textContent = estOuvert ? bouton.getAttribute('data-label-less') : bouton.getAttribute('data-label-more');
    });
  });
});

// Envoi des formulaires en AJAX (Netlify Forms pour contact, Brevo pour la newsletter),
// avec message de confirmation sans rechargement de page
document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('form[data-ajax-form]');

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
