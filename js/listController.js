var ListController = function ( $scope, $routeParams, $location, DB, ngDialog, List, Item, lastTenResults ) {

    var data = DB.getElem(),
    listId = $routeParams.listId,
    newModalElem = document.getElementById('modalNew'),
    eraseItem = document.getElementById('modalRemove'),
    eraseList = document.getElementById('modalRemoveList'),
    parentScope = $scope.$parent,
    theList = new List.getInstance( listId, DB );

    $scope.listInfo = theList.infos;
    $scope.originalList = theList.elems;
    $scope.elemsData = theList.elems;
    $scope.choosedDate = "start";
    $scope.startDate = '';
    $scope.endDate = '';

    parentScope.newElem = function(){
        openModal(false);
    };

    parentScope.removeElem = function( id ){
        var ItemToDelete = new Item.getInstance( id, theList );
        $scope.ItemToErase = ItemToDelete.infos.name;
        $scope.eraseId = id;

        $(eraseItem).fadeIn(500, function(){});
    }

    $scope.eraseIt = function() {
        var ItemToDelete = new Item.getInstance( $scope.eraseId, theList );
        ItemToDelete.erase();
        $scope.ListInfo = theList.infos;
        $scope.elemsData = theList.elems;
        $scope.modalClose();
        var dialogBox = new ngDialog.getInstance();
        dialogBox.open({
            content: '<p>'+$scope.ItemToErase+' has been remove</p>',
            class: 'ngdialog-theme-green'
        });

    }

    parentScope.editElem = function( id ) {
        var itemObj = new Item.getInstance( id, theList );

        $scope.form.name = itemObj.infos.name;
        $scope.form.price = itemObj.infos.price;
        $scope.form.id = itemObj.infos.id;

        openModal(true);
    }

    var openModal = function( edit ){
        if( !edit ) {
            $scope.form.name = $scope.form.price = $scope.form.id = '';
            $(newModalElem).find('input').val('');
        }
        $(newModalElem).fadeIn(500, function(){ $(newModalElem).find('input').eq(1).focus() });
    }

    $scope.modalClose = function() {
        $('.modal:visible').fadeOut(500)
    }

    $scope.editList = function() {
        $('#listName input').removeAttr('disabled');
        $('#listName input').focus();

        $('#listName input').on('blur', function(){

            if( !checkListName($('#listName input').val()) ) $('#listName input').val(theList.infos.name);
            else {
                theList.setInfos( {name : $('#listName input').val()} );
                theList.save(true);
                $scope.listInfo = theList.infos;
                $scope.elemsData = theList.elems;
                var dialogBox = new ngDialog.getInstance();
                dialogBox.open({
                    content: '<p>The Budget has a new name : <i>'+$('#listName input').val()+'</i></p>',
                    class: 'ngdialog-theme-green'
                })
            }

            $('#listName input').attr('disabled', 'disabled');

        })
    }

    $scope.removeList = function() {
        $(eraseList).fadeIn(500, function(){});
    }

    $scope.eraseTheList = function() {
        var listToDelete = new List.getInstance( listId, DB );
        listToDelete.erase();
        $location.path( '/' );
    }

    $scope.changeDateFilter = function(){
        console.log($scope.choosedDate);
    }


    $scope.modalSave = function() {

        var name = $scope.form.name || '',
        price = $scope.form.price || '',
        idElem = $scope.form.id || false;

        if( false === checkForm(name, price) ) return false;

        var myNewItemObj = {};

        myNewItemObj.name = name;
        myNewItemObj.price = price;

        myNewItemObj.id = !idElem ? DB.getUniqueId() : idElem;

        var itemToSave = new Item.getInstance( !idElem ? false : idElem, theList );
        itemToSave.setInfos( myNewItemObj );
        itemToSave.save( !idElem ? false : true );

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

    function checkForm( name, price ) {
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
        return true;
    }

    function checkListName( name ) {
        var dialogBox = new ngDialog.getInstance();

        if( name == '' ) {
            dialogBox.open({
                content: '<p>The Budget name cannot be empty</p>',
                class: 'ngdialog-theme-red'
            });
            return false;
        } else if( name.length > 50 ) {
            dialogBox.open({
                content: '<p>The Budget name cannot more than 50 characters</p>',
                class: 'ngdialog-theme-red'
            });
            return false;
        }

        return true;

    }

}
