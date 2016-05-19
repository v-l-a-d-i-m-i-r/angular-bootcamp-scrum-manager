(function() {
  'use strict';

  angular
    .module('scrumManager')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $urlRouterProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    
    // Redirect to the root if matched state not found
    $urlRouterProvider.otherwise('/');

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
