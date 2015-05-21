var ListController = function ( $scope, $routeParams, $location, DB, ngDialog, List, Item, lastTenResults ) {

    var data = DB.getElem(),
    listId = $routeParams.listId,
    newModalElem = document.getElementById('modalNew'),
    parentScope = $scope.$parent,
    theList = new List.getInstance( listId, DB );

    $scope.listInfo = theList.infos;
    $scope.elemsData = theList.elems;


    parentScope.newElem = function(){
        openModal()
    };

    var openModal = function(){
        $(newModalElem).find('input').val('');
        $(newModalElem).fadeIn(500, function(){ $(newModalElem).find('input').eq(0).focus() })
    }

    $scope.modalClose = function() {
        $(newModalElem).fadeOut(500)
    }

    $scope.modalSave = function() {

        var theList = new List.getInstance(listId , DB),
        itemToSave = new Item.getInstance( false, theList ),
        name = $scope.form.name || '',
        price = $scope.form.price || '';

        if( false === checkForm(name, price) ) return false;

        var myNewItemObj = {};

        myNewItemObj.name = name;
        myNewItemObj.price = price;

        myNewItemObj.id = DB.getUniqueId();
        itemToSave.setInfos( myNewItemObj );

        itemToSave.save( false );

        var itemId = myNewItemObj.id;
        theList = new List.getInstance( listId, DB );
        $scope.listInfo = theList.infos;
        $scope.elemsData = theList.elems;

        $scope.modalClose();

        var dialogBox = new ngDialog.getInstance();
        dialogBox.open({
            content: '<p>The new item : '+name+' has been saved</p>',
            class: 'ngdialog-theme-green'
        })

    }

    function checkForm ( name, price ) {
        var dialogBox = new ngDialog.getInstance();

        if( name == '' || price == '' ) {
            dialogBox.open({
                content: '<p>A Budget item must have a name and a price</p>',
                class: 'ngdialog-theme-red'
            });
            return false;
        } else if( name.length > 50 ) {
            dialogBox.open({
                content: '<p>A Budget Item name cannot more than 50 characters</p>',
                class: 'ngdialog-theme-red'
            });
            return false;
        } else if( isNaN(price) || price > 1000000 ){
            dialogBox.open({
                content: '<p>A Budget Item price must be a number between 0 and 1 000 000</p>',
                class: 'ngdialog-theme-red'
            });
            return false;
        }
    }

}
