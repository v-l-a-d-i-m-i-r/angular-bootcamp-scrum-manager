(function () {
  'use strict';

  angular
    .module('bcForm')
    .directive('uniqueId', directive);

  function directive() {
    var directive = {
      restrict: "A",
      scope: true,
      link: link
    };
    return directive;

    function link(scope, element) {
      var id = 'id-' + (Math.random() * 10000000).toFixed();

      scope.id = id;
      element.attr("unique-id", id);
    }
  }
})();