'use strict';


(function(module) {

  const booksView = {};



  booksView.initIndexPage = function(ctx) {
    $('#items ul').empty();
    show('items');
    app.Book.all.forEach(book =>
      $('#items ul').append(book.toHtml())
    );
  }

  booksView.initAddPage = function(ctx) {
    if(localStorage.token) {
      console.log('add');
      show('add');
    }
    else {
      console.log('not logged in, going to admin');
      page('/admin');
    }
  }

  booksView.initEditPage = function(ctx) {
    if(localStorage.token) {
      console.log('edit');
      show('edit');
    }
    else {
      console.log('not logged in, going to admin');
      page('/admin');
    }
  }

  booksView.initBookPage = function(ctx) {
    $('#book').empty();
    show('book');
    app.Book.all.forEach(book => {
      if ( parseInt(book.book_id) === parseInt(ctx.params.id) ) {
        $('#book').append(book.detailToHtml());
        $('#book').append(`<button id="edit-${book.book_id}">edit</button>`);
        $('#book').append(`<button id="delete-${book.book_id}">delete</button>`);
        $(`#book #delete-${book.book_id}`).on('click', deleteBook);
        $(`#book #edit-${book.book_id}`).on('click', editBookPage);
      }
    });
  }

  $('#add form').on('submit', createNewBook);
  $('#edit form').on('submit', editBook);

  function createNewBook(e) {
    e.preventDefault();
    let book = { 
      title: e.target.title.value, 
      author: e.target.author.value, 
      isbn: e.target.isbn.value, 
      image_url: e.target.image_url.value, 
      description: e.target.description.value 
    };
    $.post(`${ENV.apiUrl}/api/v1/books`, book)
     .then(app.Book.fetchAll(booksView.initIndexPage))
     .catch(console.error);
  }

  //still need server.js update
  function editBookPage(e) {
    // e.preventDefault();
    var endOfUrl = window.location.pathname;
    var n = endOfUrl.lastIndexOf('/');
    var currID = endOfUrl.substring(n + 1);
    page(`/api/v1/edit/${currID}`);
  
  }

  function editBook(e) {
    e.preventDefault();
    let book = { 
      title: e.target.title.value, 
      author: e.target.author.value, 
      isbn: e.target.isbn.value, 
      image_url: e.target.image_url.value, 
      description: e.target.description.value 
    };
    var endOfUrl = window.location.pathname;
    var n = endOfUrl.lastIndexOf('/');
    var currID = endOfUrl.substring(n + 1);

    app.Book.editBook(currID, book);
  }

  // $('#book').on('click', deleteBook);

  function deleteBook(e) {
    e.preventDefault();
    var endOfUrl = window.location.pathname;
    var n = endOfUrl.lastIndexOf('/');
    var currID = endOfUrl.substring(n + 1);

    app.Book.deleteBook(currID);
  }
    

  module.booksView = booksView;


})(app);
