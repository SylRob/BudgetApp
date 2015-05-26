
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

        this.infos.id = data.id || this.infos.id;
        this.infos.name = data.name || this.infos.name;
        this.infos.price = data.price || this.infos.price;
    }

    Item.prototype.getFromId = function( id ){

        var _this = this;

        var items = this.List.elems;

        for( var arrID in items ) {

            if ( id == items[arrID].infos.id ) {

                var myItem = items[arrID].infos;
                _this.dateOfCreation = items[arrID].dateOfCreation;
                _this.setInfos(myItem);

                break;
            }

        }

    }


    Item.prototype.erase = function() {
        var _this = this;

        if ( undefined == this.infos.id || '' == this.infos.id ) return false;

        var items = this.List.elems;
        var toSave = [];

        for( var arrID in items ) {

            if ( _this.infos.id != items[arrID].infos.id ) {
                toSave.push( items[arrID] );
            }
        }

        this.List.setElems( toSave );
        this.List.save(true);

    }


    Item.prototype.save = function(update) {
        var _this = this;

        var myObj = {};

        myObj.infos = this.infos;

        if (!update) {
            /*
            new Item,
            set creation date*/
            var date = new Date(),
            y = date.getFullYear(),
            m = ((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)),
            d = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
            myObj.dateOfCreation = y+m+d;
            this.List.addItem( myObj );
        } else {

            var items = this.List.elems;
            for( var arrID in items ) {

                if ( _this.infos.id == items[arrID].infos.id ) {
                    myObj.dateOfCreation = _this.dateOfCreation;

                    items[arrID] = myObj;

                    _this.List.setElems( items );
                    _this.List.save(true);

                    break;
                }
            }

        }

    }

    return Item;

})();
