(function() {
  'use strict';

  angular
    .module('bootcamp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
