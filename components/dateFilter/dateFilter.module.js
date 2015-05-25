var dateFilter = angular.module('dateFilter', [])
.directive('dateFilterDirective', function(){
    return {
        templateUrl : "components/dateFilter/dateFilter.html",
        scope : {
            DFchoosedDate: '=choosedDate',
            DFelemsData: '=elemsData'
        },
        link : function($scope){
            var date = new Date();
            var year = date.getFullYear();
            var month = (date.getMont()+1) < 10 ? '0'+(date.getMont()+1) : (date.getMont()+1);
            var day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();

        	$scope.changeDateFilter = function(){
                var data = '';


        		if( $scope.DFchoosedDate == 'start' ) {
                    $scope.startDate = '';
                    $scope.endDate = '';

                    
                }
        	}

        }
    }
})
