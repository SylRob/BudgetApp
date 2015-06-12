var MainController = function ( $scope, $animate, $routeParams, $rootScope, $location, DB ) {

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
    $scope.pageClass = 'LR';

    $rootScope.$on( "$routeChangeSuccess", function(event, next, current) {

        var elem = document.querySelector("#wrapper");
        var viewElem = angular.element(elem),
        viewElemParent = viewElem.parent();
        $animate.addClass(viewElem, $scope.pageClass);

        $animate.on('enter', viewElem, function callback(element, phase) {

            if (phase === 'close') {
                $animate.removeClass(viewElem, $scope.pageClass);
            }
        });


    });

}
