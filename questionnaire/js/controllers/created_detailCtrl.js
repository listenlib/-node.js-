/**
 * Created by Benson on 2016/9/23.
 */
app.controller('created_detailCtrl', ['$scope', '$state', '$rootScope', '$stateParams', 'dataService', function($scope, $state, $rootScope, $stateParams, dataService) {

    //从用户创建那里传来用户名
    var username = $stateParams.data;
    // console.log(username);

    //返回到我的问卷的页面
    $scope.goMyQuestionnaire = function() {

        $state.go("user_create");
    };

    //requirejs的迁移

    //显示出单选，多选文本的按钮
    $("#edit_add").click(function() {
        $(this).prev().slideDown(800);
    });



    //创建edit对象
    var Edit = function() {
        this.questionArr = [];
        this.storageArr = [];
        var self = this;
    }


    //edit对象继承

    Edit.prototype = {
        addQ: function() {
            $("#edit_add").click(function() {
                $(this).prev().slideDown(800);
            });
        },
        //问题数组操作按钮添加
        queFun: function() {
            var self = this;
            $.each(self.questionArr, function(key, val) {
                val.find("i").text(key + 1);
                if (key == 0) {
                    val.find(".hand").html("<div id='down'>下移</div><div id='reuse'>复用</div><div id='del'>删除</div>");
                    $("#edit_body_list").append(val);
                } else if (key == self.questionArr.length - 1) {
                    val.find(".hand").html("<div id='up'>上移</div><div id='reuse'>复用</div><div id='del'>删除</div>");
                    $("#edit_body_list").append(val);
                } else {
                    val.find(".hand").html("<div id='up'>上移</div><div id='down'>下移</div><div id='reuse'>复用</div>" +
                        "<div id='del'>删除</div>");
                    $("#edit_body_list").append(val);
                }
            });
        },
        //下移函数
        downFun: function(el) {
            var x = -20;
            $node = $(el).parent().parent();
            if ($node.next(":first").length == 0) {
                return;
            } else {
                for (var i = 0; i < this.questionArr.length; i++) {
                    if (this.questionArr[i][0] == $node[0]) {
                        x = i;
                    }
                }
                this.changeArr(this.questionArr, x, x + 1);
                this.changeArr(this.storageArr, x, x + 1);
                this.queFun();
            }
        },
        //上移函数
        upFun: function(el) {
            var x = -20,
                $node = $(el).parent().parent();
            for (var i = 0; i < this.questionArr.length; i++) {
                if (this.questionArr[i][0] == $node[0]) {
                    x = i;
                }
            }
            this.changeArr(this.questionArr, x, x - 1);
            this.changeArr(this.storageArr, x, x - 1);
            this.queFun();
        },
        //复用
        reuseFun: function(el) {
            if (this.questionArr.length >= 10) {
                swal("已经超出10个问题啦！");
                return;
            }
            var x = -20,
                $node = $(el).parent().parent(),
                nodeEl = $node.clone(true);
            for (var i = 0; i < this.questionArr.length; i++) {
                if (this.questionArr[i][0] == $node[0]) {
                    x = i;
                }
            }
            this.questionArr.splice(x + 1, 0, nodeEl);
            this.storageArr.splice(x + 1, 0, nodeEl);
            this.queFun();
        },
        //删除
        delFun: function(el) {
            var x = -20,
                $node = $(el).parent().parent();
            $node.remove();
            for (var i = 0; i < this.questionArr.length; i++) {
                if (this.questionArr[i][0] == $node[0]) {
                    x = i;
                }
            }
            this.questionArr.splice(x, 1);
            this.storageArr.splice(x, 1);
            this.queFun();
        },
        //数组顺序交换函数
        changeArr: function(arr, a, b) {
            var el = arr[a];
            arr[a] = arr[b];
            arr[b] = el;
            return arr;
        },
        //生成单选
        produceRadio: function(q, a1, a2, a3, a4) {
            var cb = { type: "单选", quest: q, q1: a1, q2: a2, q3: a3, q4: a4 };
            EditObj.storageArr.push(cb);
            if (EditObj.questionArr.length >= 10) {
                swal("已经超出10个问题啦！");
                return;
            }
            var $que = $("<div class='que'>" +
                "<div class='queTitle'>Q" + "<i></i>" + "&nbsp&nbsp(单选题)&nbsp&nbsp" + q + "</i></div>" +
                "<div class='queOption'><div>" +
                "<input type='radio' name='one'>" + a1 + "</div>" +
                "<div><input type='radio' name='one'>" + a2 + "</div>" +
                "<div><input type='radio' name='one'>" + a3 + "</div>" +
                "<div><input type='radio' name='one'>" + a4 + "</div>" +
                "</div>" +
                "<div class='hand'></div>" +
                "</div>");
            EditObj.questionArr.push($que);
            console.log(typeof $que);
            console.log(EditObj.questionArr.length);

            EditObj.queFun();
        },
        //生产多选
        produceMany: function(q, a1, a2, a3, a4) {
            var cb = { type: "多选", quest: q, q1: a1, q2: a2, q3: a3, q4: a4 };
            this.storageArr.push(cb);
            if (this.questionArr.length >= 10) {
                swal("已经超出10个问题啦！");
                return;
            }
            var $que = $("<div class='que'>" +
                "<div class='queTitle'>Q" + "<i></i>" + "&nbsp&nbsp(多选题)&nbsp&nbsp" + q + "</i></div>" +
                "<div class='queOption'><div>" +
                "<input type='checkbox' name='one'>" + a1 + "</div>" +
                "<div><input type='checkbox' name='one'>" + a2 + "</div>" +
                "<div><input type='checkbox' name='one'>" + a3 + "</div>" +
                "<div><input type='checkbox' name='one'>" + a4 + "</div>" +
                "</div>" +
                "<div class='hand'>1</div>" +
                "</div>");
            this.questionArr.push($que);
            this.queFun();
        },
        //产生文本题
        produceText: function(q) {
            var cb = { type: "文本", quest: q };
            this.storageArr.push(cb);
            if (this.questionArr.length >= 10) {
                swal("已经超出10个问题啦！");
                return;
            }
            var $que = $("<div class='que'>" +
                "<div class='queTitle'>Q" + "<i></i>" + "&nbsp&nbsp(文本题)&nbsp&nbsp" + q + "</i></div>" +
                "<div class='must'><input type='checkbox'>此题是否必填</div>" +
                "<div class='queOption'><div>" +
                "<textarea rows='3' cols='20' id='textarea'></textarea></div>" +
                "</div>" +
                "<div class='hand'></div>" +
                "</div>");
            this.questionArr.push($que);
            this.queFun();
        },
        //存储函数
        save: function(sta) {
            if (this.storageArr.length == 0) {
                swal("问卷无问题！");
                return;
            }
            if ($("#date").val() !== "") {
                var date = $("#date").val();
            } else {
                swal("时间未选择！");
                return;
            }
            var title = $("[value='这里是标题']").val(),
                date = $("#edit_footer_left :input").val(),
                storage = window.localStorage;

            var uesr_q_json = { "username": "listen", "tit": title, "day": date, "statue": sta, "arr": this.storageArr };
            var uesr_q_json_str = JSON.stringify(uesr_q_json);

            //用户问题数据插入
            dataService.userQuestionInsertFun(function(data) {
                console.log(data);

            }, uesr_q_json_str);


            // var key = storage.length + 1;
            // if (storage) {
            //     localStorage.setItem(key, uesr_q_json_str);
            // }

            //跳转到我的调查问卷
            $scope.goMyQuestionnaire();

        },
        render: function() {
            var storageS = window.sessionStorage;
            // storage = window.localStorage;

            dataService.getQuestionnaireNumFun(function(data_h) { //获取问卷条数数据
                dataService.getQuestionNumFun(function(data_b) { //获取问卷条数数据
                    for (let i = 0; i < data_h.length; i++) {
                        var merge_data = [];
                        for (let j = 0; j < data_b.length; j++) {
                            //获取问卷问题答案
                            dataService.queryAnswerFun(function(answerArr) {
                                console.log(answerArr);

                                data_b[j].q1 = null;
                                data_b[j].q2 = null;
                                data_b[j].q3 = null;
                                data_b[j].q4 = null;
                                console.log(data_b[j]);
                                answerArr.forEach(function(currentE, index) {
                                    data_b[j].q1 = answerArr[index].q1;
                                    data_b[j].q2 = answerArr[index].q2;
                                    data_b[j].q3 = answerArr[index].q3;
                                    data_b[j].q4 = answerArr[index].q4;
                                });


                                var i = parseInt(storageS.msg) + 1;
                                if (!storageS.msg) {
                                    return false;
                                } else {
                                    $("#edit_title input").val($scope.getLocalData.tit);
                                    for (let j = 0; j < $scope.getLocalData.length; j++) {

                                        for (var i = 0; i < $scope.getLocalData[j].arr.length; i++) {

                                            if ($scope.getLocalData[j].arr[i].type == "r") {

                                                EditObj.produceRadio($scope.getLocalData[j].arr[i].quest, $scope.getLocalData[j].arr[i].q1, $scope.getLocalData[j].arr[i].q2, $scope.getLocalData[j].arr[i].q3, $scope.getLocalData[j].arr[i].q4);
                                            } else if ($scope.getLocalData[j].arr[i].type == "c") {
                                                console.log($scope.getLocalData[j].arr[i]);
                                                EditObj.produceMany($scope.getLocalData[j].arr[i].quest, $scope.getLocalData[j].arr[i].q1, $scope.getLocalData[j].arr[i].q2, $scope.getLocalData[j].arr[i].q3, $scope.getLocalData[j].arr[i].q4);
                                            } else {
                                                EditObj.produceText($scope.getLocalData[j].arr[i].quest);
                                            }
                                        }




                                    }
                                    storageS.removeItem("msg");
                                };





                            }, data_b[j].questionId);


                            if (data_h[i].arrId == data_b[j].arrId) {
                                merge_data.push(data_b[j]);
                                // console.log(merge_data);
                            }

                        }
                        data_h[i].arr = merge_data;
                    }
                    console.log(data_h);
                    $scope.getLocalData = data_h; //合并问卷条数和问题条数





                });
            });











        }
    }












    var EditObj = new Edit();



    //点击单选显示出创建问题
    //生产单选
    $("#single").click(function() {
        swal({
                title: "创建问卷！",

                text: "<div >" +
                    "<div id='qlist'>" +
                    "<div >" + "<span>&nbsp;&nbsp;问题&nbsp;&nbsp;<input type='text' id='question'/></span>" + "</div>" +
                    "<div >" + "<span>答案一<input type='text' id='answer1' /></span>" + "</div>" +
                    "<div >" + "<span>答案二<input type='text' id='answer2' /></span>" + "</div>" +
                    "<div >" + "<span>答案三<input type='text' id='answer3'/></span>" + "</div>" +
                    "<div >" + "<span>答案四<input type='text' id='answer4'/></span>" + "</div>" +
                    "</div>" +
                    "</div>",
                animation: "slide-from-top",
                showCancelButton: true,
                confirmButtonText: "提交",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                html: true
            },
            function() {
                var q = $("#question").val();
                var a1 = $("#answer1").val();
                var a2 = $("#answer2").val();
                var a3 = $("#answer3").val();
                var a4 = $("#answer4").val();

                EditObj.produceRadio(q, a1, a2, a3, a4);

                //实现上移动下移动函数
                $("#edit_body_list").click(function(e) {
                    e = e || event;
                    var target = e.target || e.srcElement;
                    switch (target.id) {
                        case "down":
                            EditObj.downFun(target);
                            break;
                        case "up":
                            EditObj.upFun(target);
                            break;
                        case "reuse":
                            EditObj.reuseFun(target);
                            break;
                        case "del":
                            EditObj.delFun(target);
                            break;
                    }
                });



            }
        );

    });

    //点击多选显示出创建问题
    //生产多选
    $("#mult").click(function() {
        swal({
                title: "创建问卷！",

                text: "<div >" +
                    "<div id='qlist'>" +
                    "<div >" + "<span>&nbsp;&nbsp;问题&nbsp;&nbsp;<input type='text' id='question'/></span>" + "</div>" +
                    "<div >" + "<span>答案一<input type='text' id='answer1' /></span>" + "</div>" +
                    "<div >" + "<span>答案二<input type='text' id='answer2' /></span>" + "</div>" +
                    "<div >" + "<span>答案三<input type='text' id='answer3'/></span>" + "</div>" +
                    "<div >" + "<span>答案四<input type='text' id='answer4'/></span>" + "</div>" +
                    "</div>" +
                    "</div>",
                animation: "slide-from-top",
                showCancelButton: true,
                confirmButtonText: "提交",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                html: true
            },
            function() {
                var q = $("#question").val();
                var a1 = $("#answer1").val();
                var a2 = $("#answer2").val();
                var a3 = $("#answer3").val();
                var a4 = $("#answer4").val();

                EditObj.produceMany(q, a1, a2, a3, a4);

                $("#edit_body_list").click(function(e) {
                    e = e || event;
                    var target = e.target || e.srcElement;
                    switch (target.id) {
                        case "down":
                            EditObj.downFun(target);
                            break;
                        case "up":
                            EditObj.upFun(target);
                            break;
                        case "reuse":
                            EditObj.reuseFun(target);
                            break;
                        case "del":
                            EditObj.delFun(target);
                            break;
                    }
                });

                //实现上移动下移动函数

            }
        );

    });


    //点击多选显示出创建问题
    //生产多选
    $("#text").click(function() {
        swal({
                title: "创建问卷！",

                text: "<div >" +
                    "<div id='qlist'>" +
                    "<div >" + "<span>&nbsp;&nbsp;问题&nbsp;&nbsp;<input type='text' id='question'/></span>" + "</div>" +
                    "</div>" +
                    "</div>",
                animation: "slide-from-top",
                showCancelButton: true,
                confirmButtonText: "提交",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                html: true
            },
            function() {
                var q = $("#question").val();


                EditObj.produceText(q);
                //实现上移动下移动函数
                $("#edit_body_list").click(function(e) {
                    e = e || event;
                    var target = e.target || e.srcElement;
                    switch (target.id) {
                        case "down":
                            EditObj.downFun(target);
                            break;
                        case "up":
                            EditObj.upFun(target);
                            break;
                        case "reuse":
                            EditObj.reuseFun(target);
                            break;
                        case "del":
                            EditObj.delFun(target);
                            break;
                    }
                });



            }
        );

    });



    //保存数据到localStorage

    $("button:contains('保存')").click(function() {
        EditObj.save(0);
        EditObj.render();
    });
    $("button:contains('发布')").click(function() {
        EditObj.save(1);
        EditObj.render();
    });



    //实现上移，下移，复用，删除，渲染的方法。

    (function() {
        //渲染数据到页面
        EditObj.render();
        // EditObj.changeArr();
        $("#edit_body_list").click(function(e) {
            e = e || event;
            var target = e.target || e.srcElement;
            switch (target.id) {
                case "down":
                    EditObj.downFun(target);
                    break;
                case "up":
                    EditObj.upFun(target);
                    break;
                case "reuse":
                    EditObj.reuseFun(target);
                    break;
                case "del":
                    EditObj.delFun(target);
                    break;
            }
        });

    })();

}]);