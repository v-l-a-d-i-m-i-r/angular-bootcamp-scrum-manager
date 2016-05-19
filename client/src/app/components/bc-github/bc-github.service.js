(function () {
  'use strict';

  angular
    .module('bcGithub')
    .service('bcGithub', bcGithubService);

  /* @ngInject */
  function bcGithubService($http) {
    this.getEvents = getEvents;

    ////////////////

    function getEvents() {
      return $http.get('http://kofan@github.com/events');
    }
  }

  // ------------------------

  angular
    .module('bcGithub')
    .factory('bcGithub', bcGithubFactory);

  /* @ngInject */
  function bcGithubFactory($http) {
    return {
      getEvents: getEvents
    };

    ////////////////

    function getEvents() {
      return $http.get('http://github.com/events');
    }
  }

  // ------------------------

  angular
    .module('bcGithub')
    .provider('bcGithub', bcGithubProvider);

  /* @ngInject */
  function bcGithubProvider() {
    var githubUrl = 'http://github.com';

    return {
      setUrl: setUrl,

      $get: function($http) {
        return {
          getEvents: getEvents
        };

        function getEvents() {
          return $http.get(githubUrl + '/events');
        }
      }
    };

    ////////////////

    function setUrl(url) {
      githubUrl = url;
    }
  }

  // ------------------------

  angular
    .module('bcGithub')
    .decorator('bcGithub', bcGithubDecorator);

  /* @ngInject */
  function bcGithubDecorator($delegate, $log) {
    $delegate.getEvents = function () {
      $log.log('I\'m mocked getEvents() method!');
    }
  }

})();
