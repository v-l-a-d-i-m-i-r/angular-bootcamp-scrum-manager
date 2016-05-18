(function() {
  'use strict';

  angular
    .module('scrumManager')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
