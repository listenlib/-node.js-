app.controller('questionnaireCtrl', ['$scope', 'dataService', '$stateParams', function($scope, dataService, $stateParams) {

    // dataService.queryCreaterQueFun(function(data) {
    //     console.log(data);
    //     data.forEach(function(currentE, index) {


    //         var $queList = $('<div class="que-child"><table class = "child-content" border = "1" width = "100%"><tr><td width ="40%" class="left-content"><div class="radio-check" > 单选</div><div class="first-col-cont">' + data[index].quest + '</div></td><td width="60%"><table class="q4-row"><tr><td><div class="answer"></div><div class="td-inline" id="a">' + data[index].q1 + '</div></td></tr><tr><td><div class="answer"></div><div class="td-inline">' + data[index].q2 + '</div></td></tr><tr><td><div class="answer"></div><divclass="td-inline">' + data[index].q3 + '</div></td></tr><tr><td><div class="answer"></div><div class="td-inline">' + data[index].q3 + '</div></td></tr></table></td></tr></table></div>');

    //         $queList.appendTo(".que-naire-content");



    //     });
    console.log($stateParams);
    $scope.radio = [];
    $scope.multi = [];
    $scope.text = [];
    dataService.getQuestionnaireNumFun(function(data_h) { //获取问卷条数数据
        dataService.getQuestionNumFun(function(data_b) { //获取问卷条数数据
            for (let i = 0; i < data_h.length; i++) {
                var merge_data = [];
                for (let j = 0; j < data_b.length; j++) {
                    //获取问卷问题答案
                    dataService.queryAnswerFun(function(answerArr) {
                        // console.log(answerArr);

                        data_b[j].q1 = null;
                        data_b[j].q2 = null;
                        data_b[j].q3 = null;
                        data_b[j].q4 = null;
                        // console.log(data_b[j]); 
                        answerArr.forEach(function(currentE, index) {
                            data_b[j].q1 = answerArr[index].q1;
                            data_b[j].q2 = answerArr[index].q2;
                            data_b[j].q3 = answerArr[index].q3;
                            data_b[j].q4 = answerArr[index].q4;
                        });


                    }, data_b[j].questionId);


                    if (data_h[i].arrId == data_b[j].arrId) {
                        merge_data.push(data_b[j]);
                        // console.log(merge_data);
                    }

                }
                data_h[i].arr = merge_data;
            }
            console.log(data_h);


            data_h.forEach(function(currentE, kk) {
                if (data_h[kk].tit == $stateParams.queTitle) {


                    data_h[kk].arr.forEach(function(currentE, index) {

                        if (data_h[kk].arr[index].type == "单选") {

                            $scope.radio.push(data_h[kk].arr[index]);
                            // document.getElementsByClassName();

                        } else if (data_h[kk].arr[index].type == "多选") {
                            $scope.multi.push(data_h[kk].arr[index]);
                        } else if (data_h[kk].arr[index].type == "文本") {
                            $scope.text.push(data_h[kk].arr[index]);
                        }
                    });




                }

            });




            var sequenceLength = $(".sequence");
            console.log(sequenceLength.length);


            // console.log(data_h[0].arr);
            // setTimeout(function() {
            //     data.forEach(function(currentE, index) {

            //         console.log(data[index].quest);
            //         // var $queList = $('<div class="que-child"><table class = "child-content" border = "1" width = "100%"><tr><td width ="40%" class="left-content"><div class="radio-check" > 单选</div><div class="first-col-cont">' + data[index].quest + '</div></td><td width="60%"><table class="q4-row"><tr><td><div class="answer"></div><div class="td-inline" id="a">' + data[index].q1 + '</div></td></tr><tr><td><div class="answer"></div><div class="td-inline">' + data[index].q2 + '</div></td></tr><tr><td><div class="answer"></div><div class="td-inline">' + data[index].q3 + '</div></td></tr><tr><td><div class="answer"></div><div class="td-inline">' + data[index].q3 + '</div></td></tr></table></td></tr></table></div>');

            //         $queList.appendTo(".que-naire-content");

            //         var checkList = $('.q4-row .answer');
            //         console.log(checkList);
            //         var checkListTd = $('.q4-row .td-inline');
            //         // alert($("#a").text());
            //         console.log(checkListTd);
            //         var boxList = $(".que-child");

            //         for (let k = 0; k < boxList.length; k++) {


            //         }

            //         for (let i = 0; i < checkList.length; i++) {
            //             checkList[i].addEventListener('click', function() {
            //                 for (let j = 0; j < checkList.length; j++) {
            //                     checkList[j].removeAttribute('style');
            //                 }
            //                 this.setAttribute('style', ' background: red;')
            //                 console.log(checkListTd[i].childNodes[0].nodeValue);
            //             })
            //         }

            //     });






            // }, 10);






        });
    });






    // });




}]);