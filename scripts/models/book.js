'use strict';




(function (module) {

  function Book(obj) {
    Object.assign(this, obj);
  }

  Book.all = [];

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-template').text());
    return template(this);

  };

  Book.prototype.detailToHtml = function () {
    let template = Handlebars.compile($('#book-detail-template').text());
    return template(this);
  };

  Book.loadAll = rows => {
    Book.all = rows.map(book => new Book(book));
    Book.all.sort(function (a, b) {
      return a.book_id - b.book_id;
    });
    console.log(Book.all);
  };


  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);
  };

  Book.add = book => {
    $.post(`${ENV.apiUrl}/books/add`, book)
      .then(() => page('/'))
      .catch(errorCallback);
  };


  Book.editBook = (bookToEdit, bookObj) => {
    $.ajax({
        url: `${ENV.apiUrl}/api/v1/edit/${bookToEdit}`,
        method: 'PUT',
        data: bookObj
      })
      .then(() => Book.fetchAll(app.booksView.initBookPage))
      .then(() => {
        console.log(bookToEdit);
        page(`/book/${bookToEdit}`);
      });
  };

  Book.deleteBook = bookToDelete => {
    $.ajax({
        url: `${ENV.apiUrl}/api/v1/books/${bookToDelete}`,
        method: 'DELETE'
      })
      .then(() => page('/'))
      .catch(errorCallback);
  };



  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  module.Book = Book;

})(app);