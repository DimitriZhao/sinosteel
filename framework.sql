-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-05-21 04:31:03
-- 服务器版本： 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `framework`
--

-- --------------------------------------------------------

--
-- 表的结构 `tbl_contract`
--

CREATE TABLE `tbl_contract` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `account_paid` double DEFAULT NULL,
  `contract_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `customer_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `contract_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_contract`
--

INSERT INTO `tbl_contract` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `account_paid`, `contract_name`, `customer_id`, `total_amount`, `contract_time`, `comment`, `name`) VALUES
('0', NULL, NULL, '0', NULL, '0', 0, '测试合同数据0', '1', 87685.84, '2016-10-16', NULL, NULL),
('1', NULL, NULL, '1', NULL, '0', 0, '测试合同数据1', '1', 58537.18, '2016-08-06', NULL, NULL),
('10', NULL, NULL, '10', NULL, '0', 0, '测试合同数据10', '2', 62278.91, '2016-09-24', NULL, NULL),
('11', NULL, NULL, '11', NULL, '0', 0, '测试合同数据11', '2', 23552.82, '2016-01-13', NULL, NULL),
('12', NULL, NULL, '12', NULL, '0', 0, '测试合同数据12', '1', 63910.03, '2015-04-30', NULL, NULL),
('13', NULL, NULL, '13', NULL, '0', 0, '测试合同数据13', '1', 8559.88, '2016-12-09', NULL, NULL),
('14', NULL, NULL, '14', NULL, '0', 0, '测试合同数据14', '0', 63042.63, '2015-10-10', NULL, NULL),
('15', NULL, NULL, '15', NULL, '0', 0, '测试合同数据15', '0', 96619.16, '2015-11-03', NULL, NULL),
('2', NULL, NULL, '2', NULL, '0', 0, '测试合同数据2', '0', 78500.93, '2016-06-14', NULL, NULL),
('3', NULL, NULL, '3', NULL, '0', 0, '测试合同数据3', '1', 2072.41, '2015-01-18', NULL, NULL),
('4', NULL, NULL, '4', NULL, '0', 0, '测试合同数据4', '0', 38343.63, '2016-11-24', NULL, NULL),
('5', NULL, NULL, '5', NULL, '0', 0, '测试合同数据5', '0', 24808.05, '2016-01-30', NULL, NULL),
('6', NULL, NULL, '6', NULL, '0', 0, '测试合同数据6', '1', 73345.76, '2016-08-04', NULL, NULL),
('7', NULL, NULL, '7', NULL, '0', 0, '测试合同数据7', '0', 32046.63, '2016-10-01', NULL, NULL),
('8', NULL, NULL, '8', NULL, '0', 0, '测试合同数据8', '1', 55076.96, '2016-01-11', NULL, NULL),
('9', NULL, NULL, '9', NULL, '0', 0, '测试合同数据9', '1', 93026.78, '2015-02-04', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `tbl_contract_resource`
--

CREATE TABLE `tbl_contract_resource` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `customer_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `contract_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_customer`
--

CREATE TABLE `tbl_customer` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `bank_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `contact_person` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `customer_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `tax_number` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_customer`
--

INSERT INTO `tbl_customer` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `bank_name`, `contact_person`, `customer_name`, `tax_number`, `comment`, `name`) VALUES
('0', NULL, NULL, '0', NULL, '0', '中国银行', '陆鹏程', '中钢集团工程设计研究院有限公司', '0123456789', 'TEST', NULL),
('1', NULL, NULL, '1', NULL, '0', '中国工商银行', '陆鹏程', '中钢国际工程技术有限公司', '1234567890', NULL, NULL),
('2', NULL, NULL, '2', NULL, '0', '中国建设银行', '董达', '中钢集团天澄环保科技股份有限公司', '0987654321', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `tbl_customer_resource`
--

CREATE TABLE `tbl_customer_resource` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `contract_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `customer_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_journal`
--

CREATE TABLE `tbl_journal` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `specification` blob,
  `summary` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `topic_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `write_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `personnel_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `project_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_journal_resource`
--

CREATE TABLE `tbl_journal_resource` (
  `journal_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_milestone`
--

CREATE TABLE `tbl_milestone` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `milestone_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `project_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `milestone_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_milestone`
--

INSERT INTO `tbl_milestone` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `milestone_name`, `project_id`, `milestone_time`, `status`, `name`) VALUES
('0-0', NULL, NULL, NULL, NULL, '0', '测试节点0-0', NULL, '2016-07-01', NULL, NULL),
('0-1', NULL, NULL, NULL, NULL, '0', '测试节点0-1', NULL, '2016-08-13', NULL, NULL),
('0-2', NULL, NULL, NULL, NULL, '0', '测试节点0-2', NULL, '2016-11-01', NULL, NULL),
('0-3', NULL, NULL, NULL, NULL, '0', '测试节点0-3', NULL, '2016-12-06', NULL, NULL),
('0-4', NULL, NULL, NULL, NULL, '0', '测试节点0-4', NULL, '2017-03-05', NULL, NULL),
('1-0', NULL, NULL, NULL, NULL, '0', '测试节点1-0', NULL, '2015-05-09', NULL, NULL),
('1-1', NULL, NULL, NULL, NULL, '0', '测试节点1-1', NULL, '2015-08-09', NULL, NULL),
('10-0', NULL, NULL, NULL, NULL, '0', '测试节点10-0', '5', '2017-02-05', NULL, NULL),
('10-1', NULL, NULL, NULL, NULL, '0', '测试节点10-1', '5', '2017-03-19', NULL, NULL),
('10-2', NULL, NULL, NULL, NULL, '0', '测试节点10-2', '5', '2017-06-17', NULL, NULL),
('10-3', NULL, NULL, NULL, NULL, '0', '测试节点10-3', '5', '2017-08-20', NULL, NULL),
('11-0', NULL, NULL, NULL, NULL, '0', '测试节点11-0', '6', '2016-09-05', NULL, NULL),
('12-0', NULL, NULL, NULL, NULL, '0', '测试节点12-0', '7', '2016-08-16', NULL, NULL),
('13-0', NULL, NULL, NULL, NULL, '0', '测试节点13-0', '8', '2015-11-01', NULL, NULL),
('13-1', NULL, NULL, NULL, NULL, '0', '测试节点13-1', '8', '2016-01-30', NULL, NULL),
('13-2', NULL, NULL, NULL, NULL, '0', '测试节点13-2', '8', '2016-03-21', NULL, NULL),
('13-3', NULL, NULL, NULL, NULL, '0', '测试节点13-3', '8', '2016-06-20', NULL, NULL),
('14-0', NULL, NULL, NULL, NULL, '0', '测试节点14-0', '9', '2015-05-07', NULL, NULL),
('2-0', NULL, NULL, NULL, NULL, '0', '测试节点2-0', '10', '2015-04-23', NULL, NULL),
('3-0', NULL, NULL, NULL, NULL, '0', '测试节点3-0', '11', '2015-10-30', NULL, NULL),
('3-1', NULL, NULL, NULL, NULL, '0', '测试节点3-1', '11', '2015-12-27', NULL, NULL),
('3-2', NULL, NULL, NULL, NULL, '0', '测试节点3-2', '11', '2016-02-23', NULL, NULL),
('3-3', NULL, NULL, NULL, NULL, '0', '测试节点3-3', '11', '2016-05-03', NULL, NULL),
('3-4', NULL, NULL, NULL, NULL, '0', '测试节点3-4', '11', '2016-08-01', NULL, NULL),
('4-0', NULL, NULL, NULL, NULL, '0', '测试节点4-0', '12', '2015-04-07', NULL, NULL),
('5-0', NULL, NULL, NULL, NULL, '0', '测试节点5-0', '13', '2016-05-12', NULL, NULL),
('6-0', NULL, NULL, NULL, NULL, '0', '测试节点6-0', '14', '2016-12-23', NULL, NULL),
('6-1', NULL, NULL, NULL, NULL, '0', '测试节点6-1', '14', '2017-03-11', NULL, NULL),
('7-0', NULL, NULL, NULL, NULL, '0', '测试节点7-0', '2', '2015-05-01', NULL, NULL),
('7-1', NULL, NULL, NULL, NULL, '0', '测试节点7-1', '2', '2015-06-22', NULL, NULL),
('7-2', NULL, NULL, NULL, NULL, '0', '测试节点7-2', '2', '2015-08-18', NULL, NULL),
('8-0', NULL, NULL, NULL, NULL, '0', '测试节点8-0', '3', '2016-11-19', NULL, NULL),
('9-0', NULL, NULL, NULL, NULL, '0', '测试节点9-0', '4', '2016-10-26', NULL, NULL),
('9-1', NULL, NULL, NULL, NULL, '0', '测试节点9-1', '4', '2016-12-14', NULL, NULL),
('9-2', NULL, NULL, NULL, NULL, '0', '测试节点9-2', '4', '2017-01-27', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `tbl_payment`
--

CREATE TABLE `tbl_payment` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `account_paid` double DEFAULT NULL,
  `invoice_code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `invoice_content` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `payment_date` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `receive_date` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `contract_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_payment`
--

INSERT INTO `tbl_payment` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `account_paid`, `invoice_code`, `invoice_content`, `payment_date`, `receive_date`, `contract_id`, `name`, `comment`) VALUES
('0', NULL, NULL, '0', NULL, '0', 9364, '67134824', '测试数据', '2016-10-04', '2017-01-26', '7', NULL, NULL),
('1', NULL, NULL, '1', NULL, '0', 10493, '86815738', '测试数据', '2017-01-26', '2017-03-05', '10', NULL, NULL),
('10', NULL, NULL, '10', NULL, '0', 10498, '99476339', '测试数据', '2017-02-15', '2017-03-26', '5', NULL, NULL),
('11', NULL, NULL, '11', NULL, '0', 10875, '02317662', '测试数据', '2016-10-15', '2017-02-09', '1', NULL, NULL),
('12', NULL, NULL, '12', NULL, '0', 11950, '26051799', '测试数据', '2016-12-23', '2017-02-04', '15', NULL, NULL),
('13', NULL, NULL, '13', NULL, '0', 9229, '28875830', '测试数据', '2017-02-17', '2017-02-25', '2', NULL, NULL),
('14', NULL, NULL, '14', NULL, '0', 11979, '73337722', '测试数据', '2015-12-17', '2016-02-11', '15', NULL, NULL),
('15', NULL, NULL, '15', NULL, '0', 10921, '55988731', '测试数据', '2015-10-11', '2017-02-28', '9', NULL, NULL),
('16', NULL, NULL, '16', NULL, '0', 10003, '27654919', '测试数据', '2016-12-09', '2017-02-11', '1', NULL, NULL),
('17', NULL, NULL, '17', NULL, '0', 11745, '84736406', '测试数据', '2016-12-11', '2017-03-14', '13', NULL, NULL),
('18', NULL, NULL, '18', NULL, '0', 11403, '17207603', '测试数据', '2016-12-03', '2017-01-18', '0', NULL, NULL),
('19', NULL, NULL, '19', NULL, '0', 9287, '90814292', '测试数据', '2015-06-26', '2016-02-08', '12', NULL, NULL),
('2', NULL, NULL, '2', NULL, '0', 10897, '77399258', '测试数据', '2016-10-18', '2017-03-07', '0', NULL, NULL),
('20', NULL, NULL, '20', NULL, '0', 9620, '74675544', '测试数据', '2017-01-09', '2017-03-04', '4', NULL, NULL),
('21', NULL, NULL, '21', NULL, '0', 10150, '39338083', '测试数据', '2016-06-04', '2017-03-06', '3', NULL, NULL),
('22', NULL, NULL, '22', NULL, '0', 11271, '51140612', '测试数据', '2015-05-01', '2015-06-24', '3', NULL, NULL),
('23', NULL, NULL, '23', NULL, '0', 10815, '57500888', '测试数据', '2016-10-31', '2017-03-21', '11', NULL, NULL),
('24', NULL, NULL, '24', NULL, '0', 11932, '62083733', '测试数据', '2017-02-28', '2017-03-05', '3', NULL, NULL),
('25', NULL, NULL, '25', NULL, '0', 11991, '44791863', '测试数据', '2016-08-26', '2017-03-08', '8', NULL, NULL),
('26', NULL, NULL, '26', NULL, '0', 9973, '47020501', '测试数据', '2016-08-25', '2017-02-02', '2', NULL, NULL),
('27', NULL, NULL, '27', NULL, '0', 11587, '91313802', '测试数据', '2016-04-14', '2017-03-02', '5', NULL, NULL),
('28', NULL, NULL, '28', NULL, '0', 9190, '86465022', '测试数据', '2016-03-30', '2017-01-19', '8', NULL, NULL),
('29', NULL, NULL, '29', NULL, '0', 10467, '42212153', '测试数据', '2017-01-01', '2017-02-28', '4', NULL, NULL),
('3', NULL, NULL, '3', NULL, '0', 9614, '23468713', '测试数据', '2017-02-05', '2017-03-09', '10', NULL, NULL),
('30', NULL, NULL, '30', NULL, '0', 9961, '42814967', '测试数据', '2016-10-07', '2017-03-12', '10', NULL, NULL),
('31', NULL, NULL, '31', NULL, '0', 10421, '37754819', '测试数据', '2016-12-19', '2017-01-29', '2', NULL, NULL),
('32', NULL, NULL, '32', NULL, '0', 9409, '59745826', '测试数据', '2017-01-09', '2017-02-18', '11', NULL, NULL),
('33', NULL, NULL, '33', NULL, '0', 9404, '01674164', '测试数据', '2016-11-10', '2016-12-04', '5', NULL, NULL),
('34', NULL, NULL, '34', NULL, '0', 11040, '59976266', '测试数据', '2017-01-03', '2017-03-03', '8', NULL, NULL),
('35', NULL, NULL, '35', NULL, '0', 9838, '52824136', '测试数据', '2017-01-15', '2017-03-17', '7', NULL, NULL),
('36', NULL, NULL, '36', NULL, '0', 9814, '18914988', '测试数据', '2016-12-26', '2017-03-17', '15', NULL, NULL),
('37', NULL, NULL, '37', NULL, '0', 10722, '02478624', '测试数据', '2015-12-08', '2016-06-02', '12', NULL, NULL),
('38', NULL, NULL, '38', NULL, '0', 11746, '58123835', '测试数据', '2015-11-03', '2016-09-01', '3', NULL, NULL),
('39', NULL, NULL, '39', NULL, '0', 10680, '77373000', '测试数据', '2017-02-09', '2017-03-18', '4', NULL, NULL),
('4', NULL, NULL, '4', NULL, '0', 9817, '28760991', '测试数据', '2017-02-18', '2017-02-19', '10', NULL, NULL),
('40', NULL, NULL, '40', NULL, '0', 11286, '18497667', '测试数据', '2016-10-21', '2016-11-19', '2', NULL, NULL),
('41', NULL, NULL, '41', NULL, '0', 10185, '52152096', '测试数据', '2017-01-30', '2017-03-15', '6', NULL, NULL),
('42', NULL, NULL, '42', NULL, '0', 9707, '53655471', '测试数据', '2016-10-04', '2016-12-12', '5', NULL, NULL),
('43', NULL, NULL, '43', NULL, '0', 10617, '16972282', '测试数据', '2016-10-24', '2016-11-21', '2', NULL, NULL),
('44', NULL, NULL, '44', NULL, '0', 10257, '31027818', '测试数据', '2015-05-03', '2016-03-31', '9', NULL, NULL),
('45', NULL, NULL, '45', NULL, '0', 11369, '07109301', '测试数据', '2017-01-16', '2017-03-14', '14', NULL, NULL),
('46', NULL, NULL, '46', NULL, '0', 11838, '63961793', '测试数据', '2016-10-24', '2017-03-19', '15', NULL, NULL),
('47', NULL, NULL, '47', NULL, '0', 9735, '12336081', '测试数据', '2016-08-10', '2017-02-20', '2', NULL, NULL),
('48', NULL, NULL, '48', NULL, '0', 10684, '68622490', '测试数据', '2016-12-26', '2017-01-11', '4', NULL, NULL),
('49', NULL, NULL, '49', NULL, '0', 9876, '29192900', '测试数据', '2017-01-17', '2017-02-06', '8', NULL, NULL),
('5', NULL, NULL, '5', NULL, '0', 11831, '11057539', '测试数据', '2017-02-15', '2017-03-29', '1', NULL, NULL),
('50', NULL, NULL, '50', NULL, '0', 11252, '77934741', '测试数据', '2017-02-06', '2017-02-27', '1', NULL, NULL),
('51', NULL, NULL, '51', NULL, '0', 11132, '88887194', '测试数据', '2016-08-29', '2016-11-15', '11', NULL, NULL),
('52', NULL, NULL, '52', NULL, '0', 11274, '32323586', '测试数据', '2015-07-15', '2016-01-24', '3', NULL, NULL),
('53', NULL, NULL, '53', NULL, '0', 9643, '07924172', '测试数据', '2016-05-27', '2016-07-20', '12', NULL, NULL),
('54', NULL, NULL, '54', NULL, '0', 10992, '65827977', '测试数据', '2016-09-15', '2016-11-15', '8', NULL, NULL),
('55', NULL, NULL, '55', NULL, '0', 9120, '31039835', '测试数据', '2017-01-16', '2017-03-11', '4', NULL, NULL),
('56', NULL, NULL, '56', NULL, '0', 10610, '35441685', '测试数据', '2016-11-23', '2017-01-14', '15', NULL, NULL),
('57', NULL, NULL, '57', NULL, '0', 10213, '37754367', '测试数据', '2017-02-19', '2017-03-09', '6', NULL, NULL),
('58', NULL, NULL, '58', NULL, '0', 10843, '21922567', '测试数据', '2017-02-05', '2017-02-11', '4', NULL, NULL),
('59', NULL, NULL, '59', NULL, '0', 10048, '14899297', '测试数据', '2015-02-17', '2016-07-06', '9', NULL, NULL),
('6', NULL, NULL, '6', NULL, '0', 11061, '86125105', '测试数据', '2016-09-06', '2016-09-17', '9', NULL, NULL),
('60', NULL, NULL, '60', NULL, '0', 10140, '92231327', '测试数据', '2016-05-19', '2016-10-18', '11', NULL, NULL),
('61', NULL, NULL, '61', NULL, '0', 10441, '22372879', '测试数据', '2017-02-09', '2017-02-15', '7', NULL, NULL),
('62', NULL, NULL, '62', NULL, '0', 11658, '17513097', '测试数据', '2015-09-01', '2016-04-28', '9', NULL, NULL),
('63', NULL, NULL, '63', NULL, '0', 10211, '95194551', '测试数据', '2016-02-17', '2016-04-25', '8', NULL, NULL),
('64', NULL, NULL, '64', NULL, '0', 9529, '46242662', '测试数据', '2016-01-30', '2016-11-19', '12', NULL, NULL),
('65', NULL, NULL, '65', NULL, '0', 10775, '69641565', '测试数据', '2016-12-13', '2017-02-14', '6', NULL, NULL),
('66', NULL, NULL, '66', NULL, '0', 11474, '93408751', '测试数据', '2016-04-06', '2016-06-01', '5', NULL, NULL),
('67', NULL, NULL, '67', NULL, '0', 11465, '90503274', '测试数据', '2016-10-06', '2017-02-25', '12', NULL, NULL),
('68', NULL, NULL, '68', NULL, '0', 9051, '18177455', '测试数据', '2016-08-26', '2017-01-15', '1', NULL, NULL),
('69', NULL, NULL, '69', NULL, '0', 11878, '48788196', '测试数据', '2016-07-29', '2016-12-26', '8', NULL, NULL),
('7', NULL, NULL, '7', NULL, '0', 10453, '94970795', '测试数据', '2016-11-13', '2017-02-23', '7', NULL, NULL),
('8', NULL, NULL, '8', NULL, '0', 10439, '15605404', '测试数据', '2016-11-30', '2017-02-20', '12', NULL, NULL),
('9', NULL, NULL, '9', NULL, '0', 9203, '93407885', '测试数据', '2016-12-11', '2017-03-07', '4', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `tbl_payment_resource`
--

CREATE TABLE `tbl_payment_resource` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `payment_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_personnel`
--

CREATE TABLE `tbl_personnel` (
  `birthday` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `gender` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `graduate_from` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `graduate_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `personnel_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `scholar` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `work_start_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `id` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_personnel`
--

INSERT INTO `tbl_personnel` (`birthday`, `gender`, `graduate_from`, `graduate_time`, `personnel_name`, `scholar`, `work_start_time`, `id`) VALUES
('1990-01-016', 'male', '墨尔本大学', '2014-08-05', 'DimitriZhao', 'master', '2014-09-01', '0'),
(NULL, NULL, NULL, NULL, 'TEST', NULL, NULL, '665dcf97-1865-4eaa-aa1e-4f32d5ac92fa');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_project`
--

CREATE TABLE `tbl_project` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `actual_duration` int(255) DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `completed` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `director_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `expected_duration` int(255) DEFAULT NULL,
  `location` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `project_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `start_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_project`
--

INSERT INTO `tbl_project` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `actual_duration`, `comment`, `completed`, `director_id`, `expected_duration`, `location`, `project_name`, `start_time`, `name`) VALUES
('0', NULL, NULL, '0', NULL, '0', NULL, 'TEST', '0', NULL, 29, '上海', '项目0', '2016-05-28', NULL),
('1', '17:39:50', '0', '1', NULL, '0', NULL, '测试数据', '1', NULL, 25, '上海', '项目1', '2015-04-23', NULL),
('10', NULL, NULL, '10', NULL, '0', NULL, '测试数据', '1', NULL, 24, '广州', '项目10', '2015-04-05', NULL),
('11', NULL, NULL, '11', NULL, '0', NULL, '测试数据', '1', NULL, 25, '广州', '项目11', '2015-10-14', NULL),
('12', NULL, NULL, '12', NULL, '0', NULL, '测试数据', '1', NULL, 33, '上海', '项目12', '2015-02-22', NULL),
('13', NULL, NULL, '13', NULL, '0', NULL, '测试数据', '1', NULL, 25, '上海', '项目13', '2016-05-03', NULL),
('14', NULL, NULL, '14', NULL, '0', NULL, '测试数据', '1', NULL, 27, '沈阳', '项目14', '2016-12-18', NULL),
('2', NULL, NULL, '2', NULL, '0', NULL, '测试数据', '1', NULL, 27, '北京', '项目2', '2015-03-18', NULL),
('3', NULL, NULL, '3', NULL, '0', NULL, '测试数据', '1', NULL, 30, '沈阳', '项目3', '2016-10-01', NULL),
('4', NULL, NULL, '4', NULL, '0', NULL, '测试数据', '1', NULL, 30, '北京', '项目4', '2016-09-13', NULL),
('5', NULL, NULL, '5', NULL, '0', NULL, '测试数据', '1', NULL, 26, '深圳', '项目5', '2016-12-25', NULL),
('6', NULL, NULL, '6', NULL, '0', NULL, '测试数据', '1', NULL, 27, '沈阳', '项目6', '2016-08-01', NULL),
('7', NULL, NULL, '7', NULL, '0', NULL, '测试数据', '0', NULL, 33, '北京', '项目7', '2016-08-11', NULL),
('8', NULL, NULL, '8', NULL, '0', NULL, '测试数据', '0', NULL, 31, '沈阳', '项目8', '2015-10-28', NULL),
('9', NULL, NULL, '9', NULL, '0', NULL, '测试数据', '0', NULL, 25, '上海', '项目9', '2015-05-06', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `tbl_resume`
--

CREATE TABLE `tbl_resume` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `personnel_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_standard`
--

CREATE TABLE `tbl_standard` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `issue_date` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `status` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `summary` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_standard`
--

INSERT INTO `tbl_standard` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `name`, `issue_date`, `status`, `summary`, `type`) VALUES
('0', NULL, NULL, '0', NULL, '0', '测试数据0', '2013-04-30', '0', NULL, '1'),
('1', NULL, NULL, '1', NULL, '0', '测试数据1', '2014-07-03', '0', NULL, '2'),
('10', NULL, NULL, '10', NULL, '0', '测试数据10', '2012-12-24', '1', NULL, '1'),
('11', NULL, NULL, '11', NULL, '0', '测试数据11', '2012-07-05', '0', NULL, '1'),
('12', '11:55:38', '0', '12', NULL, '0', '测试数据12', '2016-01-03', '1', 'TEST', '0'),
('13', NULL, NULL, '13', NULL, '0', '测试数据13', '2013-08-29', '1', NULL, '1'),
('14', NULL, NULL, '14', NULL, '0', '测试数据14', '2014-06-26', '0', NULL, '2'),
('2', NULL, NULL, '2', NULL, '0', '测试数据2', '2012-02-17', '1', NULL, '0'),
('3', NULL, NULL, '3', NULL, '0', '测试数据3', '2014-09-25', '0', NULL, '1'),
('4', NULL, NULL, '4', NULL, '0', '测试数据4', '2012-10-17', '0', NULL, '0'),
('5', NULL, NULL, '5', NULL, '0', '测试数据5', '2013-11-21', '0', NULL, '1'),
('6', NULL, NULL, '6', NULL, '0', '测试数据6', '2015-10-12', '0', NULL, '2'),
('7', NULL, NULL, '7', NULL, '0', '测试数据7', '2015-05-16', '0', NULL, '2'),
('8', NULL, NULL, '8', NULL, '0', '测试数据8', '2014-03-25', '1', NULL, '1'),
('9', NULL, NULL, '9', NULL, '0', '测试数据9', '2012-05-05', '1', NULL, '1'),
('eb1ab7cd-33d9-436f-855c-963027c532ff', NULL, NULL, 'TEST', '2017-05-19 11:55:14', '0', 'TEST', '2017-05-10', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `tbl_standard_resource`
--

CREATE TABLE `tbl_standard_resource` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `standard_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_delete_authorization`
--

CREATE TABLE `tbl_sys_delete_authorization` (
  `organization_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_delete_authorization`
--

INSERT INTO `tbl_sys_delete_authorization` (`organization_id`, `role_id`) VALUES
('0', '0'),
('0-0', '0'),
('0-1', '0'),
('0-2', '0'),
('0-2-0', '0'),
('0-2-1', '0'),
('0-2-2', '0'),
('0-2-4', '0'),
('0-2-5', '0'),
('0-3', '0'),
('0-3-0', '0'),
('0-3-1', '0'),
('0-3-2', '0'),
('0-3-3', '0'),
('0-4', '0'),
('0-5', '0');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_edit_authorization`
--

CREATE TABLE `tbl_sys_edit_authorization` (
  `organization_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_edit_authorization`
--

INSERT INTO `tbl_sys_edit_authorization` (`organization_id`, `role_id`) VALUES
('0', '0'),
('0-0', '0'),
('0-1', '0'),
('0-2', '0'),
('0-2-0', '0'),
('0-2-1', '0'),
('0-2-2', '0'),
('0-2-4', '0'),
('0-2-5', '0'),
('0-3', '0'),
('0-3-0', '0'),
('0-3-1', '0'),
('0-3-2', '0'),
('0-3-3', '0'),
('0-4', '0'),
('0-5', '0');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_file`
--

CREATE TABLE `tbl_sys_file` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `file_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `file_path` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_file`
--

INSERT INTO `tbl_sys_file` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `name`, `file_name`, `file_path`) VALUES
('05823009-20c1-414f-bea4-5e19739fe0bf', NULL, NULL, NULL, NULL, NULL, NULL, 'temp2.txt', 'E:/storage/journalResources/0/ba563b44-2360-459d-86e7-d70c6769cc90'),
('42ab6291-4063-4c6e-a22d-5e525b4fae8c', NULL, NULL, NULL, NULL, NULL, NULL, 'tempstorage.txt', 'E:/storage/journalResources/0/be711a76-db2e-4a57-8465-ca79aabdcf8a');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_function`
--

CREATE TABLE `tbl_sys_function` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `function_code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `menu_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `function_path` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `function_string` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_function`
--

INSERT INTO `tbl_sys_function` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `function_code`, `menu_id`, `name`, `function_path`, `function_string`) VALUES
('0-0-F0', NULL, NULL, '0-0-F0', NULL, NULL, '0-0-F0', '0-0', '新增用户', '/addUser', 'addUser'),
('0-0-F1', NULL, NULL, '0-0-F1', NULL, NULL, '0-0-F1', '0-0', '修改用户', '/editUser', 'editUser'),
('0-0-F2', NULL, NULL, '0-0-F2', NULL, NULL, '0-0-F2', '0-0', '删除用户', '/deleteUser', 'deleteUser'),
('0-0-F3', NULL, NULL, '0-0-F3', NULL, NULL, '0-0-F3', '0-0', '查询用户', '/queryUsers', 'queryUsers'),
('0-1-F0', NULL, NULL, '0-1-F0', NULL, NULL, '0-1-F0', '0-1', '新增组织', '/addOrganization', 'addOrganization'),
('0-1-F1', NULL, NULL, '0-1-F1', NULL, NULL, '0-1-F1', '0-1', '修改组织', '/editOrganization', 'editOrganization'),
('0-1-F2', NULL, NULL, '0-1-F2', NULL, NULL, '0-1-F2', '0-1', '删除组织', '/deleteOrganization', 'deleteOrganization'),
('0-1-F3', NULL, NULL, '0-1-F3', NULL, NULL, '0-1-F3', '0-1', '新增角色', '/addRole', 'addRole'),
('0-1-F4', NULL, NULL, '0-1-F4', NULL, NULL, '0-1-F4', '0-1', '修改角色', '/editRole', 'editRole'),
('0-1-F5', NULL, NULL, '0-1-F5', NULL, NULL, '0-1-F4', '0-1', '删除角色', '/deleteRole', 'deleteRole'),
('0-2-F0', NULL, NULL, '0-2-F0', NULL, NULL, '0-2-F0', '0-2', '设置权限', NULL, 'placeholder0'),
('1-0-F0', NULL, NULL, '1-0-F0', NULL, NULL, '1-0-F0', '1-0', '新增项目', '/addProject', 'addProject'),
('1-0-F1', NULL, NULL, '1-0-F1', NULL, NULL, '1-0-F1', '1-0', '修改项目', '/editProject', 'editProject'),
('1-0-F2', NULL, NULL, '1-0-F2', NULL, NULL, '1-0-F2', '1-0', '删除项目', '/deleteProject', 'deleteProject'),
('1-0-F3', NULL, NULL, '1-0-F3', NULL, NULL, '1-0-F3', '1-0', '新增课题', '/addTopic', 'addTopic'),
('1-0-F4', NULL, NULL, '1-0-F4', NULL, NULL, '1-0-F4', '1-0', '修改课题', '/editTopic', 'editTopic'),
('1-0-F5', NULL, NULL, '1-0-F5', NULL, NULL, '1-0-F5', '1-0', '删除课题', '/deleteTopic', 'deleteTopic'),
('1-0-F6', NULL, NULL, '1-0-F6', NULL, NULL, '1-0-F6', '1-0', '新增关键节点', '/addMilestone', 'addMilestone'),
('1-0-F7', NULL, NULL, '1-0-F7', NULL, NULL, '1-0-F7', '1-0', '修改关键节点', '/editMilestone', 'editMilestone'),
('1-0-F8', NULL, NULL, '1-0-F8', NULL, NULL, '1-0-F8', '1-0', '删除关键节点', '/deleteMilestone', 'deleteMilestone'),
('1-0-F9', NULL, NULL, '1-0-F9', NULL, NULL, '1-0-F9', '1-0', '查询项目', '/queryProjects', 'queryProjects'),
('1-1-0-F0', NULL, NULL, '1-1-0-F0', NULL, NULL, '1-1-0-F0', '1-1-0', '新增个人项目日志', '/addPersonalJournal', 'addJournal'),
('1-1-0-F1', NULL, NULL, '1-1-0-F1', NULL, NULL, '1-1-0-F1', '1-1-0', '修改个人项目日志', '/editPersonalJournal', 'editJournal'),
('1-1-0-F2', NULL, NULL, '1-1-0-F2', NULL, NULL, '1-1-0-F2', '1-1-0', '删除个人项目日志', '/deletePersonalJournal', 'deleteJournal'),
('1-1-1-F0', NULL, NULL, '1-1-1-F0', NULL, NULL, '1-1-1-F0', '1-1-1', '查看项目日志', '/inspectJournal', 'inspectJournal'),
('1-1-2-F0', NULL, NULL, '1-1-2-F0', NULL, NULL, '1-1-2-F0', '1-1-2', '项目日志统计信息', '', 'journalStatistics'),
('2-0-F0', NULL, NULL, '2-0-F0', NULL, NULL, '2-0-F0', '2-0', '新增员工', '/addPersonnel', 'addPersonnel'),
('2-0-F1', NULL, NULL, '2-0-F1', NULL, NULL, '2-0-F1', '2-0', '修改员工', '/editPersonnel', 'editPersonnel'),
('2-0-F2', NULL, NULL, '2-0-F2', NULL, NULL, '2-0-F2', '2-0', '删除员工', '/deletePersonnel', 'deletePersonnel'),
('2-0-F3', NULL, NULL, '2-0-F3', NULL, NULL, '2-0-F3', '2-0', '查询员工', '/queryPersonnels', 'queryPersonnels'),
('3-0-F0', NULL, NULL, '3-0-F0', NULL, NULL, '3-0-F0', '3-0', '新增合同', '/addContract', 'addContract'),
('3-0-F1', NULL, NULL, '3-0-F1', NULL, NULL, '3-0-F1', '3-0', '修改合同', '/editContract', 'editContract'),
('3-0-F2', NULL, NULL, '3-0-F2', NULL, NULL, '3-0-F2', '3-0', '删除合同', '/deleteContract', 'deleteContract'),
('3-0-F3', NULL, NULL, '3-0-F3', NULL, NULL, '3-0-F3', '3-0', '新增付款', '/addPayment', 'addPayment'),
('3-0-F4', NULL, NULL, '3-0-F4', NULL, NULL, '3-0-F4', '3-0', '修改付款', '/editPayment', 'editPayment'),
('3-0-F5', NULL, NULL, '3-0-F5', NULL, NULL, '3-0-F5', '3-0', '删除付款', '/deletePayment', 'deletePayment'),
('3-0-F6', NULL, NULL, '3-0-F6', NULL, NULL, '3-0-F6', '3-0', '查询合同', '/queryContracts', 'queryContracts'),
('3-1-F0', NULL, NULL, '3-1-F0', NULL, NULL, '3-1-F0', '3-1', '新增客户', '/addCustomer', 'addCustomer'),
('3-1-F1', NULL, NULL, '3-1-F1', NULL, NULL, '3-1-F1', '3-1', '修改客户', '/editCustomer', 'editCustomer'),
('3-1-F2', NULL, NULL, '3-1-F2', NULL, NULL, '3-1-F2', '3-1', '删除客户', '/deleteCustomer', 'deleteCustomer'),
('3-1-F3', NULL, NULL, '3-1-F3', NULL, NULL, '3-1-F3', '3-1', '查询客户', '/queryCustomers', 'queryCustomers'),
('4-0-F0', NULL, NULL, '4-0-F0', NULL, NULL, '4-0-F0', '4-0', '新增国家标准', '/addStandard', 'addStandard'),
('4-0-F1', NULL, NULL, '4-0-F1', NULL, NULL, '4-0-F1', '4-0', '删除国家标准', '/deleteStandard', 'deleteStandard'),
('4-0-F2', NULL, NULL, '4-0-F2', NULL, NULL, '4-0-F2', '4-0', '修改国家标准', '/editStandard', 'editStandard'),
('4-0-F3', NULL, NULL, '4-0-F3', NULL, NULL, '4-0-F3', '4-0', '查询国家标准', '/queryStandards', 'queryStandards');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_menu`
--

CREATE TABLE `tbl_sys_menu` (
  `ID` varchar(100) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `MENU_PATH` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `MENU_ICON` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `MODULE_ID` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_ID` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_menu`
--

INSERT INTO `tbl_sys_menu` (`ID`, `CODE`, `MENU_PATH`, `MENU_ICON`, `MODULE_ID`, `PARENT_ID`, `altered_time`, `altered_user_id`, `created_time`, `created_user_id`, `name`) VALUES
('0-0', '0-0', '/user_list', 'idcard', '0', NULL, NULL, NULL, NULL, NULL, '用户管理'),
('0-1', '0-1', '/organization_tree', 'usb', '0', NULL, NULL, NULL, NULL, NULL, '组织管理'),
('0-2', '0-2', '/role_list', 'key', '0', NULL, NULL, NULL, NULL, NULL, '角色管理'),
('1-0', '1-0', '/project_list', 'database', '1', NULL, NULL, NULL, NULL, NULL, '项目信息'),
('1-1', '1-1', NULL, 'laptop', '1', NULL, NULL, NULL, NULL, NULL, '项目日志'),
('1-1-0', '1-1-0', '/personnel_journals', 'tag-o', NULL, '1-1', NULL, NULL, NULL, NULL, '个人日志信息'),
('1-1-1', '1-1-1', '/journal_list', 'tags', NULL, '1-1', NULL, NULL, NULL, NULL, '项目日志信息'),
('1-1-2', '1-1-2', '/journal_statistics', 'line-chart', NULL, '1-1', NULL, NULL, NULL, NULL, '日志信息统计'),
('2-0', '2-0', '/personnel_list', 'solution', '2', NULL, NULL, NULL, NULL, NULL, '员工信息'),
('3-0', '3-0', '/contract_list', 'red-envelope', '3', NULL, NULL, NULL, NULL, NULL, '合同信息'),
('3-1', '3-1', '/customer_list', 'contacts', '3', NULL, NULL, NULL, NULL, NULL, '客户信息'),
('4-0', '4-0', '/standard_list', 'book', '4', NULL, NULL, NULL, NULL, NULL, '国家标准规范');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_module`
--

CREATE TABLE `tbl_sys_module` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `module_icon` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `module_path` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_module`
--

INSERT INTO `tbl_sys_module` (`id`, `code`, `module_icon`, `module_path`, `altered_time`, `altered_user_id`, `created_time`, `created_user_id`, `name`) VALUES
('0', 'SYSTEM', 'setting', '/index/system', NULL, NULL, NULL, NULL, '系统管理'),
('1', 'PROJECT', 'eye-o', '/index/project', NULL, NULL, NULL, NULL, '项目监理'),
('2', 'PERSONNEL', 'team', '/index/personnel', NULL, NULL, NULL, NULL, '人力资源'),
('3', 'CONTRACT', 'bank', '/index/contract', NULL, NULL, NULL, NULL, '经营管理'),
('4', 'KNOWLEDGE', 'global', '/index/global', NULL, NULL, NULL, NULL, '知识库');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_operation_log`
--

CREATE TABLE `tbl_sys_operation_log` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `client` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `date_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `file_names` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `params` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `response_status` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `uri` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_organization`
--

CREATE TABLE `tbl_sys_organization` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `organization_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `parent_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_organization`
--

INSERT INTO `tbl_sys_organization` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `organization_name`, `parent_id`, `name`, `description`) VALUES
('0', NULL, NULL, '0', NULL, '0', '北京国冶锐诚工程技术有限公司', NULL, NULL, NULL),
('0-0', NULL, NULL, '0-0', NULL, '0', '综合部', '0', NULL, NULL),
('0-1', NULL, NULL, '0-1', NULL, '0', '财务部', '0', NULL, NULL),
('0-2', NULL, NULL, '0-2', NULL, '0', '监理部', '0', NULL, NULL),
('0-2-0', NULL, NULL, '0-2-0', NULL, '0', '东北地区', '0-2', NULL, NULL),
('0-2-1', NULL, NULL, '0-2-1', NULL, '0', '华北地区', '0-2', NULL, NULL),
('0-2-2', NULL, NULL, '0-2-2', NULL, '0', '华东地区', '0-2', NULL, NULL),
('0-2-4', NULL, NULL, '0-2-4', NULL, '0', '西北地区', '0-2', NULL, NULL),
('0-2-5', NULL, NULL, '0-2-5', NULL, '0', '焦化专项', '0-2', NULL, NULL),
('0-3', NULL, NULL, '0-3', NULL, '0', '工程部', '0', NULL, NULL),
('0-3-0', NULL, NULL, '0-3-0', NULL, '0', '烧结项目', '0-3', NULL, NULL),
('0-3-1', NULL, NULL, '0-3-1', NULL, '0', '球团项目', '0-3', NULL, NULL),
('0-3-2', NULL, NULL, '0-3-2', NULL, '0', '焦化项目', '0-3', NULL, NULL),
('0-3-3', NULL, NULL, '0-3-3', NULL, '0', '预算组', '0-3', NULL, NULL),
('0-4', NULL, NULL, '0-4', NULL, '0', '开发部', '0', NULL, NULL),
('0-5', NULL, NULL, '0-5', NULL, '0', '咨询部', '0', NULL, NULL),
('c01eebe8-2e59-4743-8dbf-dc990210289f', NULL, NULL, NULL, '2017-05-17 15:24:51', '0', '管理员组', '0', NULL, '系统维护');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_organization_user`
--

CREATE TABLE `tbl_sys_organization_user` (
  `organization_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `is_principal` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_organization_user`
--

INSERT INTO `tbl_sys_organization_user` (`organization_id`, `user_id`, `is_principal`) VALUES
('c01eebe8-2e59-4743-8dbf-dc990210289f', '0', '1'),
('0-2-0', '665dcf97-1865-4eaa-aa1e-4f32d5ac92fa', '0');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_query_authorization`
--

CREATE TABLE `tbl_sys_query_authorization` (
  `organization_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_query_authorization`
--

INSERT INTO `tbl_sys_query_authorization` (`organization_id`, `role_id`) VALUES
('0', '0'),
('0-0', '0'),
('0-1', '0'),
('0-2', '0'),
('0-2-0', '0'),
('0-2-1', '0'),
('0-2-2', '0'),
('0-2-4', '0'),
('0-2-5', '0'),
('0-3', '0'),
('0-3-0', '0'),
('0-3-1', '0'),
('0-3-2', '0'),
('0-3-3', '0'),
('0-4', '0'),
('0-5', '0');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_role`
--

CREATE TABLE `tbl_sys_role` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_string` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_role`
--

INSERT INTO `tbl_sys_role` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `role_name`, `name`, `description`, `role_string`) VALUES
('0', '11:28:46', '0', '0', NULL, '0', '超级管理员', NULL, NULL, 'super_admin'),
('1fb22ed9-2261-4cac-9884-d5dc2a895648', NULL, NULL, NULL, '2017-05-18 09:21:30', '0', '普通用户', NULL, NULL, 'normal_user');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_role_function`
--

CREATE TABLE `tbl_sys_role_function` (
  `function_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `role_id` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_role_function`
--

INSERT INTO `tbl_sys_role_function` (`function_id`, `role_id`) VALUES
('1-0-F0', '0'),
('1-0-F1', '0'),
('1-0-F2', '0'),
('1-0-F3', '0'),
('1-0-F4', '0'),
('1-0-F5', '0'),
('1-0-F6', '0'),
('1-0-F7', '0'),
('1-0-F8', '0'),
('1-0-F9', '0'),
('1-1-0-F0', '0'),
('1-1-0-F1', '0'),
('1-1-0-F2', '0'),
('1-1-1-F0', '0'),
('1-1-2-F0', '0'),
('4-0-F0', '0'),
('4-0-F1', '0'),
('4-0-F2', '0'),
('2-0-F0', '0'),
('2-0-F1', '0'),
('2-0-F2', '0'),
('2-0-F3', '0'),
('3-0-F0', '0'),
('3-0-F1', '0'),
('3-0-F2', '0'),
('3-0-F3', '0'),
('3-0-F4', '0'),
('3-0-F5', '0'),
('3-0-F6', '0'),
('3-1-F0', '0'),
('3-1-F1', '0'),
('3-1-F2', '0'),
('3-1-F3', '0'),
('0-0-F0', '0'),
('0-0-F1', '0'),
('0-0-F2', '0'),
('0-0-F3', '0'),
('0-1-F0', '0'),
('0-1-F1', '0'),
('0-1-F2', '0'),
('0-1-F3', '0'),
('0-1-F4', '0'),
('0-1-F5', '0'),
('0-2-F0', '0'),
('1-0-F9', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('1-1-0-F0', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('1-1-0-F1', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('1-1-0-F2', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('3-0-F6', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('3-1-F3', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('4-0-F0', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('4-0-F1', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('4-0-F2', '1fb22ed9-2261-4cac-9884-d5dc2a895648'),
('4-0-F3', '1fb22ed9-2261-4cac-9884-d5dc2a895648');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_role_user`
--

CREATE TABLE `tbl_sys_role_user` (
  `user_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `role_id` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_role_user`
--

INSERT INTO `tbl_sys_role_user` (`user_id`, `role_id`) VALUES
('0', '0'),
('665dcf97-1865-4eaa-aa1e-4f32d5ac92fa', '1fb22ed9-2261-4cac-9884-d5dc2a895648');

-- --------------------------------------------------------

--
-- 表的结构 `tbl_sys_user`
--

CREATE TABLE `tbl_sys_user` (
  `ID` varchar(100) COLLATE utf8_bin NOT NULL,
  `CODE` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `USERNAME` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `PASSWORD` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `salt` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_sys_user`
--

INSERT INTO `tbl_sys_user` (`ID`, `CODE`, `USERNAME`, `PASSWORD`, `altered_time`, `altered_user_id`, `created_time`, `created_user_id`, `name`, `salt`) VALUES
('0', '0', 'admin', '21232F297A57A5A743894A0E4A801FC3', NULL, NULL, NULL, '0', 'DimitriZhao', NULL),
('665dcf97-1865-4eaa-aa1e-4f32d5ac92fa', NULL, 'test', NULL, '13:52:10', '0', NULL, '0', 'TEST', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `tbl_topic`
--

CREATE TABLE `tbl_topic` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `altered_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `altered_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_time` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created_user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `project_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `topic_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `director_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `location` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `start_time` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `tbl_topic`
--

INSERT INTO `tbl_topic` (`id`, `altered_time`, `altered_user_id`, `code`, `created_time`, `created_user_id`, `project_id`, `topic_name`, `name`, `comment`, `director_id`, `location`, `start_time`) VALUES
('0', NULL, NULL, '0', NULL, '0', '4', '项目4---课题0', NULL, NULL, NULL, '沈阳', '2017-08-27'),
('1', NULL, NULL, '1', NULL, '0', '5', '项目5---课题1', NULL, NULL, NULL, '深圳', '2017-12-12'),
('10', NULL, NULL, '10', NULL, '0', '11', '项目11---课题10', NULL, NULL, NULL, '上海', '2017-07-28'),
('11', NULL, NULL, '11', NULL, '0', '7', '项目7---课题11', NULL, NULL, NULL, '广州', '2017-10-08'),
('12', NULL, NULL, '12', NULL, '0', '10', '项目10---课题12', NULL, NULL, NULL, '沈阳', '2017-04-26'),
('13', NULL, NULL, '13', NULL, '0', '2', '项目2---课题13', NULL, NULL, NULL, '上海', '2016-11-10'),
('14', NULL, NULL, '14', NULL, '0', '10', '项目10---课题14', NULL, NULL, NULL, '沈阳', '2016-08-30'),
('15', NULL, NULL, '15', NULL, '0', '6', '项目6---课题15', NULL, NULL, NULL, '北京', '2017-12-09'),
('16', NULL, NULL, '16', NULL, '0', '9', '项目9---课题16', NULL, NULL, NULL, '深圳', '2017-09-25'),
('17', NULL, NULL, '17', NULL, '0', '12', '项目12---课题17', NULL, NULL, NULL, '深圳', '2017-07-19'),
('18', NULL, NULL, '18', NULL, '0', '10', '项目10---课题18', NULL, NULL, NULL, '广州', '2015-04-19'),
('19', NULL, NULL, '19', NULL, '0', '2', '项目2---课题19', NULL, NULL, NULL, '深圳', '2017-09-24'),
('2', NULL, NULL, '2', NULL, '0', '7', '项目7---课题2', NULL, NULL, NULL, '沈阳', '2017-06-25'),
('20', NULL, NULL, '20', NULL, '0', '1', '项目1---课题20', NULL, NULL, NULL, '深圳', '2015-05-13'),
('21', NULL, NULL, '21', NULL, '0', '5', '项目5---课题21', NULL, NULL, NULL, '广州', '2017-10-03'),
('22', NULL, NULL, '22', NULL, '0', '14', '项目14---课题22', NULL, NULL, NULL, '广州', '2017-10-20'),
('23', NULL, NULL, '23', NULL, '0', '14', '项目14---课题23', NULL, NULL, NULL, '广州', '2017-05-04'),
('24', NULL, NULL, '24', NULL, '0', '13', '项目13---课题24', NULL, NULL, NULL, '广州', '2016-08-13'),
('25', NULL, NULL, '25', NULL, '0', '4', '项目4---课题25', NULL, NULL, NULL, '深圳', '2017-03-09'),
('26', NULL, NULL, '26', NULL, '0', '8', '项目8---课题26', NULL, NULL, NULL, '沈阳', '2016-11-23'),
('27', NULL, NULL, '27', NULL, '0', '13', '项目13---课题27', NULL, NULL, NULL, '上海', '2017-01-10'),
('28', NULL, NULL, '28', NULL, '0', '12', '项目12---课题28', NULL, NULL, NULL, '广州', '2017-05-19'),
('29', NULL, NULL, '29', NULL, '0', '13', '项目13---课题29', NULL, NULL, NULL, '深圳', '2016-12-12'),
('3', NULL, NULL, '3', NULL, '0', '2', '项目2---课题3', NULL, NULL, NULL, '北京', '2017-10-14'),
('4', NULL, NULL, '4', NULL, '0', '4', '项目4---课题4', NULL, NULL, NULL, '北京', '2017-08-29'),
('5', NULL, NULL, '5', NULL, '0', '9', '项目9---课题5', NULL, NULL, NULL, '沈阳', '2017-01-27'),
('6', NULL, NULL, '6', NULL, '0', '7', '项目7---课题6', NULL, NULL, NULL, '沈阳', '2016-10-25'),
('7', NULL, NULL, '7', NULL, '0', '9', '项目9---课题7', NULL, NULL, NULL, '北京', '2017-06-20'),
('8', NULL, NULL, '8', NULL, '0', '6', '项目6---课题8', NULL, NULL, NULL, '北京', '2017-02-14'),
('9', NULL, NULL, '9', NULL, '0', '3', '项目3---课题9', NULL, NULL, NULL, '上海', '2017-02-28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_contract`
--
ALTER TABLE `tbl_contract`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_contract_resource`
--
ALTER TABLE `tbl_contract_resource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_t0jksviuhcb1652e6td5l4cyq` (`customer_id`),
  ADD KEY `FK_agh4karl1g242xj7cm3j437e2` (`contract_id`);

--
-- Indexes for table `tbl_customer`
--
ALTER TABLE `tbl_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_customer_resource`
--
ALTER TABLE `tbl_customer_resource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9nsk4ggxxa0giywhk25o7wotn` (`contract_id`),
  ADD KEY `FK_j5jpihwnqds8xhsndau9ctlr3` (`customer_id`);

--
-- Indexes for table `tbl_journal`
--
ALTER TABLE `tbl_journal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_journal_resource`
--
ALTER TABLE `tbl_journal_resource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5l7gxj2yv6maitbo8wbvyqvli` (`journal_id`);

--
-- Indexes for table `tbl_milestone`
--
ALTER TABLE `tbl_milestone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_jlgy4naiuflxclsndbgp8ctu8` (`project_id`);

--
-- Indexes for table `tbl_payment`
--
ALTER TABLE `tbl_payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_aggq18i5c9blmniujodl8ubmx` (`contract_id`);

--
-- Indexes for table `tbl_payment_resource`
--
ALTER TABLE `tbl_payment_resource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6qt1nw8nq8v4ssygjlie4w6ar` (`payment_id`);

--
-- Indexes for table `tbl_personnel`
--
ALTER TABLE `tbl_personnel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_resume`
--
ALTER TABLE `tbl_resume`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_mrkqfwp5h8jsygkh59lvq0ap3` (`personnel_id`);

--
-- Indexes for table `tbl_standard`
--
ALTER TABLE `tbl_standard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_standard_resource`
--
ALTER TABLE `tbl_standard_resource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_n0r46alou8q4tpjpnctfpabjo` (`standard_id`);

--
-- Indexes for table `tbl_sys_file`
--
ALTER TABLE `tbl_sys_file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sys_function`
--
ALTER TABLE `tbl_sys_function`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_itqdcta4ccyss9hycawsgucrm` (`menu_id`);

--
-- Indexes for table `tbl_sys_menu`
--
ALTER TABLE `tbl_sys_menu`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_i69suv95ch4ud7irsd1lregqy` (`MODULE_ID`);

--
-- Indexes for table `tbl_sys_module`
--
ALTER TABLE `tbl_sys_module`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sys_operation_log`
--
ALTER TABLE `tbl_sys_operation_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sys_organization`
--
ALTER TABLE `tbl_sys_organization`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sys_organization_user`
--
ALTER TABLE `tbl_sys_organization_user`
  ADD KEY `FK_1xf5y20elkka13pumi8r2f8r4` (`organization_id`),
  ADD KEY `FK_syj426syoggn9kae85kspa0se` (`user_id`);

--
-- Indexes for table `tbl_sys_role`
--
ALTER TABLE `tbl_sys_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_sys_role_function`
--
ALTER TABLE `tbl_sys_role_function`
  ADD KEY `FK_tgfnmsm51p1heid7qd9wcghxj` (`function_id`),
  ADD KEY `FK_2r3mx5cv4q1eu6i7oex4a7y65` (`role_id`);

--
-- Indexes for table `tbl_sys_role_user`
--
ALTER TABLE `tbl_sys_role_user`
  ADD KEY `FK_4rbt5lhjoqj0r268ur0gcurf2` (`role_id`),
  ADD KEY `FK_44m1qqntwycmydgmmdcmagdn3` (`user_id`);

--
-- Indexes for table `tbl_sys_user`
--
ALTER TABLE `tbl_sys_user`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_topic`
--
ALTER TABLE `tbl_topic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_o8dc6e1w8u4ci53fjycq0fm3q` (`project_id`);

--
-- 限制导出的表
--

--
-- 限制表 `tbl_contract_resource`
--
ALTER TABLE `tbl_contract_resource`
  ADD CONSTRAINT `FK_agh4karl1g242xj7cm3j437e2` FOREIGN KEY (`contract_id`) REFERENCES `tbl_contract` (`id`),
  ADD CONSTRAINT `FK_eave1qjwlcrv6n4wlw4eoq8lh` FOREIGN KEY (`id`) REFERENCES `tbl_sys_file` (`id`),
  ADD CONSTRAINT `FK_t0jksviuhcb1652e6td5l4cyq` FOREIGN KEY (`customer_id`) REFERENCES `tbl_customer` (`id`);

--
-- 限制表 `tbl_customer_resource`
--
ALTER TABLE `tbl_customer_resource`
  ADD CONSTRAINT `FK_73ma8bs5m7ccp4hinobwt1efa` FOREIGN KEY (`id`) REFERENCES `tbl_sys_file` (`id`),
  ADD CONSTRAINT `FK_9nsk4ggxxa0giywhk25o7wotn` FOREIGN KEY (`contract_id`) REFERENCES `tbl_contract` (`id`),
  ADD CONSTRAINT `FK_j5jpihwnqds8xhsndau9ctlr3` FOREIGN KEY (`customer_id`) REFERENCES `tbl_customer` (`id`);

--
-- 限制表 `tbl_journal_resource`
--
ALTER TABLE `tbl_journal_resource`
  ADD CONSTRAINT `FK_5l7gxj2yv6maitbo8wbvyqvli` FOREIGN KEY (`journal_id`) REFERENCES `tbl_journal` (`id`),
  ADD CONSTRAINT `FK_plsfkm1lhchq6a8xkcwhg6tek` FOREIGN KEY (`id`) REFERENCES `tbl_sys_file` (`id`);

--
-- 限制表 `tbl_payment_resource`
--
ALTER TABLE `tbl_payment_resource`
  ADD CONSTRAINT `FK_6qt1nw8nq8v4ssygjlie4w6ar` FOREIGN KEY (`payment_id`) REFERENCES `tbl_payment` (`id`),
  ADD CONSTRAINT `FK_qp1jib8k1g8erwk79osjfher7` FOREIGN KEY (`id`) REFERENCES `tbl_sys_file` (`id`);

--
-- 限制表 `tbl_personnel`
--
ALTER TABLE `tbl_personnel`
  ADD CONSTRAINT `FK_fsccgo6c0pikh7qjvx2i0uwwi` FOREIGN KEY (`id`) REFERENCES `tbl_sys_user` (`ID`);

--
-- 限制表 `tbl_resume`
--
ALTER TABLE `tbl_resume`
  ADD CONSTRAINT `FK_ji1callpgbim2b1aft04fg345` FOREIGN KEY (`id`) REFERENCES `tbl_sys_file` (`id`),
  ADD CONSTRAINT `FK_mrkqfwp5h8jsygkh59lvq0ap3` FOREIGN KEY (`personnel_id`) REFERENCES `tbl_personnel` (`id`);

--
-- 限制表 `tbl_standard_resource`
--
ALTER TABLE `tbl_standard_resource`
  ADD CONSTRAINT `FK_c7j3o7u37sq49med5mw7x7qq6` FOREIGN KEY (`id`) REFERENCES `tbl_sys_file` (`id`),
  ADD CONSTRAINT `FK_n0r46alou8q4tpjpnctfpabjo` FOREIGN KEY (`standard_id`) REFERENCES `tbl_standard` (`id`);

--
-- 限制表 `tbl_sys_role_user`
--
ALTER TABLE `tbl_sys_role_user`
  ADD CONSTRAINT `FK_44m1qqntwycmydgmmdcmagdn3` FOREIGN KEY (`user_id`) REFERENCES `tbl_sys_user` (`ID`),
  ADD CONSTRAINT `FK_4rbt5lhjoqj0r268ur0gcurf2` FOREIGN KEY (`role_id`) REFERENCES `tbl_sys_role` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
