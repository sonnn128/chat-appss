-- MySQL dump 10.13  Distrib 9.2.0, for Linux (aarch64)
--
-- Host: localhost    Database: chatapps
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` binary(16) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò','Role USER','USER'),(_binary '\·\ô1uJ]äÆßU\ \ÿs\œ','Role ADMIN','ADMIN');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` binary(16) NOT NULL,
  `role_id` binary(16) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKt7e7djp752sqn6w22i6ocqy6q` (`role_id`),
  CONSTRAINT `FKj345gk1bovqvfame88rcx7yyx` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKt7e7djp752sqn6w22i6ocqy6q` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (_binary 'öf∑G§äP\ÚVD2d5',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 'E¿ü9Leª]ß\Ê\œ\nÅÇ',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 'H\‰±\«D\'∏U1qµ8H',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary '[\€\ÕGΩ\‹F∑óQLüúÜ]',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 'c*\”oN\‘Jì660©\‚',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 'h|hS\ÒJ°Ñ\∆qJ	ªJ',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 's{U\Ú\€\—J”ñE¢RÇ‹ø',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 'ä\˜\⁄±LNm≤\›]\—\»&w',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 'ìˇFUH!é\ﬁbc©ö¶',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 'ö<ZF\Î%Kò°S\÷\ﬁ/ÜKä',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary 'Ø/«ûá¯Cêø2§k\ ]%\Ÿ',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary '\–]\\\ÍJ\‰á\Ï÷†ö,',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary '\›V8	¯¿Fcª©Éàò%:\r',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary '\„\Ï\’A#M.û˚º(ÉA\"g',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary '\Á≥=;bˇC$±)\ˆVfà',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary '\ˆ$H*H\·Gæåé\Êa˝Ab',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò'),(_binary '˝&&´§åDµÑUFwø∂Yë',_binary 'äZk\’\ÊC†´\\ªN#ñ\Ò');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` binary(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (_binary 'öf∑G§äP\ÚVD2d5','example3@gmail.com','Th√¢n','Y√™n VƒÉn Th√¢n','$2a$10$sAB2xisvlKfE3Sm7ySQbce.sMXSSxugrtoCtno2WZ8Qqes6PARsYO','example3@gmail.com'),(_binary 'E¿ü9Leª]ß\Ê\œ\nÅÇ','exampleexample@gmail.com','Th√¢n','Y√™n VƒÉn','$2a$10$gCaFqBD8Yq68TneJizExouo3uvC4RKeKyQ2JAFEBcMzWsTLcVkQpe','exampleexample@gmail.com'),(_binary 'H\‰±\«D\'∏U1qµ8H','john.doe@example.com',NULL,NULL,'$2a$10$6BeRG3CS68OFJx71SIsAzeN5djZ78TG.emohbgvS7FgeVZCGCDe6q',NULL),(_binary '[\€\ÕGΩ\‹F∑óQLüúÜ]','exampl52e@gmail.com','Th√¢n','Y√™n VƒÉn Th√¢n','$2a$10$/etyV8Gx5BvhaH/uvXB4cueDoXRBnTmA4Gkh9Igm9wbv0vDzCKKum','exampl52e@gmail.com'),(_binary 'c*\”oN\‘Jì660©\‚','example2@gmail.com','Th√¢n','Y√™n VƒÉn Th√¢n','$2a$10$wdyU/hKVpavu6SXUArtobeZ3zcw8Dq/.myAFF/LVpw5hhRQZ5SfjK','example2@gmail.com'),(_binary 'h|hS\ÒJ°Ñ\∆qJ	ªJ','tragiangnguyen1807@gmail.com','Nguy·ªÖn','Giang','$2a$10$wgKX1pPFP9xcM/SDXJ8DBek2/y5cNP0tFE4zNQG2uCj6J/2HsES9i',NULL),(_binary 's{U\Ú\€\—J”ñE¢RÇ‹ø','exampleabcd@gmail.com','Nguy·ªÖn','S∆°n','$2a$10$MOwCmoijasgmJugtfG8TBuChIdMBOeM0t.8raiyvmYZczOiR6Ry16',NULL),(_binary 'ä\˜\⁄±LNm≤\›]\—\»&w','example4@gmail.com','Th√¢n','Y√™n VƒÉn Th√¢n','$2a$10$yJYpcvk2efM8NSwJKWrzTuQoI9ayPpBbmJLaO8SYXXaRuNLeZNSFO','example4@gmail.com'),(_binary 'ìˇFUH!é\ﬁbc©ö¶','exampl5e@gmail.com','Th√¢n','Y√™n VƒÉn Th√¢n','$2a$10$mDrzkg6e3x9q1ZgwM44gHO91akR7nY5.jzx77yAUifAuWZMbR05r2','exampl5e@gmail.com'),(_binary 'ö<ZF\Î%Kò°S\÷\ﬁ/ÜKä','example1791@gmail.com','Th√¢n','Y√™n VƒÉn','$2a$10$Ge3iRIDhXRCAdiAT6tYS3e/XBVkH6pyzaOQhzoAURxYMgORrvYHYS','example1791@gmail.com'),(_binary 'Ø/«ûá¯Cêø2§k\ ]%\Ÿ','example1473283@gmail.com','VƒÉnTh√¢n','Y√™n','$2a$10$G9yhzcxxNhby7kLbhvqCXuhfYXdoWc32UMHIeo2T2k..eN8QhRBuu','example1473283@gmail.com'),(_binary '\–]\\\ÍJ\‰á\Ï÷†ö,','example@gmail.com','Th√¢n','Y√™n VƒÉn Th√¢n','$2a$10$S7VKwUV2CVJXYcRlQKIPy.FIp0KQACZhgBNRZMGw9R2taWLMs0efq','example@gmail.com'),(_binary '\›V8	¯¿Fcª©Éàò%:\r','abcd@gmail.com','Son','Nguyen','$2a$10$olV/uG3UPjGeLP3vKP95NutmY7XIx.Hg2PFCRXKu7ngbd2uKj8HY2','abcd@gmail.com'),(_binary '\„\Ï\’A#M.û˚º(ÉA\"g','exampleexampleexampleexample@gmail.com','Th√¢n','Y√™n VƒÉn','$2a$10$vFrywAC6MAkIESOAnUMzVe.SJh07xuZk9sfn6OTHyonuM5LvRNoGe','exampleexampleexampleexample@gmail.com'),(_binary '\Á≥=;bˇC$±)\ˆVfà','acbdfef@gmail.com','Th√¢n','Y√™n VƒÉn','$2a$10$.eoHgQx7nfNH89S/eqiVbekRKhpfTMO2vPOOSZJZ3czGrFoEg11hS','acbdfef@gmail.com'),(_binary '\ˆ$H*H\·Gæåé\Êa˝Ab','sonvipkl04@gmail.com',NULL,NULL,'$2a$10$K8DXhZ201Mlwca1h8uAHD.O4FFtE9V9t5/7iFbtarqaC.oLG6plb6',NULL),(_binary '˝&&´§åDµÑUFwø∂Yë','abcdd@gmail.com','Son','Nguyen','$2a$10$N8nnXXW4P7r7WEg.wgAAhOxT4iKiLdGaMWoXlMj3Pu8Zghi.VWWNO','abcdd@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-10 15:39:35
