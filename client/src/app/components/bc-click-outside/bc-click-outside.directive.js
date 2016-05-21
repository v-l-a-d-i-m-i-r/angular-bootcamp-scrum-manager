(function () {
  'use strict';

  angular
    .module('bcClickOutside', [])
    .directive('bcClickOutside', bcClickOutside);

  /* @ngInject */
  function bcClickOutside($parse, $document) {
    var directive = {
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
      var parsedExpression = $parse(attrs.bcClickOutside);
      var domDocument = $document.get(0);

      function clickOutsideHandler(event) {
        if (!element.is(':visible')) {
          // If element is not visible at the moment we don't want to process the event
          return;
        }

        var target = event.target;

        do {
          if (target === element[0]) {
            return;
          }

          target = target.parentNode;
        } while (target !== null);

        scope.$apply(parsedExpression);
      }

      domDocument.addEventListener('click', clickOutsideHandler, true);

      element.on('$destroy', function() {
        domDocument.removeEventListener('click', clickOutsideHandler, true);
      });
    }
  }

})();

