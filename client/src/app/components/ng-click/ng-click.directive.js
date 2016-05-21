(function () {
  'use strict';

  angular
    .module('scrumManager')
    .directive('ngClick', ngClick);

  /* @ngInject */
  function ngClick($log) {
    var directive = {
      link: link,
      restrict: 'A'
    };

    return directive;

    function link(scope, element) {
      element.on('click', function() {
        $log.log('I\'m custom click handler')
      });
    }
  }

})();

