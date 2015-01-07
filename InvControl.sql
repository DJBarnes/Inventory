-- MySQL dump 10.13  Distrib 5.5.29, for osx10.6 (i386)
--
-- Host: localhost    Database: InvControl
-- ------------------------------------------------------
-- Server version	5.5.29-0ubuntu0.12.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `consumable` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (2,'Supply',1);
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ItemType`
--

DROP TABLE IF EXISTS `ItemType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ItemType` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `description` varchar(55) NOT NULL,
  `quantity` int(3) NOT NULL,
  `categoryId` int(2) NOT NULL DEFAULT '1',
  `vendorId` int(11) NOT NULL,
  `emailThreshold` int(11) DEFAULT NULL,
  `itemUrl` varchar(150) DEFAULT NULL,
  `onOrderQuantity` int(3) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `vendorId` (`vendorId`),
  CONSTRAINT `ItemType_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`id`),
  CONSTRAINT `ItemType_ibfk_2` FOREIGN KEY (`vendorId`) REFERENCES `Vendor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ItemType`
--

LOCK TABLES `ItemType` WRITE;
/*!40000 ALTER TABLE `ItemType` DISABLE KEYS */;
INSERT INTO `ItemType` VALUES (4,'Paper White 8.5','It\'s paper yo.',150,2,3,10,'http://www.officedepot.com/a/products/940650/Office-Depot-Brand-30percent-Recycled-EnviroCopy/',0,'2014-03-20 20:28:20',NULL),(5,'Pencils','Writing Utensil ',1040,2,4,6,NULL,0,'2014-03-19 18:02:01',NULL),(7,'Black Toner B&W','Black Toner for the CAE printers that is not the color ',60,2,3,0,'http://www.officedepot.com/a/products/940650/Office-Depot-Brand-30percent-Recycled-EnviroCopy/',0,'2014-03-19 17:17:21',NULL),(10,'Magenta Toner','Magenta Toner for the CAE color printer',740,2,3,0,NULL,0,'2014-03-17 19:25:27',NULL),(11,'Yellow Toner','Yellow Toner for the CAE color printer  ',5000,2,3,0,NULL,0,'2014-03-17 18:22:50',NULL),(12,'Cyan Toner','Cyan Toner for the CAE color printer     ',680,2,3,0,NULL,0,'2014-03-17 19:25:30',NULL),(35,'Pens','Bics  ',390,2,3,45,NULL,0,'2014-03-17 19:25:39',NULL),(47,'Staples','Staples',160,2,2,0,'http://www.officedepot.com',0,'2014-03-19 21:29:49','2014-03-02 05:26:38');
/*!40000 ALTER TABLE `ItemType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order_Item`
--

DROP TABLE IF EXISTS `Order_Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Order_Item` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `orderId` int(6) NOT NULL,
  `itemId` int(4) NOT NULL,
  `orderQty` int(3) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `Order_Item_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`),
  CONSTRAINT `Order_Item_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `ItemType` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order_Item`
--

LOCK TABLES `Order_Item` WRITE;
/*!40000 ALTER TABLE `Order_Item` DISABLE KEYS */;
INSERT INTO `Order_Item` VALUES (203,153,47,10,NULL,NULL),(204,154,4,10,NULL,NULL),(205,155,10,10,NULL,NULL),(206,156,12,10,NULL,NULL),(207,157,5,10,NULL,NULL),(208,158,35,10,NULL,NULL),(209,159,4,10,NULL,NULL),(210,160,4,10,NULL,NULL),(211,161,47,10,NULL,NULL),(212,162,47,10,NULL,NULL),(213,163,47,10,NULL,NULL),(214,164,47,10,NULL,NULL),(215,165,47,10,NULL,NULL),(216,166,5,10,NULL,NULL),(217,167,47,10,NULL,NULL),(218,168,4,10,NULL,NULL),(219,168,7,10,NULL,NULL),(220,169,47,10,NULL,NULL),(221,171,5,10,NULL,NULL),(222,170,4,10,NULL,NULL),(223,172,4,10,NULL,NULL),(224,173,47,10,NULL,NULL),(225,174,5,10,NULL,NULL),(226,175,4,10,NULL,NULL),(227,176,5,10,NULL,NULL),(228,177,47,10,NULL,NULL),(229,178,47,10,NULL,NULL),(230,180,4,10,NULL,NULL),(231,179,5,10,NULL,NULL),(232,181,47,10,NULL,NULL),(233,182,4,10,NULL,NULL),(234,183,5,10,NULL,NULL);
/*!40000 ALTER TABLE `Order_Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `orderDate` datetime NOT NULL,
  `status` tinyint(1) NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (153,'2014-03-17 19:04:36',0,'2014-03-17 19:25:24','2014-03-17 19:04:36'),(154,'2014-03-17 19:05:30',0,'2014-03-17 19:25:22','2014-03-17 19:05:30'),(155,'2014-03-17 19:13:11',0,'2014-03-17 19:25:27','2014-03-17 19:13:11'),(156,'2014-03-17 19:16:54',0,'2014-03-17 19:25:30','2014-03-17 19:16:54'),(157,'2014-03-17 19:23:52',0,'2014-03-17 19:25:33','2014-03-17 19:23:52'),(158,'2014-03-17 19:24:43',0,'2014-03-17 19:25:39','2014-03-17 19:24:43'),(159,'2014-03-17 19:25:04',0,'2014-03-17 19:25:41','2014-03-17 19:25:04'),(160,'2014-03-17 19:26:18',0,'2014-03-18 18:38:39','2014-03-17 19:26:18'),(161,'2014-03-18 18:46:29',0,'2014-03-18 18:46:35','2014-03-18 18:46:29'),(162,'2014-03-19 00:56:57',0,'2014-03-19 00:57:19','2014-03-19 00:56:57'),(163,'2014-03-19 16:51:56',0,'2014-03-19 17:17:06','2014-03-19 16:51:57'),(164,'2014-03-19 16:54:03',0,'2014-03-19 17:17:11','2014-03-19 16:54:03'),(165,'2014-03-19 16:56:13',0,'2014-03-19 17:17:15','2014-03-19 16:56:13'),(166,'2014-03-19 16:59:50',0,'2014-03-19 17:17:17','2014-03-19 16:59:50'),(167,'2014-03-19 16:59:50',0,'2014-03-19 17:17:19','2014-03-19 16:59:50'),(168,'2014-03-19 16:59:50',0,'2014-03-19 17:17:21','2014-03-19 16:59:50'),(169,'2014-03-19 17:16:32',0,'2014-03-19 17:17:24','2014-03-19 17:16:32'),(170,'2014-03-19 17:16:32',0,'2014-03-19 17:17:55','2014-03-19 17:16:32'),(171,'2014-03-19 17:16:32',0,'2014-03-19 17:18:27','2014-03-19 17:16:32'),(172,'2014-03-19 17:33:41',0,'2014-03-19 17:43:55','2014-03-19 17:33:41'),(173,'2014-03-19 17:33:41',0,'2014-03-19 17:44:00','2014-03-19 17:33:41'),(174,'2014-03-19 17:33:41',0,'2014-03-19 17:44:04','2014-03-19 17:33:41'),(175,'2014-03-19 17:37:05',0,'2014-03-19 17:44:08','2014-03-19 17:37:06'),(176,'2014-03-19 17:37:05',0,'2014-03-19 17:44:10','2014-03-19 17:37:06'),(177,'2014-03-19 17:37:05',0,'2014-03-19 17:44:14','2014-03-19 17:37:06'),(178,'2014-03-19 17:41:42',0,'2014-03-19 17:44:16','2014-03-19 17:41:42'),(179,'2014-03-19 17:41:42',0,'2014-03-19 17:44:18','2014-03-19 17:41:42'),(180,'2014-03-19 17:41:42',0,'2014-03-19 17:44:20','2014-03-19 17:41:42'),(181,'2014-03-19 17:44:41',0,'2014-03-19 18:01:56','2014-03-19 17:44:42'),(182,'2014-03-19 17:44:41',0,'2014-03-19 18:01:59','2014-03-19 17:44:42'),(183,'2014-03-19 17:44:41',0,'2014-03-19 18:02:01','2014-03-19 17:44:42');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TransactionLog`
--

DROP TABLE IF EXISTS `TransactionLog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TransactionLog` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `userName` varchar(50) DEFAULT NULL,
  `itemName` varchar(25) DEFAULT NULL,
  `action` varchar(25) NOT NULL,
  `logDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=546 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TransactionLog`
--

LOCK TABLES `TransactionLog` WRITE;
/*!40000 ALTER TABLE `TransactionLog` DISABLE KEYS */;
INSERT INTO `TransactionLog` VALUES (513,'ba','Paper White 8.5','Order of 13 added','2013-02-28 12:52:44'),(514,'ba','Paper White 8.5','Order of 13 received','2013-02-28 12:53:10'),(515,'ba','Paper White 8.5','Order of 13 received','2013-02-28 12:54:22'),(516,'ba','Paper White 8.5','Order of 12 received','2013-02-28 12:54:28'),(517,'ba','Paper White 8.5','Order of 11 received','2013-02-28 12:54:32'),(518,'ba','Paper White 8.5','Order of 33 added','2013-02-28 12:56:28'),(519,'ba','Paper White 8.5','Order of 33 received','2013-02-28 12:57:51'),(520,'ba','Paper White 8.5','Order of 44 added','2013-02-28 12:58:42'),(521,'ba','Paper White 8.5','Order of 55 added','2013-02-28 13:05:05'),(522,'ba','Paper White 8.5','Order of 44 received','2013-02-28 13:06:36'),(523,'ba','Paper White 8.5','Order of 55 received','2013-02-28 13:06:38'),(524,'ba','Paper White 8.5','Order of 66 added','2013-02-28 13:08:17'),(525,'ba','Paper White 8.5','Order of 66 received','2013-02-28 13:13:47'),(526,'ba','Paper White 8.5','Order of 66 added','2013-02-28 13:15:58'),(527,'ba','Paper White 8.5','Order of 77 added','2013-02-28 13:18:23'),(528,'ba','Paper White 8.5','Order of 88 added','2013-02-28 13:20:28'),(529,'ba','Paper White 8.5','Order of 9 added','2013-02-28 13:22:00'),(530,'ba','Paper White 8.5','Order of 66 received','2013-02-28 13:22:47'),(531,'ba','Paper White 8.5','Order of 77 received','2013-02-28 13:22:51'),(532,'ba','Paper White 8.5','Order of 88 received','2013-02-28 13:23:06'),(533,'ba','Paper White 8.5','Order of 9 received','2013-02-28 13:23:08'),(534,'ba','Paper White 8.5','Item Saved','2013-02-28 13:33:37'),(535,'','Paper White 8.5','Order of 1 added','2013-03-12 13:28:01'),(536,'','Magenta Toner','Order of 1 added','2013-03-12 13:28:01'),(537,'','Black Toner B&W','Order of 1 added','2013-03-12 13:28:01'),(538,'','Paper White 8.5','Order of 3 added','2013-03-16 15:21:13'),(539,'','Black Toner B&W','Order of 3 added','2013-03-16 15:21:13'),(540,'','Magenta Toner','Order of 3 added','2013-03-16 15:21:13'),(541,'','Pencils','Order of 3 added','2013-03-16 15:21:13'),(542,'','Pencils','Order of 3 received','2013-03-16 15:21:26'),(543,'','Paper White 8.5','Order of 3 received','2013-03-16 15:21:33'),(544,'','Black Toner B&W','Order of 3 received','2013-03-16 15:21:33'),(545,'','Magenta Toner','Order of 3 received','2013-03-16 15:21:34');
/*!40000 ALTER TABLE `TransactionLog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(32) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `roleId` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (2,'admin','5f4dcc3b5aa765d61d8327deb882cf99','admin@sample.com',NULL),(3,'test','5f4dcc3b5aa765d61d8327deb882cf99','test@test.com',NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendor`
--

DROP TABLE IF EXISTS `Vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vendor` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `url` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendor`
--

LOCK TABLES `Vendor` WRITE;
/*!40000 ALTER TABLE `Vendor` DISABLE KEYS */;
INSERT INTO `Vendor` VALUES (2,'KonicaMinolta','http://konicaminolta.com'),(3,'Office Max','http://www.officemax.com'),(4,'Best Buy','http://www.bestbuy.com');
/*!40000 ALTER TABLE `Vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-06 23:12:04
