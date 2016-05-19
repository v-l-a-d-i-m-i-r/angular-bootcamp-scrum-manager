(function () {
  'use strict';

  angular
    .module('bcPopup', [])
    .service('bcPopup', bcPopup);

  /* @ngInject */
  function bcPopup($q, $injector, $templateRequest, $rootScope, $controller, $compile, $document) {
    this.open = open;

    ////////////////

    function open(options) {
      var deferred = $q.defer();
      var parentScope = options.scope || $rootScope;
      var resolves = options.resolve || {};

      var resolveInstances = null;
      var resolvePromises = _.mapValues(resolves, function (resolveFunc) {
        return $injector.invoke(resolveFunc);
      });

      $q.all(resolvePromises)
        .then(function (_resolveInstances) {
          resolveInstances = _resolveInstances;

          return $q.when(
            options.template ||
            $templateRequest(options.templateUrl) ||
            ''
          );
        })
        .then(function (template) {
          var scope = parentScope.$new();

          $controller(options.controller, _.assign(
            { $scope: scope },
            resolveInstances
          ));

          scope.close = function (result) {
            deferred.resolve(result);
            element.remove();
            scope.$destroy();
          };

          var compiledTemplateLinker = $compile(template);
          var element = compiledTemplateLinker(scope);

          angular.element($document[0].body).append(element);
        }).catch(function (err) {
          deferred.reject(err);
        });

      return deferred.promise;
    }
  }

})();

