
var Item = (function() {

    function Item( id, List ) {

        this.List = List;
        this.infos = {};

        if ( undefined != id && '' != id ) this.getFromId( id );
    }


    Item.prototype.init = function() {
        var _this = this;

    }


    Item.prototype.setInfos = function( data ) {

        this.infos.id = data.id;
        this.infos.name = data.name;
        this.infos.creationDate = data.creationDate;
        this.infos.montant = data.montant;
    }

    Item.prototype.getFromId = function( id ) {
        var _this = this;

        var items = this.List.items;

        for( var arrID in items ) {

            if ( id == items[arrID].infos.id ) {

                var myItem = items[arrID].infos;

                _this.setInfos(myItem);

                break;
            }

        }


    }


    Item.prototype.erase = function() {
        var _this = this;

        if ( undefined == this.infos.id || '' == this.infos.id ) return false;

        var items = this.List.items;
        var toSave = [];

        for( var arrID in items ) {

            if ( _this.infos.id != items[arrID].infos.id ) {
                toSave.push( items[arrID] );
            }
        }

        this.List.setItems( toSave );
        this.List.save(true);

    }


    Item.prototype.save = function(update) {
        var _this = this;

        var myObj = {};

        myObj.infos = this.infos;

        if (!update) {
            this.List.addItem( myObj );
        } else {

            var items = this.List.items;

            for( var arrID in items ) {

                if ( _this.infos.id == items[arrID].infos.id ) {

                    items[arrID] = myObj;

                    _this.List.setItems( items );
                    _this.List.save(true);

                    break;
                }
            }

        }

    }

    return Item;

})();
