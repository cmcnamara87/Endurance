function GameCtrl($rootScope, $scope, $http, $location) {
    $scope.init = function() {

        if(!angular.isDefined($rootScope.user)) {
            $location.path("/");
        }
        $scope.model = {};
        $scope.model.level = 0;

        // Create all the image urls
        $scope.model.imageUrls = [];
        for(var i = 1; i <= 150; i++) {
            $scope.model.imageUrls.push(baseUrl + "img/myouseum150-images/" + i + ".jpg");
        }
        $scope.model.imageIndex = 0;
        $scope.model.imageUrl = function() {
            return $scope.model.imageUrls[$scope.model.imageIndex];
        };


        // Create the time keeper!
        setInterval(function() {
            $scope.$apply(function() {

                // go the next image (2 seconds passed)
                $scope.model.imageIndex++;
                if(($scope.model.level + 1) * $scope.model.imageIndex > $rootScope.user.highScore) {
                    $rootScope.user.highScore = $scope.model.imageIndex;
                }
                if($scope.model.imageIndex == 150) {
                    $scope.model.imageIndex = 0;
                    $scope.model.level++;
                }

                if($scope.model.imageIndex % 2 == 0) {
                    // post to the server
                    $http.post(baseUrl + 'index.php/timeline/store_score', {
                        'user_id': $rootScope.user.id,
                        'high_score':  ($scope.model.level + 1) * $scope.model.imageIndex
                    }).success(function(data) {

                       console.log(data);
                    });
                }
            });


        }, 2000);
    }
}