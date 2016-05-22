(function () {
  'use strict';
  angular
    .module('bcUser')
    .service('User', Factory);

  Factory.$inject = ['$http'];

  /* @ngInject */
  function Factory($http) {
    var exports = {
      signup: signup,
      signin: signin
    };


    return exports;

    ////////////////

    function signup(data) {
      return $http.post('api/signup', data);
    }
    
    function signin(data) {
      return $http.post('api/signin', data);
    }
  }
})();