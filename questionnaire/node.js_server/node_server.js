var http = require('http');
var querystring = require('querystring');
var mysql = require('mysql');
var url = require('url');
var util = require('util');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1565221029',
    database: 'test'
});
connection.connect();

var server = http.createServer(function(req, res) {
    var body = "";
    req.on('data', function(chunk) {
        body += chunk;
    });
    req.on('end', function() {


        //如果你发一个GET到http://127.0.0.1:9000/test
        var url_info = require('url').parse(req.url, true);


        /*
         *注册请求
         *
         */
        if (url_info.pathname === '/register') {

            var body1 = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            var addSql = 'INSERT INTO user_info(id,username,password,tel,email) VALUES(0,?,?,?,?)';
            var addSqlParams = [body1["username"], body1["password"], body1["tel"], body1["email"]];

            connection.query(addSql, addSqlParams, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                res.end("注册成功");
            });
        } else if (url_info.pathname === '/login') { //登录请求

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

            var body1 = JSON.parse(body);
            console.log(body1);
            var querysql = 'SELECT * FROM user_info';
            connection.query(querysql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                // console.log('--------------------------SELECT----------------------------');
                // console.log(result[0]["username"]);
                // console.log('------------------------------------------------------------\n\n');
                console.log(result);

                result.forEach(function(currentE, index) {
                    if (body1.username == result[index].username && body1.password == result[index].password) {

                        console.log(body1.username == result[index].username && body1.password == result[index].password);
                        res.end("正确");


                    }

                });



            });
        } else if (url_info.pathname === '/QuestionInsert') { //用户问卷条数及问题个数数据的插入
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

            var body1 = JSON.parse(body);
            /*******
             * 
             * 插入问卷个数
             * 
             * ****/

            var addSql = 'INSERT INTO user_question_data_h(username,tit,day,statue,arrId) VALUES(?,?,?,?,0)';
            var addSqlParams = [body1["username"], body1["tit"], body1["day"], body1["statue"]]; //插入问卷个数

            connection.query(addSql, addSqlParams, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                // res.end("问卷插入成功");

            });

            /*******
             * 
             * 查询刚修改记录的Id
             * 
             * ****/

            var querysql = ' SELECT LAST_INSERT_ID()';
            connection.query(querysql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                var arrId = result[0]["LAST_INSERT_ID()"]

                /*******
                 * 
                 * 插入问卷问题个数
                 * 
                 * ****/
                for (let i = 0; i < body1.arr.length; i++) {
                    var addSql_in_q = 'INSERT INTO user_question_data_b(arrId,type,quest,questionId) VALUES(?,?,?,0)';
                    var addSqlParams_q = [arrId, body1.arr[i].type, body1.arr[i].quest]; //插入问卷个数
                    // console.log(body1.arr[i].quest);
                    connection.query(addSql_in_q, addSqlParams_q, function(err, result) {
                        if (err) {
                            console.log('[SELECT ERROR] - ', err.message);
                            return;
                        }
                        // console.log("************");

                        var querySqlQueId = "SELECT b.questionId FROM user_question_data_b b WHERE b.quest ='" + body1.arr[i].quest + "'";

                        connection.query(querySqlQueId, function(err, result) {
                            if (err) {
                                console.log('[SELECT ERROR] -99999999 ', err.message);
                                return;
                            }

                            var questionId = result[0]["questionId"];





                            // var addAnswerSql = 'INSERT INTO answertable(questionId,q1,q2,q3,q4,answerId) VALUES(?,?,?,?,?,0)';
                            // var addAnswer = [questionId, body1.arr[i].q1, body1.arr[i].q2, body1.arr[i].q3, body1.arr[i].q4];
                            // connection.query(addAnswerSql, addAnswer, function(err, result) {

                            //     if (err) {
                            //         console.log('[SELECT ERROR] - ', err.message);
                            //         return;
                            //     }

                            //     res.end("问卷问题标题插入成功");
                            // });

                            /**
                             * 插入问卷问题答案一
                             */

                            var insertAnswer1Sql = 'INSERT INTO answer_one(questionId,q1,answerOneID) VALUES(?,?,0)';
                            var insertAnswer1 = [questionId, body1.arr[i].q1];
                            connection.query(insertAnswer1Sql, insertAnswer1, function(err, result) {

                                if (err) {
                                    console.log('[SELECT ERROR] - ', err.message);
                                    return;
                                }
                            });

                            /**
                             * 插入问卷问题答案二
                             */

                            var insertAnswer2Sql = 'INSERT INTO answer_two(questionId,q2,answerTwoID) VALUES(?,?,0)';
                            var insertAnswer2 = [questionId, body1.arr[i].q2];
                            connection.query(insertAnswer2Sql, insertAnswer2, function(err, result) {

                                if (err) {
                                    console.log('[SELECT ERROR] - ', err.message);
                                    return;
                                }
                            });


                            /**
                             * 插入问卷问题答案三
                             */

                            var insertAnswer3Sql = 'INSERT INTO answer_three(questionId,q3,answerThreeID) VALUES(?,?,0)';
                            var insertAnswer3 = [questionId, body1.arr[i].q3];
                            connection.query(insertAnswer3Sql, insertAnswer3, function(err, result) {

                                if (err) {
                                    console.log('[SELECT ERROR] - ', err.message);
                                    return;
                                }
                            });

                            /**
                             * 插入问卷问题答案四
                             */

                            var insertAnswer4Sql = 'INSERT INTO answer_four(questionId,q4,answerFourID) VALUES(?,?,0)';
                            var insertAnswer4 = [questionId, body1.arr[i].q4];
                            connection.query(insertAnswer4Sql, insertAnswer4, function(err, result) {

                                if (err) {
                                    console.log('[SELECT ERROR] - ', err.message);
                                    return;
                                }

                                res.end("问卷问题标题插入成功");
                            });


                        });


                    });

                }
            });

        } else if (url_info.pathname === '/getQuestionnaireNum') { //查询出用户问卷条数
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            var querygetQuestionnaireNumSql = "SELECT h.tit,h.`day`,h.statue,h.arrId FROM user_question_data_h h ";


            connection.query(querygetQuestionnaireNumSql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                // console.log(result + "*************************");
                res.end(JSON.stringify(result));
            });

        }

        //查询出用户问卷问题个数
        else if (url_info.pathname === '/getQuestionNum') {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            var querygetQuestionnaireNumSql = 'SELECT b.type,b.quest,b.arrId,b.questionId  FROM user_question_data_b b';


            connection.query(querygetQuestionnaireNumSql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                // console.log(result + "*************************");
                res.end(JSON.stringify(result));
            });

        }

        /**
         * 
         * 删除掉所有问卷条数和问卷问题个数
         * 
         */
        else if (url_info.pathname === '/delAllQuestionaireData') { //删除掉所有问卷条数和问卷问题个数

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

            var querysql = 'TRUNCATE TABLE user_question_data_h';
            connection.query(querysql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                res.end("删除所有问卷条数数据成功！");

            });
        } else if (url_info.pathname === '/delAllQuestioneNumData') { //删除掉所有问卷条数和问卷问题个数

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });


            var querysql = 'TRUNCATE TABLE user_question_data_b';
            connection.query(querysql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }


                res.end("删除所有问卷问题个数数据成功！");

            });
        }

        /**
         * 
         * 实现点击“删除”删除掉当前对象，问卷条数和当前问题
         * 
         */
        else if (url_info.pathname === '/delCurrentQuestionnaireNumData') { //删除掉当前问卷条数和问卷问题个数
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            var body1 = JSON.parse(body);
            // console.log(body1);
            var delCurrentsql = 'DELETE FROM user_question_data_h WHERE  arrId=' + body1.currId;
            // var delCurrentsqltest = ' DELETE FROM user_question_data_h WHERE arrId = 2'
            connection.query(delCurrentsql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                res.end("删除当前问卷问题个数数据成功！");
            });
        } else if (url_info.pathname === '/delCurrentQuestionNumData') { //删除掉当前问卷条数和问卷问题个数

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            var body1 = JSON.parse(body);

            var delCurrentsql = 'DELETE FROM user_question_data_b WHERE  arrId=' + body1.currId;
            connection.query(delCurrentsql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }


                res.end("删除当前问卷问题个数数据成功！");

            });
        }

        /**
         * 
         * 查询出创建用户名字，并且查出创建的问题
         * 
         */
        else if (url_info.pathname === '/queryCreaterQue') { //查询出创建用户名字，并且查出创建的问题

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

            // var body1 = JSON.parse(body);
            var querysql = 'SELECT h.arrId FROM user_question_data_h h WHERE h.username="listen"';
            connection.query(querysql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                result.forEach(function(currentE, ind) {
                    var curr_name_id = result[ind].arrId;


                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    var querysql = 'SELECT * FROM user_question_data_b b WHERE b.arrId=' + curr_name_id;
                    connection.query(querysql, function(err, re) {
                        if (err) {
                            console.log('[SELECT ERROR] - ', err.message);
                            return;
                        }

                        re.forEach(function(currentE, index) {
                            var question_id = re[index].questionId; //获取问题Id
                            // console.log(question_id + "***********");
                            // console.log(index + "****___****");
                            //获取到问题答案
                            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                            var queryAnswSql = 'SELECT one.questionId,one.q1,two.q2,three.q3,four.q4 FROM answer_one one,answer_two two,answer_three three,answer_four four WHERE one.questionId=' + question_id + ' AND two.questionId =' + question_id + ' AND three.questionId =' + question_id + ' AND four.questionId =' + question_id;
                            connection.query(queryAnswSql, function(err, resu) {
                                if (err) {
                                    console.log('[SELECT ERROR]-answer - ', err.message);
                                    return;
                                }
                                // console.log(resu);


                                // resu.forEach(function(curr, num1) {
                                //     console.log(num1);

                                // });

                                for (let i = 0; i < resu.length; i++) {

                                    if (resu[i].questionId == re[index].questionId) {
                                        // console.log(resu[i].questionId);
                                        // console.log(re[index].questionId);

                                        re[index].q1 = resu[0].q1;
                                        re[index].q2 = resu[0].q2;
                                        re[index].q3 = resu[0].q3;
                                        re[index].q4 = resu[0].q4;
                                    }


                                }

                                res.end(JSON.stringify(re));
                            });

                        });

                    });

                });

            });
        }

        /***
         * 
         * 查询出答案
         */
        else if (url_info.pathname === '/queryAnswer') {

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            // var params = url.parse(req.url, true).query;
            // var body1 = JSON.parse(body);
            var body1 = body;



            var queryAnswersql = 'SELECT one.q1,two.q2,three.q3,four.q4 FROM answer_one one,answer_two two,answer_three three,answer_four four WHERE one.questionId=' + body1 + ' AND two.questionId=' + body1 + ' AND three.questionId=' + body1 + ' AND four.questionId=' + body1;
            connection.query(queryAnswersql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                // console.log(result);
                res.end(JSON.stringify(result));
            });

        }

        /***
         * 
         * 填问卷页面
         */
        else if (url_info.pathname === '/fillQuestionnaire') {

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            var params = url.parse(req.url, true).query;



            if (params.checkbox instanceof Array) {
                params.checkbox.forEach(function(currentE, index) {
                    params[index] = params.checkbox[index];

                });

                delete params.checkbox;
            }

            console.log(params);



            // var body1 = querystring.parse(body);
            // console.log(typeof params);

            /**
             * 匹配答案一表
             * 
             */
            var queryOnesql = 'SELECT * FROM answer_one';
            connection.query(queryOnesql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                // console.log(result);
                for (var key in params) {
                    result.forEach(function(currentE, index) {
                            if (params[key] == result[index].q1) {
                                var queryonesql = "SELECT one.answerOneID,one.count_one FROM answer_one one WHERE one.q1='" + result[index].q1 + "'";
                                connection.query(queryonesql, function(err, result2) {
                                    if (err) {
                                        console.log('[SELECT ERROR] - ', err.message);
                                        return;
                                    }
                                    result2[0].count_one++;
                                    var updataSql = "UPDATE answer_one SET count_one=" + result2[0].count_one + " WHERE answerOneID=" + result2[0].answerOneID;
                                    connection.query(updataSql, function(err, result3) {
                                        if (err) {
                                            console.log('[SELECT ERROR] - ', err.message);
                                            return;
                                        }
                                    });
                                });
                            }
                        }

                    );
                }

            });

            /**
             * 匹配答案二表
             * 
             */

            var queryTwosql = 'SELECT * FROM answer_two';
            connection.query(queryTwosql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                console.log(result);
                for (var key in params) {
                    result.forEach(function(currentE, index) {
                            if (params[key] == result[index].q2) {
                                var queryonesql = "SELECT two.answerTwoID,two.count_two FROM answer_two two WHERE two.q2='" + result[index].q2 + "'";
                                connection.query(queryonesql, function(err, result2) {
                                    if (err) {
                                        console.log('[SELECT ERROR] - ', err.message);
                                        return;
                                    }
                                    result2[0].count_two++;
                                    var updataSql = "UPDATE answer_two SET count_two=" + result2[0].count_two + " WHERE answerTwoID=" + result2[0].answerTwoID;
                                    connection.query(updataSql, function(err, result3) {
                                        if (err) {
                                            console.log('[SELECT ERROR] - ', err.message);
                                            return;
                                        }
                                    });
                                });
                            }
                        }

                    );
                }

            });

            /**
             * 匹配答案三表
             * 
             */

            var queryThreesql = 'SELECT * FROM answer_three';
            connection.query(queryThreesql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                console.log(result);
                for (var key in params) {
                    result.forEach(function(currentE, index) {
                            if (params[key] == result[index].q3) {
                                var queryonesql = "SELECT three.answerThreeID,three.count_three FROM answer_three three WHERE three.q3='" + result[index].q3 + "'";
                                connection.query(queryonesql, function(err, result2) {
                                    if (err) {
                                        console.log('[SELECT ERROR] - ', err.message);
                                        return;
                                    }
                                    result2[0].count_three++;
                                    var updataSql = "UPDATE answer_three SET count_three=" + result2[0].count_three + " WHERE answerThreeID=" + result2[0].answerThreeID;
                                    connection.query(updataSql, function(err, result3) {
                                        if (err) {
                                            console.log('[SELECT ERROR] - ', err.message);
                                            return;
                                        }
                                    });
                                });
                            }
                        }

                    );
                }

            });

            /**
             * 匹配答案四表
             * 
             */

            var queryFoursql = 'SELECT * FROM answer_four';
            connection.query(queryFoursql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                console.log(result);
                for (var key in params) {
                    result.forEach(function(currentE, index) {
                            if (params[key] == result[index].q4) {
                                var queryonesql = "SELECT four.answerFourID,four.count_four FROM answer_four four WHERE four.q4='" + result[index].q4 + "'";
                                connection.query(queryonesql, function(err, result2) {
                                    if (err) {
                                        console.log('[SELECT ERROR] - ', err.message);
                                        return;
                                    }
                                    result2[0].count_four++;
                                    var updataSql = "UPDATE answer_four SET count_four=" + result2[0].count_four + " WHERE answerFourID=" + result2[0].answerFourID;
                                    connection.query(updataSql, function(err, result3) {
                                        if (err) {
                                            console.log('[SELECT ERROR] - ', err.message);
                                            return;
                                        }
                                    });
                                });
                            }
                        }

                    );
                }

                res.end("<div>填写问卷成功！！！请勿重复填写问卷！！！</div>");

            });

        }

        /**
         *统计选项接口 
         * 
         */
        else if (url_info.pathname === '/answerCount') {

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });




            var querytit = "SELECT arrId FROM user_question_data_h  WHERE tit='" + body + "'";
            connection.query(querytit, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                result.forEach(function(currentE, index) {




                    var querysql = 'SELECT b.quest,one.count_one,two.count_two,three.count_three,four.count_four FROM user_question_data_b b, answer_one one,answer_two two,answer_three three,answer_four four WHERE b.questionId=one.questionId AND b.questionId=two.questionId AND b.questionId=three.questionId AND b.questionId=four.questionId AND b.arrId=' + result[index].arrId;
                    connection.query(querysql, function(err, result) {
                        if (err) {
                            console.log('[SELECT ERROR] - ', err.message);
                            return;
                        }



                        res.end(JSON.stringify(result));

                    });




                });




            });


        }

        /***
         * 
         * 测试
         */
        else if (url_info.pathname === '/test') { //测试

            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            var params = url.parse(req.url, true).query;
            // var body1 = JSON.parse(body);
            // var body1 = querystring.parse(body);
            // console.log(params);
            var querysql = 'SELECT * FROM user_info';

            connection.query(querysql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }

                res.end();
            });

        }
























    });
});
server.listen(9000, '127.0.0.1');
//在server关闭的时候也关闭mysql连接
server.on('close', function() {
    connection.end();
});
console.log('listening on port  9000');