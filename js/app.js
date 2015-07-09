/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

document.addEventListener('deviceready', function() {


}, false);

var angularBudgetApp = angular.module('BudgetApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'lastTenResults', 'dateFilter'])
.config( ['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/top', {
            templateUrl: 'templates/top.html',
            controller: 'HomeController'
        })
        .when('/:listId/Overview', {
            templateUrl: 'templates/list.html',
            controller: 'ListController'
        })
        .otherwise({
            redirectTo: '/top'
        });
    }
])
.factory('DB', function(){
    return new DBLocal('BudgetApp');
})
.factory('ngDialog', function(){
    return {
        getInstance: ngDialog
    }
})
.factory('List', ['DB', function(){
    return {
        getInstance: List
    }
}])
.factory('Item', ['List', function(){
    return {
        getInstance: Item
    }
}])
.filter('sumOfPriceService', function(){
    return function( data, key ){

        if(data !== Object(data)) return 0;

        var sum = 0;
        for (var i = 0; i < data.length; i++) {
             sum += parseInt(data[i].infos.price);
        }

        return sum;
    }
})
.filter('dateFormatFilter', function($filter){
    return function( data ){
        var dateElem = data.substr(-2, 2) + '/' + data.substr(-4, 2) + '/' +data.substr(0, 4);
        return dateElem;
    }
})
.controller('MainController', ['$scope', '$animate', '$routeParams', '$rootScope', '$location', 'DB', MainController])
.controller('HomeController', ['$scope', '$routeParams', '$location', 'DB', 'ngDialog', 'List', HomeController])
.controller('ListController', ['$scope', '$routeParams', '$location', 'DB', 'ngDialog', 'List', 'Item', ListController]);
