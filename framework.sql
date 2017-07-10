-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-07-10 10:34:05
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
-- 表的结构 `act_evt_log`
--

CREATE TABLE `act_evt_log` (
  `LOG_NR_` bigint(20) NOT NULL,
  `TYPE_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TIME_STAMP_` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DATA_` longblob,
  `LOCK_OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LOCK_TIME_` timestamp NULL DEFAULT NULL,
  `IS_PROCESSED_` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_ge_bytearray`
--

CREATE TABLE `act_ge_bytearray` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BYTES_` longblob,
  `GENERATED_` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_ge_property`
--

CREATE TABLE `act_ge_property` (
  `NAME_` varchar(64) COLLATE utf8_bin NOT NULL,
  `VALUE_` varchar(300) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `act_ge_property`
--

INSERT INTO `act_ge_property` (`NAME_`, `VALUE_`, `REV_`) VALUES
('next.dbid', '1', 1),
('schema.history', 'create(5.17.0.2)', 1),
('schema.version', '5.17.0.2', 1);

-- --------------------------------------------------------

--
-- 表的结构 `act_hi_actinst`
--

CREATE TABLE `act_hi_actinst` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `ACT_ID_` varchar(255) COLLATE utf8_bin NOT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `CALL_PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ACT_TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_TIME_` datetime NOT NULL,
  `END_TIME_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_hi_attachment`
--

CREATE TABLE `act_hi_attachment` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `URL_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `CONTENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TIME_` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_hi_comment`
--

CREATE TABLE `act_hi_comment` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TIME_` datetime NOT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACTION_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `MESSAGE_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `FULL_MSG_` longblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_hi_detail`
--

CREATE TABLE `act_hi_detail` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VAR_TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TIME_` datetime NOT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_hi_identitylink`
--

CREATE TABLE `act_hi_identitylink` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `GROUP_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_hi_procinst`
--

CREATE TABLE `act_hi_procinst` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `BUSINESS_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `START_TIME_` datetime NOT NULL,
  `END_TIME_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `START_USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `END_ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SUPER_PROCESS_INSTANCE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DELETE_REASON_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_hi_taskinst`
--

CREATE TABLE `act_hi_taskinst` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_DEF_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `START_TIME_` datetime NOT NULL,
  `CLAIM_TIME_` datetime DEFAULT NULL,
  `END_TIME_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `DELETE_REASON_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `DUE_DATE_` datetime DEFAULT NULL,
  `FORM_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_hi_varinst`
--

CREATE TABLE `act_hi_varinst` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VAR_TYPE_` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `REV_` int(11) DEFAULT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `CREATE_TIME_` datetime DEFAULT NULL,
  `LAST_UPDATED_TIME_` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_id_group`
--

CREATE TABLE `act_id_group` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_id_info`
--

CREATE TABLE `act_id_info` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `USER_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `VALUE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PASSWORD_` longblob,
  `PARENT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_id_membership`
--

CREATE TABLE `act_id_membership` (
  `USER_ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `GROUP_ID_` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_id_user`
--

CREATE TABLE `act_id_user` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `FIRST_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LAST_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EMAIL_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PWD_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PICTURE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_re_deployment`
--

CREATE TABLE `act_re_deployment` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `DEPLOY_TIME_` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_re_model`
--

CREATE TABLE `act_re_model` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATE_TIME_` timestamp NULL DEFAULT NULL,
  `LAST_UPDATE_TIME_` timestamp NULL DEFAULT NULL,
  `VERSION_` int(11) DEFAULT NULL,
  `META_INFO_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EDITOR_SOURCE_VALUE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EDITOR_SOURCE_EXTRA_VALUE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_re_procdef`
--

CREATE TABLE `act_re_procdef` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `KEY_` varchar(255) COLLATE utf8_bin NOT NULL,
  `VERSION_` int(11) NOT NULL,
  `DEPLOYMENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `RESOURCE_NAME_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DGRM_RESOURCE_NAME_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `HAS_START_FORM_KEY_` tinyint(4) DEFAULT NULL,
  `HAS_GRAPHICAL_NOTATION_` tinyint(4) DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_ru_event_subscr`
--

CREATE TABLE `act_ru_event_subscr` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `EVENT_TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `EVENT_NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACTIVITY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `CONFIGURATION_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `CREATED_` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_ru_execution`
--

CREATE TABLE `act_ru_execution` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BUSINESS_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `SUPER_EXEC_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `ACT_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `IS_ACTIVE_` tinyint(4) DEFAULT NULL,
  `IS_CONCURRENT_` tinyint(4) DEFAULT NULL,
  `IS_SCOPE_` tinyint(4) DEFAULT NULL,
  `IS_EVENT_SCOPE_` tinyint(4) DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `CACHED_ENT_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `LOCK_TIME_` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_ru_identitylink`
--

CREATE TABLE `act_ru_identitylink` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `GROUP_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `USER_ID_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_ru_job`
--

CREATE TABLE `act_ru_job` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `LOCK_EXP_TIME_` timestamp NULL DEFAULT NULL,
  `LOCK_OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `EXCLUSIVE_` tinyint(1) DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROCESS_INSTANCE_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `RETRIES_` int(11) DEFAULT NULL,
  `EXCEPTION_STACK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `EXCEPTION_MSG_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `DUEDATE_` timestamp NULL DEFAULT NULL,
  `REPEAT_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `HANDLER_TYPE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `HANDLER_CFG_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_ru_task`
--

CREATE TABLE `act_ru_task` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_DEF_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `PARENT_TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DESCRIPTION_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TASK_DEF_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `OWNER_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `ASSIGNEE_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `DELEGATION_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `CREATE_TIME_` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `DUE_DATE_` datetime DEFAULT NULL,
  `CATEGORY_` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `SUSPENSION_STATE_` int(11) DEFAULT NULL,
  `TENANT_ID_` varchar(255) COLLATE utf8_bin DEFAULT '',
  `FORM_KEY_` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `act_ru_variable`
--

CREATE TABLE `act_ru_variable` (
  `ID_` varchar(64) COLLATE utf8_bin NOT NULL,
  `REV_` int(11) DEFAULT NULL,
  `TYPE_` varchar(255) COLLATE utf8_bin NOT NULL,
  `NAME_` varchar(255) COLLATE utf8_bin NOT NULL,
  `EXECUTION_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `PROC_INST_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `TASK_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `BYTEARRAY_ID_` varchar(64) COLLATE utf8_bin DEFAULT NULL,
  `DOUBLE_` double DEFAULT NULL,
  `LONG_` bigint(20) DEFAULT NULL,
  `TEXT_` varchar(4000) COLLATE utf8_bin DEFAULT NULL,
  `TEXT2_` varchar(4000) COLLATE utf8_bin DEFAULT NULL
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
('9-2', NULL, NULL, NULL, NULL, '0', '测试节点9-2', '4', '2017-01-27', NULL, NULL),
('93a0ada7-facf-4476-af21-1bff96de4011', NULL, NULL, NULL, '2017-07-10 16:24:32', '0', 'TEST1', '1', '2017-07-02T08:24:29.282Z', NULL, NULL),
('f988c509-5b74-463b-ae42-c53204c78689', NULL, NULL, NULL, '2017-07-10 16:24:22', '0', 'TEST0', '1', '2016-07-07T08:24:16.858Z', NULL, NULL);

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
('0', NULL, NULL, '0', NULL, '0', '测试数据0', '2015-12-17', '1', NULL, '2'),
('1', NULL, NULL, '1', NULL, '0', '测试数据1', '2014-10-12', '1', NULL, '2'),
('10', NULL, NULL, '10', NULL, '0', '测试数据10', '2014-12-10', '0', NULL, '0'),
('11', NULL, NULL, '11', NULL, '0', '测试数据11', '2012-04-13', '1', NULL, '0'),
('12', NULL, NULL, '12', NULL, '0', '测试数据12', '2013-07-23', '0', NULL, '2'),
('13', NULL, NULL, '13', NULL, '0', '测试数据13', '2013-03-02', '1', NULL, '0'),
('14', NULL, NULL, '14', NULL, '0', '测试数据14', '2016-08-03', '1', NULL, '2'),
('2', NULL, NULL, '2', NULL, '0', '测试数据2', '2016-01-01', '0', NULL, '0'),
('3', NULL, NULL, '3', NULL, '0', '测试数据3', '2014-05-25', '0', NULL, '2'),
('4', NULL, NULL, '4', NULL, '0', '测试数据4', '2016-11-16', '1', NULL, '1'),
('5', NULL, NULL, '5', NULL, '0', '测试数据5', '2016-11-07', '1', NULL, '2'),
('6', NULL, NULL, '6', NULL, '0', '测试数据6', '2012-11-05', '1', NULL, '1'),
('7', NULL, NULL, '7', NULL, '0', '测试数据7', '2015-02-14', '1', NULL, '0'),
('8', NULL, NULL, '8', NULL, '0', '测试数据8', '2015-11-19', '1', NULL, '0'),
('9', NULL, NULL, '9', NULL, '0', '测试数据9', '2013-03-05', '1', NULL, '2');

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
('0', NULL, NULL, '0', NULL, '0', '公司', NULL, NULL, NULL),
('0-0', NULL, NULL, '0-0', NULL, '0', '组织0', '0', NULL, NULL),
('0-1', NULL, NULL, '0-1', NULL, '0', '组织1', '0', NULL, NULL),
('0-2', NULL, NULL, '0-2', NULL, '0', '组织2', '0', NULL, NULL),
('0-2-0', NULL, NULL, '0-2-0', NULL, '0', '组织2-0', '0-2', NULL, NULL),
('0-2-1', NULL, NULL, '0-2-1', NULL, '0', '组织2-1', '0-2', NULL, NULL),
('0-2-2', NULL, NULL, '0-2-2', NULL, '0', '组织2-2', '0-2', NULL, NULL),
('0-2-4', NULL, NULL, '0-2-4', NULL, '0', '组织2-3', '0-2', NULL, NULL),
('0-2-5', NULL, NULL, '0-2-5', NULL, '0', '组织2-4', '0-2', NULL, NULL),
('0-3', NULL, NULL, '0-3', NULL, '0', '组织3', '0', NULL, NULL),
('0-3-0', NULL, NULL, '0-3-0', NULL, '0', '组织3-0', '0-3', NULL, NULL),
('0-3-1', NULL, NULL, '0-3-1', NULL, '0', '组织3-1', '0-3', NULL, NULL),
('0-3-2', NULL, NULL, '0-3-2', NULL, '0', '组织3-2', '0-3', NULL, NULL),
('0-3-3', NULL, NULL, '0-3-3', NULL, '0', '组织3-3', '0-3', NULL, NULL),
('0-4', NULL, NULL, '0-4', NULL, '0', '组织4', '0', NULL, NULL),
('0-5', NULL, NULL, '0-5', NULL, '0', '组织5', '0', NULL, NULL),
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
('0', 'c10ce096-6f06-4ca3-a7c0-07a436ad8c92', '0'),
('0-0', '22e37288-112e-4c82-a2a5-a1b9eb6f019c', '0');

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
('4-0-F0', '0'),
('4-0-F1', '0'),
('4-0-F2', '0'),
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
('22e37288-112e-4c82-a2a5-a1b9eb6f019c', '1fb22ed9-2261-4cac-9884-d5dc2a895648');

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
('22e37288-112e-4c82-a2a5-a1b9eb6f019c', NULL, 'test', 'E10ADC3949BA59ABBE56E057F20F883E', '09:37:05', '0', '2017-06-14 09:36:39', '0', 'TEST', NULL);

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
-- Indexes for table `act_evt_log`
--
ALTER TABLE `act_evt_log`
  ADD PRIMARY KEY (`LOG_NR_`);

--
-- Indexes for table `act_ge_bytearray`
--
ALTER TABLE `act_ge_bytearray`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_FK_BYTEARR_DEPL` (`DEPLOYMENT_ID_`);

--
-- Indexes for table `act_ge_property`
--
ALTER TABLE `act_ge_property`
  ADD PRIMARY KEY (`NAME_`);

--
-- Indexes for table `act_hi_actinst`
--
ALTER TABLE `act_hi_actinst`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_HI_ACT_INST_START` (`START_TIME_`),
  ADD KEY `ACT_IDX_HI_ACT_INST_END` (`END_TIME_`),
  ADD KEY `ACT_IDX_HI_ACT_INST_PROCINST` (`PROC_INST_ID_`,`ACT_ID_`),
  ADD KEY `ACT_IDX_HI_ACT_INST_EXEC` (`EXECUTION_ID_`,`ACT_ID_`);

--
-- Indexes for table `act_hi_attachment`
--
ALTER TABLE `act_hi_attachment`
  ADD PRIMARY KEY (`ID_`);

--
-- Indexes for table `act_hi_comment`
--
ALTER TABLE `act_hi_comment`
  ADD PRIMARY KEY (`ID_`);

--
-- Indexes for table `act_hi_detail`
--
ALTER TABLE `act_hi_detail`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_HI_DETAIL_PROC_INST` (`PROC_INST_ID_`),
  ADD KEY `ACT_IDX_HI_DETAIL_ACT_INST` (`ACT_INST_ID_`),
  ADD KEY `ACT_IDX_HI_DETAIL_TIME` (`TIME_`),
  ADD KEY `ACT_IDX_HI_DETAIL_NAME` (`NAME_`),
  ADD KEY `ACT_IDX_HI_DETAIL_TASK_ID` (`TASK_ID_`);

--
-- Indexes for table `act_hi_identitylink`
--
ALTER TABLE `act_hi_identitylink`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_HI_IDENT_LNK_USER` (`USER_ID_`),
  ADD KEY `ACT_IDX_HI_IDENT_LNK_TASK` (`TASK_ID_`),
  ADD KEY `ACT_IDX_HI_IDENT_LNK_PROCINST` (`PROC_INST_ID_`);

--
-- Indexes for table `act_hi_procinst`
--
ALTER TABLE `act_hi_procinst`
  ADD PRIMARY KEY (`ID_`),
  ADD UNIQUE KEY `PROC_INST_ID_` (`PROC_INST_ID_`),
  ADD KEY `ACT_IDX_HI_PRO_INST_END` (`END_TIME_`),
  ADD KEY `ACT_IDX_HI_PRO_I_BUSKEY` (`BUSINESS_KEY_`);

--
-- Indexes for table `act_hi_taskinst`
--
ALTER TABLE `act_hi_taskinst`
  ADD PRIMARY KEY (`ID_`);

--
-- Indexes for table `act_hi_varinst`
--
ALTER TABLE `act_hi_varinst`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_HI_PROCVAR_PROC_INST` (`PROC_INST_ID_`),
  ADD KEY `ACT_IDX_HI_PROCVAR_NAME_TYPE` (`NAME_`,`VAR_TYPE_`),
  ADD KEY `ACT_IDX_HI_PROCVAR_TASK_ID` (`TASK_ID_`);

--
-- Indexes for table `act_id_group`
--
ALTER TABLE `act_id_group`
  ADD PRIMARY KEY (`ID_`);

--
-- Indexes for table `act_id_info`
--
ALTER TABLE `act_id_info`
  ADD PRIMARY KEY (`ID_`);

--
-- Indexes for table `act_id_membership`
--
ALTER TABLE `act_id_membership`
  ADD PRIMARY KEY (`USER_ID_`,`GROUP_ID_`),
  ADD KEY `ACT_FK_MEMB_GROUP` (`GROUP_ID_`);

--
-- Indexes for table `act_id_user`
--
ALTER TABLE `act_id_user`
  ADD PRIMARY KEY (`ID_`);

--
-- Indexes for table `act_re_deployment`
--
ALTER TABLE `act_re_deployment`
  ADD PRIMARY KEY (`ID_`);

--
-- Indexes for table `act_re_model`
--
ALTER TABLE `act_re_model`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_FK_MODEL_SOURCE` (`EDITOR_SOURCE_VALUE_ID_`),
  ADD KEY `ACT_FK_MODEL_SOURCE_EXTRA` (`EDITOR_SOURCE_EXTRA_VALUE_ID_`),
  ADD KEY `ACT_FK_MODEL_DEPLOYMENT` (`DEPLOYMENT_ID_`);

--
-- Indexes for table `act_re_procdef`
--
ALTER TABLE `act_re_procdef`
  ADD PRIMARY KEY (`ID_`),
  ADD UNIQUE KEY `ACT_UNIQ_PROCDEF` (`KEY_`,`VERSION_`,`TENANT_ID_`);

--
-- Indexes for table `act_ru_event_subscr`
--
ALTER TABLE `act_ru_event_subscr`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_EVENT_SUBSCR_CONFIG_` (`CONFIGURATION_`),
  ADD KEY `ACT_FK_EVENT_EXEC` (`EXECUTION_ID_`);

--
-- Indexes for table `act_ru_execution`
--
ALTER TABLE `act_ru_execution`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_EXEC_BUSKEY` (`BUSINESS_KEY_`),
  ADD KEY `ACT_FK_EXE_PROCINST` (`PROC_INST_ID_`),
  ADD KEY `ACT_FK_EXE_PARENT` (`PARENT_ID_`),
  ADD KEY `ACT_FK_EXE_SUPER` (`SUPER_EXEC_`),
  ADD KEY `ACT_FK_EXE_PROCDEF` (`PROC_DEF_ID_`);

--
-- Indexes for table `act_ru_identitylink`
--
ALTER TABLE `act_ru_identitylink`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_IDENT_LNK_USER` (`USER_ID_`),
  ADD KEY `ACT_IDX_IDENT_LNK_GROUP` (`GROUP_ID_`),
  ADD KEY `ACT_IDX_ATHRZ_PROCEDEF` (`PROC_DEF_ID_`),
  ADD KEY `ACT_FK_TSKASS_TASK` (`TASK_ID_`),
  ADD KEY `ACT_FK_IDL_PROCINST` (`PROC_INST_ID_`);

--
-- Indexes for table `act_ru_job`
--
ALTER TABLE `act_ru_job`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_FK_JOB_EXCEPTION` (`EXCEPTION_STACK_ID_`);

--
-- Indexes for table `act_ru_task`
--
ALTER TABLE `act_ru_task`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_TASK_CREATE` (`CREATE_TIME_`),
  ADD KEY `ACT_FK_TASK_EXE` (`EXECUTION_ID_`),
  ADD KEY `ACT_FK_TASK_PROCINST` (`PROC_INST_ID_`),
  ADD KEY `ACT_FK_TASK_PROCDEF` (`PROC_DEF_ID_`);

--
-- Indexes for table `act_ru_variable`
--
ALTER TABLE `act_ru_variable`
  ADD PRIMARY KEY (`ID_`),
  ADD KEY `ACT_IDX_VARIABLE_TASK_ID` (`TASK_ID_`),
  ADD KEY `ACT_FK_VAR_EXE` (`EXECUTION_ID_`),
  ADD KEY `ACT_FK_VAR_PROCINST` (`PROC_INST_ID_`),
  ADD KEY `ACT_FK_VAR_BYTEARRAY` (`BYTEARRAY_ID_`);

--
-- Indexes for table `tbl_milestone`
--
ALTER TABLE `tbl_milestone`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_jlgy4naiuflxclsndbgp8ctu8` (`project_id`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`id`);

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
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `act_evt_log`
--
ALTER TABLE `act_evt_log`
  MODIFY `LOG_NR_` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- 限制导出的表
--

--
-- 限制表 `act_ge_bytearray`
--
ALTER TABLE `act_ge_bytearray`
  ADD CONSTRAINT `ACT_FK_BYTEARR_DEPL` FOREIGN KEY (`DEPLOYMENT_ID_`) REFERENCES `act_re_deployment` (`ID_`);

--
-- 限制表 `act_id_membership`
--
ALTER TABLE `act_id_membership`
  ADD CONSTRAINT `ACT_FK_MEMB_GROUP` FOREIGN KEY (`GROUP_ID_`) REFERENCES `act_id_group` (`ID_`),
  ADD CONSTRAINT `ACT_FK_MEMB_USER` FOREIGN KEY (`USER_ID_`) REFERENCES `act_id_user` (`ID_`);

--
-- 限制表 `act_re_model`
--
ALTER TABLE `act_re_model`
  ADD CONSTRAINT `ACT_FK_MODEL_DEPLOYMENT` FOREIGN KEY (`DEPLOYMENT_ID_`) REFERENCES `act_re_deployment` (`ID_`),
  ADD CONSTRAINT `ACT_FK_MODEL_SOURCE` FOREIGN KEY (`EDITOR_SOURCE_VALUE_ID_`) REFERENCES `act_ge_bytearray` (`ID_`),
  ADD CONSTRAINT `ACT_FK_MODEL_SOURCE_EXTRA` FOREIGN KEY (`EDITOR_SOURCE_EXTRA_VALUE_ID_`) REFERENCES `act_ge_bytearray` (`ID_`);

--
-- 限制表 `act_ru_event_subscr`
--
ALTER TABLE `act_ru_event_subscr`
  ADD CONSTRAINT `ACT_FK_EVENT_EXEC` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `act_ru_execution` (`ID_`);

--
-- 限制表 `act_ru_execution`
--
ALTER TABLE `act_ru_execution`
  ADD CONSTRAINT `ACT_FK_EXE_PARENT` FOREIGN KEY (`PARENT_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  ADD CONSTRAINT `ACT_FK_EXE_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  ADD CONSTRAINT `ACT_FK_EXE_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ACT_FK_EXE_SUPER` FOREIGN KEY (`SUPER_EXEC_`) REFERENCES `act_ru_execution` (`ID_`);

--
-- 限制表 `act_ru_identitylink`
--
ALTER TABLE `act_ru_identitylink`
  ADD CONSTRAINT `ACT_FK_ATHRZ_PROCEDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  ADD CONSTRAINT `ACT_FK_IDL_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  ADD CONSTRAINT `ACT_FK_TSKASS_TASK` FOREIGN KEY (`TASK_ID_`) REFERENCES `act_ru_task` (`ID_`);

--
-- 限制表 `act_ru_job`
--
ALTER TABLE `act_ru_job`
  ADD CONSTRAINT `ACT_FK_JOB_EXCEPTION` FOREIGN KEY (`EXCEPTION_STACK_ID_`) REFERENCES `act_ge_bytearray` (`ID_`);

--
-- 限制表 `act_ru_task`
--
ALTER TABLE `act_ru_task`
  ADD CONSTRAINT `ACT_FK_TASK_EXE` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  ADD CONSTRAINT `ACT_FK_TASK_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  ADD CONSTRAINT `ACT_FK_TASK_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`);

--
-- 限制表 `act_ru_variable`
--
ALTER TABLE `act_ru_variable`
  ADD CONSTRAINT `ACT_FK_VAR_BYTEARRAY` FOREIGN KEY (`BYTEARRAY_ID_`) REFERENCES `act_ge_bytearray` (`ID_`),
  ADD CONSTRAINT `ACT_FK_VAR_EXE` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  ADD CONSTRAINT `ACT_FK_VAR_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`);

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
