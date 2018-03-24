# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: hanbao
# Generation Time: 2018-03-24 13:04:28 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table resource
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resource`;

CREATE TABLE `resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `type` enum('view','access','update','delete','create') NOT NULL COMMENT '资源类型',
  `module` varchar(30) NOT NULL COMMENT '资源所属模块',
  `name` varchar(30) NOT NULL COMMENT '资源具体名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `resource` WRITE;
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;

INSERT INTO `resource` (`id`, `createAt`, `updateAt`, `type`, `module`, `name`)
VALUES
	(1,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','access','group','post'),
	(2,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','access','group','comment'),
	(3,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','access','group','profile'),
	(4,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','access','group','member'),
	(5,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','delete','group','post'),
	(6,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','delete','group','comment'),
	(7,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','delete','group','member'),
	(8,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','create','group','member'),
	(9,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','update','group','profile'),
	(10,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','delete','group','group'),
	(11,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','update','group','member'),
	(12,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','update','group','viewPermission'),
	(13,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','view','group','post'),
	(14,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','view','group','comment'),
	(15,'2017-01-17 22:39:45.000000','2017-01-17 22:39:45.000000','view','group','member');

/*!40000 ALTER TABLE `resource` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table resource_roles_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resource_roles_role`;

CREATE TABLE `resource_roles_role` (
  `resourceId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`resourceId`,`roleId`),
  KEY `fk_319da899a65f1580b55436f4697` (`roleId`),
  CONSTRAINT `fk_319da899a65f1580b55436f4697` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_ef97eab6fb5e6879bc6f30f9368` FOREIGN KEY (`resourceId`) REFERENCES `resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `resource_roles_role` WRITE;
/*!40000 ALTER TABLE `resource_roles_role` DISABLE KEYS */;

INSERT INTO `resource_roles_role` (`resourceId`, `roleId`)
VALUES
	(1,1),
	(2,1),
	(3,1),
	(4,1),
	(13,1),
	(14,1),
	(15,1),
	(5,2),
	(6,2),
	(7,2),
	(8,2),
	(9,2),
	(10,3),
	(11,3),
	(12,3);

/*!40000 ALTER TABLE `resource_roles_role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `name` varchar(30) NOT NULL COMMENT '角色名称',
  `childId` int(11) DEFAULT NULL,
  `grantId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ind_40d2ca74be4647b072764e2108` (`name`),
  KEY `fk_2446e6c1966865011182d6107e3` (`childId`),
  KEY `fk_8a4049e8fd0bdd878c64979225a` (`grantId`),
  CONSTRAINT `fk_2446e6c1966865011182d6107e3` FOREIGN KEY (`childId`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_8a4049e8fd0bdd878c64979225a` FOREIGN KEY (`grantId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO `role` (`id`, `createAt`, `updateAt`, `name`, `childId`, `grantId`)
VALUES
	(1,'2018-02-17 16:00:00.000000','2018-02-17 16:00:00.000000','regular',NULL,NULL),
	(2,'2018-02-17 16:00:00.000000','2018-02-17 16:00:00.000000','admin',1,1),
	(3,'2018-02-17 16:00:00.000000','2018-02-17 16:00:00.000000','owner',2,2),
	(4,'2018-02-17 16:00:00.000000','2018-02-17 16:00:00.000000','privateOwner',2,1);

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
