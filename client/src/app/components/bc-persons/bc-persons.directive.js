(function () {
  'use strict';

  angular
    .module('bcPersons', [])
    .directive('bcPersons', bcPersons)
    .directive('bcPersonsTransclude', bcPersonsTransclude)

  /* @ngInject */
  function bcPersons() {
    var directive = {
      link: _.noop,
      restrict: 'E',
      transclude: true,
      scope: {
        items: '<'
      },
      template: [
        '<ul>',
          '<li ng-repeat="item in items">',
            '<bc-persons-transclude />',
          '</li>',
        '</ul>'
      ].join('')
    };

    return directive;
  }

  /* @ngInject */
  function bcPersonsTransclude() {
    var directive = {
      scope: false,
      link: link,
      restrict: 'E'
    };

    return directive;

    function link(scope, element, attrs, ctrls, $transclude) {
      var $scope = scope.$parent.$parent.$new();
      $scope.item = scope.item;

      $transclude($scope, function(clone) {
        element.empty().append(clone);
      });
    }
  }
})();

