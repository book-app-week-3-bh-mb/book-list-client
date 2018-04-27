'use strict';

page( '/', () => app.Book.fetchAll(app.booksView.initIndexPage) );
page( '/book/:id', (ctx) => app.Book.fetchAll(app.booksView.initBookPage(ctx) ));
page( '/add', ctx => app.booksView.initAddPage(ctx) );
page( '/api/v1/edit/:id', ctx => app.booksView.initEditPage(ctx) );

page('/admin',
  (ctx, next) => app.adminView.verify(ctx, next),
  (ctx) => app.adminView.initAdminPage());

page();