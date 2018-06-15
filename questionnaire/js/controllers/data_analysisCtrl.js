app.controller('data_analysisCtrl', function(dataService) {


    // dataService.testFun(function(data) {
    //     console.log(data);
    // });

    var answerCount;
    var data_collect = [
        ['product', '答案一', '答案二', '答案三', '答案四']
    ];
    dataService.answerCountFun(function(data) {
        console.log(data);
        answerCount = data;
    });
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

        // 基于准备好的dom，初始化echarts实例
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
    }, 1000);


});