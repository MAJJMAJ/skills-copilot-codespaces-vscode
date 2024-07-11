function skillsMember() {
  return {
    restrict: 'E',
    scope: {
      member: '='
    },
    templateUrl: 'views/member.html',
    link: function(scope, element, attrs) {
      scope.skills = scope.member.skills;
    }
  };
}