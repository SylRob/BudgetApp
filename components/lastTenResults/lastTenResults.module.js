var lastTenResults = angular.module('lastTenResults', [])
.directive('lastTenResultsDirective', function(){
    return {
        templateUrl : "components/lastTenResults/lastTenResults.html",
        scope : {
            LTRelemsData : '=elemsData',
            LTRremoveElem: '=removeElem',
            LTReditElem:   '=editElem'
        }
    }
})
