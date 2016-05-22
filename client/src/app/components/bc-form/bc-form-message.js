(function () {
  'use strict';

  angular
    .module('bcForm')
    .directive('validateMessagesForm', directive);

  directive.$inject = ['$compile'];

  /* @ngInject */
  function directive($compile) {
    var directive = {
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs, controller) {
      var formName = element.attr('validate-messages-form'),
        inputName = element.attr('validate-messages-input'),
        messages = angular.element(
          '<div ng-messages="' + formName + '.' + inputName + '.$error">' +
          '<div ng-messages-include="errorMessages.html"></div>' +
          '</div>'
        ),
        input = element.find('input'),
        textArea = element.find('textarea'),
        compiledMessages = $compile(messages)(scope),
        inputEle;

      inputEle = input.length ? input : textArea;

      element.append(compiledMessages);

      compiledMessages.css({
        'display': 'none'
      });

      inputEle.on('focusout', function () {
        compiledMessages.css({
          'display': 'block'
        });
      });

      inputEle.on('focusin', function () {
        compiledMessages.css({
          'display': 'none'
        });
      });
    }
  }
})();