var HomeController = function ( $scope, $routeParams, $location, DB ) {

    $scope.listData = DB.getElem();

    var parentScope = $scope.$parent;
    parentScope.newElem = function(){
        console.log('its me !!');
    };

}
