/*
Navicat MySQL Data Transfer

Source Server         : mysql57
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-06-15 16:56:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `answertable`
-- ----------------------------
DROP TABLE IF EXISTS `answertable`;
CREATE TABLE `answertable` (
  `questionId` int(11) DEFAULT NULL,
  `q1` varchar(255) DEFAULT NULL,
  `q2` varchar(255) DEFAULT NULL,
  `q3` varchar(255) DEFAULT NULL,
  `q4` varchar(255) DEFAULT NULL,
  `answerId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of answertable
-- ----------------------------
INSERT INTO `answertable` VALUES ('27', '7', '7', '7', '7', '7');
INSERT INTO `answertable` VALUES ('28', '76', '90', '799', '99', '8');
INSERT INTO `answertable` VALUES ('29', '6', '6', '6', '6', '9');

-- ----------------------------
-- Table structure for `answer_four`
-- ----------------------------
DROP TABLE IF EXISTS `answer_four`;
CREATE TABLE `answer_four` (
  `questionId` int(11) DEFAULT NULL,
  `q4` varchar(255) DEFAULT NULL,
  `count_four` int(11) DEFAULT NULL,
  `answerFourID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerFourID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of answer_four
-- ----------------------------

-- ----------------------------
-- Table structure for `answer_one`
-- ----------------------------
DROP TABLE IF EXISTS `answer_one`;
CREATE TABLE `answer_one` (
  `questionId` int(11) DEFAULT NULL,
  `q1` varchar(255) DEFAULT NULL,
  `count_one` int(11) DEFAULT NULL,
  `answerOneID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerOneID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of answer_one
-- ----------------------------

-- ----------------------------
-- Table structure for `answer_three`
-- ----------------------------
DROP TABLE IF EXISTS `answer_three`;
CREATE TABLE `answer_three` (
  `questionId` int(11) DEFAULT NULL,
  `q3` varchar(255) DEFAULT NULL,
  `count_three` int(11) DEFAULT NULL,
  `answerThreeID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerThreeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of answer_three
-- ----------------------------

-- ----------------------------
-- Table structure for `answer_two`
-- ----------------------------
DROP TABLE IF EXISTS `answer_two`;
CREATE TABLE `answer_two` (
  `questionId` int(11) DEFAULT NULL,
  `q2` varchar(255) DEFAULT NULL,
  `count_two` int(11) DEFAULT NULL,
  `answerTwoID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`answerTwoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of answer_two
-- ----------------------------

-- ----------------------------
-- Table structure for `create_question_table`
-- ----------------------------
DROP TABLE IF EXISTS `create_question_table`;
CREATE TABLE `create_question_table` (
  `create_user` varchar(255) NOT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer1` varchar(255) DEFAULT NULL,
  `answer2` varchar(255) DEFAULT NULL,
  `answer3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of create_question_table
-- ----------------------------

-- ----------------------------
-- Table structure for `user_info`
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tel` int(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('1', 'li', '123', '1', '1');
INSERT INTO `user_info` VALUES ('2', 'lu', 'a', '444', '444');

-- ----------------------------
-- Table structure for `user_question_data_b`
-- ----------------------------
DROP TABLE IF EXISTS `user_question_data_b`;
CREATE TABLE `user_question_data_b` (
  `arrId` int(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `quest` varchar(255) DEFAULT NULL,
  `questionId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`questionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_question_data_b
-- ----------------------------

-- ----------------------------
-- Table structure for `user_question_data_b3`
-- ----------------------------
DROP TABLE IF EXISTS `user_question_data_b3`;
CREATE TABLE `user_question_data_b3` (
  `arrId` int(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `quest` varchar(255) DEFAULT NULL,
  `q1` varchar(255) DEFAULT NULL,
  `q2` varchar(255) DEFAULT NULL,
  `q3` varchar(255) DEFAULT NULL,
  `q4` varchar(255) DEFAULT NULL,
  `questionId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`questionId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_question_data_b3
-- ----------------------------
INSERT INTO `user_question_data_b3` VALUES ('30', 'c', '杰弗森', null, null, null, null, '29');
INSERT INTO `user_question_data_b3` VALUES ('33', 'c', '教育局', null, null, null, null, '32');

-- ----------------------------
-- Table structure for `user_question_data_h`
-- ----------------------------
DROP TABLE IF EXISTS `user_question_data_h`;
CREATE TABLE `user_question_data_h` (
  `username` varchar(255) DEFAULT NULL,
  `tit` varchar(255) DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `statue` varchar(255) DEFAULT NULL,
  `arrId` int(255) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`arrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_question_data_h
-- ----------------------------
