var HomeController = function ( $scope, $routeParams, $location, DB, ngDialog, List ) {

    $scope.listDatas = DB.getElem();

    var newModalElem = document.getElementById('modalNew');

    var parentScope = $scope.$parent;
    parentScope.newElem = function(){
        openModal()
    };

    var openModal = function(){
        $scope.form.name = '';
        $(newModalElem).find('input').val('');
        $(newModalElem).fadeIn(500, function(){ $(newModalElem).find('input').focus() })
    }

    $scope.modalClose = function() {
        $(newModalElem).fadeOut(500)
    }

    $scope.goTo = function(id) {
        parentScope.pageClass = 'RL';
        $location.path( '/'+id+'/Overview' );
    }

    $scope.modalSave = function() {

        var listToSave = new List.getInstance(false , DB),
        name = $scope.form.name || '';

        if( false === checkForm(name) ) return false;

        var myNewListObj = {};

        myNewListObj.name = name;
        myNewListObj.nbrOfElements = 0;
        myNewListObj.elem = {};

        myNewListObj.id = DB.getUniqueId();
        listToSave.setInfos( myNewListObj );

        listToSave.save( false );

        var listId = myNewListObj.id;
        $scope.listDatas = DB.getElem();
        $scope.modalClose();

        var dialogBox = new ngDialog.getInstance();
        dialogBox.open({
            content: '<p>The new list : '+name+' has been saved</p>',
            class: 'ngdialog-theme-green'
        })

    }

    function checkForm( name ) {
        var dialogBox = new ngDialog.getInstance();

        if( name == '' ) {
            dialogBox.open({
                content: '<p>A Budget list name cannot be empty</p>',
                class: 'ngdialog-theme-red'
            });
            return false;
        } else if( name.length > 50 ) {
            dialogBox.open({
                content: '<p>A Budget list name cannot more than 50 characters</p>',
                class: 'ngdialog-theme-red'
            });
            return false;
        }
    }

}
