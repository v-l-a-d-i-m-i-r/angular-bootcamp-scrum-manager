(function() {
  'use strict';

  angular
    .module('scrumManager.main')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          user: function ($http) {
            return $http.get('/api/current-user');
          }
        }
      });
  }

})();
