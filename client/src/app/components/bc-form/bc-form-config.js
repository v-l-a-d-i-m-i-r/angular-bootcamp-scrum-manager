(function () {
  'use strict';

  angular
    .module('bcForm', [])
    .run(runFn);

  runFn.$inject = ['$templateCache'];

  /* @ngInject */
  function runFn($templateCache) {
    $templateCache.put('errorMessages.html', [
      '<div ng-message="required" class="error">You did not enter a field</div>',
      '<div ng-message="minlength" class="error">Your field is too short</div>',
      '<div ng-message="maxlength" class="error">Your field is too long</div>',
      '<div ng-message="email" class="error">Your field has an invalid email address</div>',
      '<div ng-message="pattern" class="error">Your field has invalid format</div>',
      '<div ng-message="compareTo" class="error">Your fields are not equal</div>'
    ].join(''));
  }
})();