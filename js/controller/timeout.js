
function TimeoutCtrl($scope, $rootScope, $http, $location) {

    $scope.init = function() {
        $rootScope.baseUrl = baseUrl;
        $rootScope.user = user;

        $scope.model = {};
        $scope.model.leaderboard = leaderboard;
        $scope.model.startButtonText = null;
        $scope.model.startButtonEnabled = true;

        console.log("leaderboard", leaderboard, $scope.model.leaderboard);
    }

    $scope.startPlaying = function() {
        $scope.model.startButtonText = "Starting...";
        $scope.model.startButtonEnabled = true;
        $http.post(baseUrl + 'index.php/timeline/username_store', {
            'user_id': $rootScope.user.id,
            'name':  $rootScope.user.name
        }).success(function(data) {
            $location.path('/game');
        });
    }
}
