/**
 * Created by Benson on 2016/9/23.
 */
app.controller('user_createCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'dataService', function($scope, $state, $rootScope, $stateParams, dataService) {

    //从登陆界面传来用户名
    var username = $stateParams.data;
    $scope.goMyQuestionnaire = function() {
        $state.go("user_create");
    }
    $scope.createNewquestion = function() {
        $state.go("created_detail", { data: username });
    }
    $scope.back_user_create = function() {
            location.reload();
        }
        //index.js
        //创建显示用户已经创建问卷的构造方法
    var Index = function() {
            this.delAll = $("#list_body_footer button:contains(删除)");
            this.checkboxs = $("#list_body_footer input")[0];
            this.checkAll = $(".list_table input");
            var that = this;
        }
        //创建Index的原型
    Index.prototype = {
            del: function() { //删除所有的记录
                this.delAll.click(function() {
                    $(".list_table input:checked")
                        .parent().remove();
                    dataService.delAllQuestionaireDataFun(function(data) { //删除所有问卷条数数据
                        console.log(data);
                        if (data == "删除所有问卷条数数据成功！") {
                            swal("全部删除成功！");
                        } else {
                            swal("删除失败！");
                        }
                    });
                    dataService.delAllQuestioneNumDataFun(function(data) { //删除所有问卷问题个数数据
                        console.log(data);
                    });
                    if ($(".list_table").length == 0) {
                        $("#main").hide()
                            .next().show();
                    };
                });
            },
            select: function() {
                $(this.checkboxs).click(function() {
                    var list = $(".list_table :checkbox");
                    for (var x = 0; x < list.length; x++) {
                        list[x].checked = this.checked; //选择全部的复选框
                    }
                });
                for (var j = 0; j < this.checkAll.length; j++) {
                    $(this.checkAll[j]).click(function() {
                        $("#list_body_footer input")[0].checked = false;
                        var storage = window.localStorage;
                        storage.clean();
                    });
                }
                $("#list_head button").click(function() { //点击又上角新建问卷  隐藏数据详细
                    $(this).parent().parent().hide();
                    $("#new").show();
                });
            },
            getData: function() {
                dataService.getQuestionnaireNumFun(function(data_h) { //获取问卷条数数据
                    dataService.getQuestionNumFun(function(data_b) { //获取问卷条数数据
                        for (let i = 0; i < data_h.length; i++) {
                            var merge_data = [];
                            for (let j = 0; j < data_b.length; j++) {

                                //获取问卷问题答案
                                dataService.queryAnswerFun(function(answerArr) {
                                    console.log(answerArr);
                                    answerArr.forEach(function(currentE, index) {
                                        data_b[j].q1 = answerArr[index].q1;
                                        data_b[j].q2 = answerArr[index].q2;
                                        data_b[j].q3 = answerArr[index].q3;
                                        data_b[j].q4 = answerArr[index].q4;
                                    });
                                    if (data_h[i].arrId == data_b[j].arrId) {
                                        merge_data.push(data_b[j]);
                                        // console.log(merge_data);
                                    }
                                }, data_b[j].questionId);
                            }
                            data_h[i].arr = merge_data;
                        }
                        console.log(data_h);
                        var storage = data_h; //合并问卷条数和问题条数
                        /**
                         * 获取问卷数据渲染出问卷条数
                         * 
                         */
                        if (storage.length == 0) {
                            $("#main").hide()
                                .next().show();
                        } else if (storage) {
                            for (var i = 0; i < storage.length; i++) {
                                // var getLocalData = JSON.parse(localStorage.getItem(i)); //获取问卷数据渲染出问卷条数
                                // this.render(getLocalData);
                                (function render(data) { //获取问卷数据渲染出问卷条数
                                    var isSatue;
                                    if (data.statue == 0) {
                                        isSatue = "未发布";
                                    }
                                    if (data.statue == 1) {
                                        isSatue = "已结束";
                                    }
                                    var list_table = $("<div class='list_table'><input type='checkbox'><span id='title_li'>" +
                                        data.tit + "</span><span>" +
                                        data.day + "</span><span>" +
                                        isSatue + "</span>" +
                                        "<button><a>编辑</a></button><button>删除</button><button>查看数据</button></div>");
                                    $("#list_body_footer").before(list_table);


                                })(storage[i]);

                            }
                        }
                        /**
                         * 编辑，查看数据，删除功能的实现
                         */

                        var edits = $(".list_table button:contains(编辑)");
                        var storageS = window.sessionStorage;
                        // alert(storageS);
                        for (var j = 0; j < storage.length; j++) {
                            (function(arg) {
                                $(edits[arg]).click(function() {
                                    storageS.setItem("msg", arg);
                                    $scope.createNewquestion();
                                });
                            })(j)
                        }
                        var looks = $(".list_table button:contains(查看数据)");
                        for (var n = 0; n < looks.length; n++) {
                            (function(n) {
                                $(looks[n]).click(function() {
                                    storageS.setItem("msg", n);
                                    var select_title = $(looks[n]).siblings("#title_li").text()
                                    console.log($(looks[n]).siblings("#title_li").text());




                                    $("#main").hide().
                                    next().next().show();

                                    //********************* */
                                    /**
                                     *   数据统计
                                     * 
                                     */
                                    var answerCount;
                                    var data_collect = [
                                        ['product', '答案一', '答案二', '答案三', '答案四']
                                    ];
                                    dataService.answerCountFun(function(data) {
                                        console.log(data);
                                        answerCount = data;
                                    }, select_title);
                                    setTimeout(function() {

                                        answerCount.forEach(function(currentE, index) {
                                            for (let i = 0; i < answerCount.length; i++) {
                                                var que_count_list = [];
                                                que_count_list.push(answerCount[index].quest);
                                                que_count_list.push(answerCount[index].count_one);
                                                que_count_list.push(answerCount[index].count_two);
                                                que_count_list.push(answerCount[index].count_three);
                                                que_count_list.push(answerCount[index].count_four);

                                            }
                                            data_collect.push(que_count_list);

                                        });

                                        console.log(data_collect);


                                        var myChart = echarts.init(document.getElementById('main1'));

                                        var option = {
                                            legend: {},
                                            tooltip: {},
                                            dataset: {
                                                source: data_collect

                                            },
                                            xAxis: {
                                                type: 'category',
                                                axisLabel: {

                                                }

                                            },
                                            yAxis: {
                                                show: true,

                                                color: "#ffffff",
                                                fontSize: 100

                                            },

                                            series: [{
                                                type: 'bar',
                                                label: {
                                                    show: true,
                                                    color: "#ffffff"
                                                },
                                                barCategoryGap: "50%",
                                                barGap: "0%"

                                            }, {
                                                type: 'bar',
                                                label: {
                                                    show: true,
                                                    color: "#ffffff"
                                                }
                                            }, {
                                                type: 'bar',
                                                label: {
                                                    show: true,
                                                    color: "#ffffff"
                                                }
                                            }, {
                                                type: 'bar',
                                                label: {
                                                    show: true,
                                                    color: "#ffffff"
                                                }
                                            }],

                                        };
                                        // 使用刚指定的配置项和数据显示图表。
                                        myChart.setOption(option);
                                        //后台获取数据


                                        // 基于准备好的dom，初始化echarts实例

                                    }, 300);









                                });
                            })(n)
                        }
                        var dels = $(".list_table button:contains(删除)");
                        for (var i = 0; i < dels.length; i++) {

                            (function(arg) {
                                $(dels[arg]).click(function() {
                                    var self = this;
                                    $(this).css("backgroundColor", " #ee7419");
                                    swal({
                                            title: "确定删除吗？",
                                            text: "你将无法恢复该文件！",
                                            showCancelButton: true,
                                            confirmButtonColor: "#DD6B55",
                                            confirmButtonText: "确定删除！",
                                            closeOnConfirm: true
                                        },
                                        function() {
                                            $(self).parent().remove();
                                            if ($(".list_table").length == 0) {
                                                $("#main").hide()
                                                    .next().show();
                                            }
                                            var currId = {
                                                "currId": storage[arg].arrId
                                            }
                                            dataService.delCurrentQuestionnaireNumDataFun(function(data) {
                                                console.log(data);
                                            }, currId);

                                            dataService.delCurrentQuestionNumDataFun(function(data) {
                                                console.log(data);
                                            }, currId);
                                        });
                                });
                            })(i)
                        }
                    });
                });
            }
        }
        //创建indexObj对象
    var indexObj = new Index();
    //对数据处理的行为
    //index_main

    (function index_main() {
        indexObj.del();
        indexObj.select();
        indexObj.getData();
    })();
    // index_main();


}]);