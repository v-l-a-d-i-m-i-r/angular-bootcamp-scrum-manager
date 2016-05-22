(function () {
  'use strict';

  angular
    .module('bcForm')
    .directive('disableButton', directive);

  function directive() {
    var directive = {
      restrict: 'A',
      scope: true,
      require: '^form',
      link: link
    };
    return directive;

    function link(scope, element, attrs, formCtrl) {
      scope.$watch(function () {
        var currentState = !(formCtrl.$dirty && formCtrl.$valid);

        element.attr('disabled', currentState);
      });
    }
  }
})();