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

    console.log("deviceready");


}, false);

var myApp = angular.module('BudgetApp', ['ngRoute'])
.config( ['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/top', {
            templateUrl: 'templates/top.html',
            controller: 'HomeController'
        }).
        otherwise({
            redirectTo: '/top'
        });
    }
])
.factory('DB', function(){
    return new DBLocal('BudgetApp');
})
.controller('MainController', ['$scope', '$routeParams', '$location', 'DB', MainController])
.controller('HomeController', ['$scope', '$routeParams', '$location', 'DB', HomeController])
