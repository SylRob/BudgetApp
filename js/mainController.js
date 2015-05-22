var MainController = function ( $scope, $routeParams, $location, DB ) {

    var data = DB.getElem();

    //is the user a new user ?
    if( !data ) {
        //yes, then
    } else {

    }

    $scope.data = data;

    $scope.newElem = {};
    $scope.removeElem = {};
    $scope.editElem = {};

}
