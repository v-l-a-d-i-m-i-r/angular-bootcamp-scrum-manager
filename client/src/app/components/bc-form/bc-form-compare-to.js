(function () {
  'use strict';

  angular
    .module('bcForm')
    .directive('compareTo', directive);

  function directive() {
    var directive = {
      restrict: 'A',
      require: "ngModel",
      scope: {
        fieldValue: '=ngModel',
        otherFieldlValue: '=compareTo'
      },
      link: link
    };
    return directive;

    function link(scope, element, attrs, modelCtrl) {
      scope.$watchCollection('[fieldValue, otherFieldlValue]', function () {
        var isEqual = scope.otherFieldlValue === scope.fieldValue;

        modelCtrl.$setValidity('compareTo', isEqual);
      });
    }
  }
})();