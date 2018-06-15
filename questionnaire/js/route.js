/**
 * Created by Benson on 2016/9/22.
 */
app.config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when("", "/main/home");
    $urlRouterProvider.otherwise("/login");
    $stateProvider
        .state('login', { //这里的index是该状态的名称
            url: '/login',
            params: { data: {} },
            templateUrl: '../page/templats/login.html',
            controller: 'loginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: '../page/templats/register.html',
            controller: 'registerCtrl'
        })

    .state('data_analysis', { //测试
            url: '/data_analysis',
            templateUrl: '../page/templats/data_analysis.html',
            controller: 'data_analysisCtrl'
        })
        .state('user_create', {
            url: '/user_create',
            params: { data: {} },
            templateUrl: '../page/templats/user_create.html',
            controller: 'user_createCtrl'
        })
        .state('created_detail', {
            url: '/created_detail',
            params: { data: {} },
            templateUrl: '../page/templats/created_detail.html',
            controller: 'created_detailCtrl'
        })
        .state('questionnaire', {
            url: '/questionnaire?queTitle',
            params: { data: {} },
            templateUrl: '../page/templats/questionnaire.html',
            controller: 'questionnaireCtrl'
        })



});