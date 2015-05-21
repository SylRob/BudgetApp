var lastTenResults = angular.module('lastTenResults', [])
.directive('lastTenResultsDirective', function(){
    return {
        templateUrl : "components/lastTenResults/lastTenResults.html",
        scope : {
            elemsData : '='
        }
    }
})
