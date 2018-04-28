'use strict';

(function (module) {

  const adminView = {};

  adminView.initAdminPage = function () {
    console.log('admin page');
    show('admin');
    $('#admin form').on('submit', function (event) {
      event.preventDefault();
      let token = event.target.passphrase.value;

      $.get(`${ENV.apiUrl}/authenticate`, {
          token
        })
        .then((token) => {
          if (!token) {
            throw new Error("Invalid Token");
          }
          localStorage.token = true;
          page('/add');
        })
        .catch(() => page('/'));
    });
  };

  adminView.verify = function (ctx, next) {
    console.log('admin verify function called');
    if (!localStorage.token) $('.admin').hide();
    else console.log('token');
    next();
  }

  module.adminView = adminView;
})(app)