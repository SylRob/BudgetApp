var dateFilter = angular.module('dateFilter', [])
.directive('dateFilterDirective', function(){
    return {
        templateUrl : "components/dateFilter/dateFilter.html",
        scope : {
            DFstartDate     : '=startDate',
            DFendDate       : '=endDate',
            DFcreationDate  : '@creationDate'
        },
        link : function($scope){
            $scope.DFchoosedDate = 'start';
            var date = new Date(),
            year = date.getFullYear(),
            month = (date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1),
            day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(),
            data = [],
            indice = 0;

            $scope.DFfrom = getFormatedDate( $scope.DFcreationDate );
            $scope.DFto = getFormatedDate( year+month+day );

        	$scope.changeDateFilter = function(){
                switch ($scope.DFchoosedDate) {
                    case 'start':
                        $scope.DFstartDate = $scope.DFcreationDate;
                        $scope.DFendDate = year+month+day;
                        break;
                    case 'today':
                        $scope.DFstartDate = year+month+day;
                        $scope.DFendDate = year+month+day;
                        break;
                    case 'week':
                        $scope.DFstartDate = getInlineDate(-7, 'day', date);
                        $scope.DFendDate = year+month+day;
                        break;
                    case 'month':
                        $scope.DFstartDate = getInlineDate(-1, 'month', date);
                        $scope.DFendDate = year+month+day;
                        break;
                    case '3 Month':
                        $scope.DFstartDate = getInlineDate(-3, 'month', date);
                        $scope.DFendDate = year+month+day;
                        break;
                    case '6 Month':
                        $scope.DFstartDate = getInlineDate(-6, 'month', date);
                        $scope.DFendDate = year+month+day;
                        break;
                    case 'year':
                        $scope.DFstartDate = getInlineDate(-1, 'year', date);
                        $scope.DFendDate = year+month+day;
                        break;
                    default:
                        $scope.DFstartDate = 0;
                        $scope.DFendDate = year+month+day;
                }

                $scope.DFfrom = getFormatedDate( $scope.DFstartDate );
                $scope.DFto = getFormatedDate( $scope.DFendDate );

        	}

            //trigger it for first turn
            $scope.changeDateFilter();

            $scope.DFprev = function(){

            }

            $scope.DFnext = function(){

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

                var fullDate = moment( inlineDate, 'YYYYMMDD' );

                return inlineDate;
            }

        }
    }
})
