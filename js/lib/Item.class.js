
var Item = (function() {

    function Item( id, List ) {

        this.List = List;
        this.config = {};
        this.infos = {};
        this.done = false;

        if ( undefined != id && '' != id ) this.getFromId( id );



    }


    Item.prototype.init = function() {
        var _this = this;

    }


    Item.prototype.setInfos = function( data ) {

        this.infos.id = data.id;
        this.infos.name = data.name;
        this.infos.memo = data.memo;
        this.infos.from = data.from;
        this.infos.to = data.to;
        this.done = data.done;
    }

    Item.prototype.setConfig = function( data ) {

        this.config.notify = data.notify;
        this.config.notifyTime = data.notifyTime;

    }


    Item.prototype.setDone = function() {

        if ( this.done ) this.done = false;
        else this.done = true;

    }


    Item.prototype.getFromId = function( id ) {
        var _this = this;

        var items = this.List.items;

        for( var arrID in items ) {

            if ( id == items[arrID].infos.id ) {

                var myItem = items[arrID].infos;

                myItem.done = items[arrID].done;
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
        myObj.config = this.config;
        myObj.done = this.done;

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
