var dateFilter = angular.module('dateFilter', [])
.directive('dateFilterDirective', function(){
    return {
        templateUrl : "components/dateFilter/dateFilter.html",
        scope : {
            DFchoosedDate   : '=choosedDate',
            DFelemsData     : '=elemsData',
            DForiginalList  : '=originalList'
        },
        link : function($scope){
            var date = new Date(),
            year = date.getFullYear(),
            month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1),
            day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(),
            data = [];

            $scope.DFfrom = getFormatedDate( year+month+day );
            $scope.DFto = getFormatedDate( year+month+day );

        	$scope.changeDateFilter = function(){
                switch ($scope.DFchoosedDate) {
                    case 'start':
                        $scope.startDate = 0;
                        $scope.endDate = year+month+day;
                        break;
                    case 'today':
                        $scope.startDate = year+month+day;
                        $scope.endDate = year+month+day;
                        break;
                    case 'week':
                        $scope.startDate = getInlineDate(-7, 'day', date);
                        $scope.endDate = year+month+day;
                        break;
                    case 'month':
                        $scope.startDate = getInlineDate(-1, 'month', date);
                        $scope.endDate = year+month+day;
                        break;
                    case 'threeMonth':
                        $scope.startDate = getInlineDate(-3, 'month', date);
                        $scope.endDate = year+month+day;
                        break;
                    case 'sixMonth':
                        $scope.startDate = getInlineDate(-6, 'month', date);
                        $scope.endDate = year+month+day;
                        break;
                    case 'year':
                        $scope.startDate = getInlineDate(-1, 'year', date);
                        $scope.endDate = year+month+day;
                        break;
                    default:
                        $scope.startDate = 0;
                        $scope.endDate = year+month+day;
                }
                $scope.DFelemsData = [];
                $scope.DFelemsData = epurer( $scope.startDate, $scope.endDate );

        	}

            function epurer(dateStart, dateEnd){
                data = [];
                for(var key in $scope.DForiginalList ) {
                    if( dateStart <= $scope.DForiginalList[key].dateOfCreation && $scope.DForiginalList[key].dateOfCreation <= dateEnd ) {
                         data.push($scope.DForiginalList[key]);
                    }
                }
                return data;
            }

            function getInlineDate( nbrToSub, monthYearDay, date ){

                if( isNaN(nbrToSub) ) nbrToSub = 0;

                var newDate = new Date(date);

                if( monthYearDay == 'day' )
                    newDate.setDate( newDate.getDate() - (nbrToSub*-1) )
                if( monthYearDay == 'month' )
                    newDate.setMonth( newDate.getMonth() - (nbrToSub*-1) )
                    if( monthYearDay == 'year' )
                        newDate.setYear( newDate.getFullYear() - (nbrToSub*-1) )

                var newYear = newDate.getFullYear(),
                newMonth = (newDate.getMonth()+1) < 10 ? '0'+(newDate.getMonth()+1) : (newDate.getMonth()+1),
                newDay = (newDate.getDate() < 10 ? '0'+newDate.getDate() : newDate.getDate());

                return newYear + newMonth + newDay;
            }

            function getFormatedDate(inlineDate){
                return inlineDate;
            }

        }
    }
})
