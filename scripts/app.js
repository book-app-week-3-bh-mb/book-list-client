'use strict';

const ENV = {};
const app = {};


ENV.isProduction = window.location.protocol === 'https:';
ENV.productionAPIUrl = 'https://bh-mb-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionAPIUrl : ENV.developmentApiUrl;

function show(section) {
  $('section').not(`#${section}`).hide();
  $(`#${section}`).show();
}