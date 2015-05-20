var HomeController = function ( $scope, $routeParams, $location, DB, ngDialog ) {

    $scope.listDatas = DB.getElem();

    var newModalElem = document.getElementById('modalNew');

    var parentScope = $scope.$parent;
    parentScope.newElem = function(){
        openModal()
    };

    var openModal = function(){
        $(newModalElem).fadeIn(500, function(){ $(newModalElem).find('input').focus() })
    }

    $scope.modalClose = function() {
        $(newModalElem).fadeOut(500)
    }

    $scope.modalSave = function() {

        var listToSave = new List( false , DB );

        var myNewListObj = {};

        myNewListObj.name = $scope.form.name;
        myNewListObj.nbrOfElements = 0;
        myNewListObj.elem = {};

        myNewListObj.id = DB.getUniqueId();
        listToSave.setInfos( myNewListObj );

        listToSave.save( false );

        var listId = myNewListObj.id;
        $scope.listDatas = DB.getElem();
        $scope.modalClose();

        ngDialog.open({
            content: '<p>The new list : '+$scope.form.name+' has been saved</p>',
            class: 'ngdialog-theme-green'
        })

    }

}
