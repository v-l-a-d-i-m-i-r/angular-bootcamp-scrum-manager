(function () {
  'use strict';

  angular
    .module('bcGithub', [])
    .config(function (bcGithubProvider, GITHUB_CREDENTIANLS) {
      bcGithubProvider.setUrl('http://' + GITHUB_CREDENTIANLS + '@github.com');
    })

})();
