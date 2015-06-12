var dateFilter = angular.module('dateFilter', [])
.directive('dateFilterDirective', function(){
    return {
        templateUrl : "components/dateFilter/dateFilter.html",
        scope : {
            DFstartDate     : '=startDate'
            ,DFendDate      : '=endDate'
            ,DFnewestElem   : '@newestElem'
            ,DFoldestElem   : '@oldestElem'
        },
        link : function($scope){

            var today       = moment().format('YYYYMMDD'),
            DFnewestElemVar = $scope.DFnewestElem == 0 ? today : $scope.DFnewestElem,
            DFoldestElemVar = $scope.DFnewestElem == 0 ? today : $scope.DFoldestElem,
            firstDate       = DFnewestElemVar,
            indice          = 0,
            dateToPass      = firstDate;

            $scope.DFchoosedDate    = 'start';
            $scope.DFfrom           = getFormatedDate( DFoldestElemVar );
            $scope.DFto             = getFormatedDate( DFnewestElemVar );

        	$scope.changeDateFilter = function(){
                indice = 0;
                $scope.DFstartDate = dateToPass = firstDate;
                applyFilter();

        	}
            //trigger it after load
            $scope.changeDateFilter();

            function applyFilter( side ) {

                var side = side || 'prev';

                switch ($scope.DFchoosedDate) {
                    case 'start':
                        $scope.DFstartDate = DFoldestElemVar;
                        $scope.DFendDate = firstDate;
                        break;
                    case 'day':
                        $scope.DFstartDate = getInlineDate(indice, 'day', firstDate);
                        $scope.DFendDate = $scope.DFstartDate;
                        break;
                    case 'week':
                        $scope.DFstartDate = getInlineDate(indice, 'week', firstDate, 'start');
                        $scope.DFendDate = getInlineDate(indice, 'week', firstDate, 'end');
                        break;
                    case 'month':
                        $scope.DFstartDate = getInlineDate(indice, 'month', firstDate, 'start');
                        $scope.DFendDate = getInlineDate(indice, 'month', firstDate, 'end');
                        break;
                    case '3 Month':
                        if( side == 'next' ){
                            $scope.DFendDate = getInlineDate(3 , 'month', dateToPass, 'end');
                            $scope.DFstartDate = dateToPass;
                        } else {
                            $scope.DFstartDate = getInlineDate(-3, 'month', dateToPass, 'start');
                            $scope.DFendDate = dateToPass;
                        }

                        break;
                    case '6 Month':
                        if( side == 'next' ){
                            $scope.DFendDate = getInlineDate(6, 'month', dateToPass, 'end');
                            $scope.DFstartDate = dateToPass;
                        } else {
                            $scope.DFstartDate = getInlineDate(-6, 'month', dateToPass, 'start');
                            $scope.DFendDate = dateToPass;
                        }

                        break;
                    case 'year':
                        $scope.DFstartDate = getInlineDate(indice, 'year', firstDate, 'start');
                        $scope.DFendDate = getInlineDate(indice, 'year', firstDate, 'end');
                        break;
                    default:
                        $scope.DFstartDate = DFoldestElemVar;
                        $scope.DFendDate = firstDate;
                }

                $scope.DFfrom = getFormatedDate( $scope.DFstartDate );
                $scope.DFto = getFormatedDate( $scope.DFendDate );

            }

            $scope.DFprev = function(){

                if( $scope.DFstartDate <= $scope.DFoldestElem ) return false;

                var elem = $('#DFsecondChoice .inner .range'),
                elemW = $('#DFsecondChoice .inner').width();

                elem.animate({
                    left : elemW
                }, 200, 'linear', function(){

                    $(this).css({
                        left : (elemW*-1)
                    }).animate({
                        left : 0
                    }, 200);

                    indice = indice-1;
                    dateToPass = $scope.DFstartDate;
                    applyFilter( 'prev' );
                    $scope.$apply();
                })
            }

            $scope.DFnext = function(){

                if( $scope.DFendDate >= $scope.DFnewestElem ) return false;

                var elem = $('#DFsecondChoice .inner .range'),
                elemW = $('#DFsecondChoice .inner').width();

                elem.animate({
                    left : (elemW*-1)
                }, 200, 'linear', function(){

                    $(this).css({
                        left : elemW
                    }).animate({
                        left : 0
                    }, 200)

                    indice = indice+1;
                    dateToPass = $scope.DFendDate;
                    applyFilter( 'next' );
                    $scope.$apply();

                });

            }


            function getInlineDate( nbrToSub, monthYearDay, date, startEnd ){

                if( isNaN(nbrToSub) ) {
                    nbrToSub = 0;
                    return date;
                }

                var fullDate = moment( date, 'YYYYMMDD' );

                var newDate = new Date(date);

                if( monthYearDay === 'day' ) {
                    if( nbrToSub < 0 ) fullDate.subtract((nbrToSub)*-1, 'day');
                    else if( nbrToSub > 0 ) fullDate.add(nbrToSub, 'day');

                }
                else if( monthYearDay === 'week' ) {
                    if( nbrToSub < 0 ) fullDate.subtract((nbrToSub)*-1, 'week');
                    else if( nbrToSub > 0 ) fullDate.add(nbrToSub, 'week');

                    if( startEnd === 'start' ) fullDate.startOf('isoweek');
                    else if( startEnd === 'end' ) fullDate.endOf('isoweek');
                }
                else if( monthYearDay === 'month' ){
                    if( nbrToSub < 0 ) fullDate.subtract((nbrToSub)*-1, 'month');
                    else if( nbrToSub > 0 ) fullDate.add(nbrToSub, 'month');

                    if( startEnd === 'start' ) fullDate.startOf('month');
                    else if( startEnd === 'end' ) fullDate.endOf('month');
                }
                else if( monthYearDay === 'year' ) {
                    if( nbrToSub < 0 ) fullDate.subtract((nbrToSub)*-1, 'year');
                    else if( nbrToSub > 0 ) fullDate.add(nbrToSub, 'year');

                    if( startEnd === 'start' ) fullDate.startOf('year');
                    else if( startEnd === 'end' ) fullDate.endOf('year');
                }

                if( (startEnd === 'start' || monthYearDay === 'day') && fullDate.format('YYYYMMDD') < DFoldestElemVar ) return DFoldestElemVar;
                else if( (startEnd === 'end' || monthYearDay === 'day') && fullDate.format('YYYYMMDD') > DFnewestElemVar ) return DFnewestElemVar;

                return fullDate.format('YYYYMMDD');
            }

            function getFormatedDate(inlineDate){

                var fullDate = moment( inlineDate, 'YYYYMMDD' );

                return {
                    day   : fullDate.format('dddd')
                    ,date : fullDate.format('YYYY/MM/DD')
                    ,month: fullDate.format('MMMM')
                    ,year : fullDate.format('YYYY')
                }
            }

        }
    }
})
