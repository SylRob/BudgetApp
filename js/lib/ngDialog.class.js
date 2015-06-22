function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
}

var ngDialog = (function() {

    var defaults = {
        class: '',
        content: '',
        pause: 2000
    }

    var userOptions = {}

    function ngDialog(){

        this.elem = '';
        this.init();
    }

    ngDialog.prototype.init = function() {

    }

    ngDialog.prototype.open = function(userOptions) {

        this.userOptions = extend(defaults, userOptions);

        this.elem = document.createElement('div');
        this.elem.classList.add('ngdialog');

        var insidElem = document.createElement('div');
        insidElem.classList.add('ngdialog-content');
        insidElem.classList.add(userOptions.class);
        insidElem.innerHTML = userOptions.content;

        this.elem.appendChild(insidElem)
        document.body.appendChild(this.elem);

        if('undefined' != typeof jQuery) this.openAnimation();
        else this.noJquery();
    }

    ngDialog.prototype.openAnimation = function() {
        var self = this;
        var $elem = $(this.elem);

        $elem.find('.ngdialog-content').css({
            opacity: 0,
            bottom: -50
        }).animate({
            opacity: 1,
            bottom: 10
        }, 200, function(){
            setTimeout(function(){ $elem.fadeOut(100, function(){ self.destroy() }); }, self.userOptions.pause);
        });

    }

    ngDialog.prototype.noJquery = function() {
        throw new Error('This module need jQuery');
        return false;

        var self = this;
        setTimeout(function(){
            self.destroy();
        }, self.userOptions.pause);
    }

    ngDialog.prototype.destroy = function() {
        this.elem.parentNode.removeChild(this.elem);
    }

    return ngDialog;
})();
