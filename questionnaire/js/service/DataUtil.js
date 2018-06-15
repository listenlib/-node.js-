/**
 * Created by Administrator on 2016/3/9 0009.
 */
app.factory('dataUtil', function($http) {
    return {
        //writting by listen
        normalService_Post: function(options) {
            $http({
                url: options.serviceUrl,
                method: "post",
                data: options.data,
                timeout: 30000
            }).success(function(data) {

                if (data.exception) {
                    // util.hideLoading();
                    // util.showMsg('接口异常');

                    // options.callback(data);
                } else {
                    options.callback(data);
                }
            }).error(function(data) {
                swal("接口异常");
                // util.hideLoading();
                // util.showMsg('数据请求异常，请检查');
                // if (options.callbackError) {
                //     options.callbackError(data);
                // }
            })
        }
    }
});