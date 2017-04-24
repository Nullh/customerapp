CREATE DATABASE testdb;
CREATE DATABASE sessionStore;
CREATE USER sessionUser IDENTIFIED BY 'oCj4yoE5n';
GRANT SELECT, UPDATE, DELETE, INSERT, CREATE, ALTER ON sessionStore.* TO sessionUser;
CREATE USER test IDENTIFIED BY 'oCj4yoE5n';
CREATE TABLE `testdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
GRANT SELECT, INSERT, UPDATE, DELETE ON testdb.users TO test;