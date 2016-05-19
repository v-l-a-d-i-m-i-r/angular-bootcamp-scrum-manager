(function () {
  'use strict';

  angular
    .module('scrumManager.main')
    .controller('MainPopupController', MainPopupController);

  /* @ngInject */
  function MainPopupController($log, r1, r2) {
    var vm = this;
    vm.title = 'Main Popup Controller...!',

    activate();

    ////////////////

    function activate() {
      $log.log(r1);
      $log.log(r2);
    }
  }

})();

