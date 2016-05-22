(function() {
  'use strict';

  angular
    .module('bcUser')
    .controller('UserController', Controller);

  /* @ngInject */
  function Controller(User){
    var vm = this;
    vm.user = {};
    vm.submit = submit
    


    ////////////////

    function submit() {
      User.signup(vm.user);
    }
  }
})();