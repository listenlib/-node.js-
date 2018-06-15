/**
 * Created by 34279 on 2016/11/2.
 */
app.factory('dataService', ['dataUtil', function(dataUtil) {
    return {
        loginFun: function(callback, param) { //登录请求
            var option = {};
            option.serviceUrl = URL + 'login';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },
        registerFun: function(callback, param) { //注册请求
            var option = {};
            option.serviceUrl = URL + 'register';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },
        userQuestionInsertFun: function(callback, param) { //用户问卷条数及问题个数插入数据库


            var option = {};
            option.serviceUrl = URL + 'QuestionInsert';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },


        getQuestionnaireNumFun: function(callback, param) { //用户问卷条数插入数据库


            var option = {};
            option.serviceUrl = URL + 'getQuestionnaireNum';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },
        getQuestionNumFun: function(callback, param) { //用户问题个数插入数据库


            var option = {};
            option.serviceUrl = URL + 'getQuestionNum';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },
        delAllQuestionaireDataFun: function(callback, param) { //删除所有问卷条数数据


            var option = {};
            option.serviceUrl = URL + 'delAllQuestionaireData';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },

        delAllQuestioneNumDataFun: function(callback, param) { //删除所有问卷问题个数数据


            var option = {};
            option.serviceUrl = URL + 'delAllQuestioneNumData';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },

        delCurrentQuestionnaireNumDataFun: function(callback, param) { //删除当前问卷问题个数数据


            var option = {};
            option.serviceUrl = URL + 'delCurrentQuestionnaireNumData';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },


        delCurrentQuestionNumDataFun: function(callback, param) { //删除当前问卷问题个数数据


            var option = {};
            option.serviceUrl = URL + 'delCurrentQuestionNumData';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },
        queryCreaterQueFun: function(callback, param) { //查询出创建用户名字，并且查出创建的问题
            var option = {};
            option.serviceUrl = URL + 'queryCreaterQue';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },
        testFun: function(callback, param) { //测试
            var option = {};
            option.serviceUrl = URL + 'queryCreaterQue';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        },
        queryAnswerFun: function(callback, param) { //查询出问题答案
            var option = {};
            option.serviceUrl = URL + 'queryAnswer';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        }

        ,
        answerCountFun: function(callback, param) { //测试
            var option = {};
            option.serviceUrl = URL + 'answerCount';
            option.data = param;
            option.callback = function(data) {
                return callback(data);
            };
            dataUtil.normalService_Post(option);

        }












    }
}]);