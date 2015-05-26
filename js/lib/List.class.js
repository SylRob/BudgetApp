
var List = (function() {

    function List( id, DB ) {

        this.DB = DB;
        this.infos = {};
        this.elems = [];

        if ( undefined != id && '' != id ) this.getFromId( id );

    }


    List.prototype.init = function() {
        var _this = this;
    }


    List.prototype.setInfos = function( data ) {

        this.infos.id = data.id || this.infos.id;
        this.infos.name = data.name || this.infos.name;
        this.infos.nbrOfElements = data.nbrOfElements || this.infos.nbrOfElements;

    }


    List.prototype.setElems = function( data ) {

        this.infos.nbrOfElements = Object.keys(data).length;

        this.elems = data;

    }


    List.prototype.getFromId = function( id ) {
        var _this = this;

        var lists = this.DB.getElem();

        for( var arrID in lists ) {

            if ( id == lists[arrID].infos.id ) {

                var myList = lists[arrID];
                _this.setInfos( myList.infos );
                _this.setElems( myList.elems );

                break;
            }

        }


    }


    List.prototype.erase = function() {
        var _this = this;

        if ( undefined == this.infos.id || '' == this.infos.id ) return false;

        var lists = this.DB.getElem();
        var toSave = [];

        for( var arrID in lists ) {

            if ( _this.infos.id != lists[arrID].infos.id ) {

                toSave.push( lists[arrID] );

            }
        }

        this.DB.storeElem( toSave );

    }


    List.prototype.save = function(update) {
        var _this = this;

        var myObj = {};
        myObj.infos = this.infos;
        myObj.elems = this.elems;

        if (!update) {
            /*
            new List,
            set creation date*/
            var date = new Date(),
            y = date.getFullYear(),
            m = ((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)),
            d = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
            myObj.dateOfCreation = y+m+d;
            this.DB.addData( myObj );
        } else {

            var lists = this.DB.getElem();

            for( var arrID in lists ) {

                if ( _this.infos.id == lists[arrID].infos.id ) {

                    lists[arrID] = myObj;

                    _this.DB.storeElem( lists );

                    break;
                }
            }


        }

    }

    List.prototype.addItem = function(data) {

        this.elems.push(data);
        this.save(true);

    }

    return List;

})();
