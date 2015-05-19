var DBLocal = (function() {

    function DBLocal(myStorage) {
        this.storageName = myStorage;
        this.numberOfItems = null;
        this.init();
    }

    DBLocal.prototype.init = function() {

        if (!this.canUseLocalstorage()) {

            alert('ERROR\r\nyour smartphone cannot use LocalStorage wich is mandatory tu use this app');
            throw new Error('Local storage cannot be used on this device');
            return false;
        }

    }

    DBLocal.prototype.getElem = function() {

        var data = JSON.parse(window.localStorage.getItem(this.storageName));

        this.numberOfItems = data != null ? Object.keys(data).length : null;

        return data;

    }

    DBLocal.prototype.canUseLocalstorage = function() {
        return typeof(Storage) !== "undefined" ? true : false;
    }

    DBLocal.prototype.addData = function(obj) {

        if ( typeof(obj) == "object" ) {
            var oldData = !this.getElem() ? new Array() : this.getElem();

            oldData.push(obj);


            this.storeElem(oldData);
        }

    }

    DBLocal.prototype.storeElem = function(obj) {

        if ( typeof(obj) == "object" ) {

            this.numberOfItems = Object.keys(obj).length;
            window.localStorage.setItem(this.storageName, JSON.stringify(obj));

        } else {
            alert('ERROR\r\nan error append when we try to save');
            throw new Error('cannot store because the format of the data is not correct');
        }

    }

    DBLocal.prototype.getUniqueId = function() {
        var delim = "-";
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());

    }

    return DBLocal;

})();
