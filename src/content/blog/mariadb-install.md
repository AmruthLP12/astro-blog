# MariaDB Installation and Usage on Linux (Debian/Ubuntu)

This document explains how to install, secure, and use MariaDB on Linux systems

1. ## **Install MariaDB**

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install mariadb-server
```

2.  ## **Start & Enable Service**
```bash
sudo systemctl start mariadb sudo systemctl enable mariadb
```

3. ## **Secure MariaDB**
```bash
sudo mysql\_secure\_installation
```
- Recommended answers: Yes to all security prompts.


4. ## **Login to MariaDB**
```bash
sudo mysql
or
mysql -u root -p
```
5. ## **Check MariaDB Port**

```bash
SHOW VARIABLES LIKE 'port';
Default: 3306
```

6. ## **Create Database & User**

```bash
CREATE DATABASE mydb;

CREATE USER 'myuser'@'localhost' IDENTIFIED BY 'password'; 

GRANT ALL PRIVILEGES ON mydb.\* TO 'myuser'@'localhost'; FLUSH PRIVILEGES;
```

7. ## **Basic Commands**
```bash
SHOW DATABASES; 
USE mydb; 
SHOW TABLES;
```
8. ## **Configuration Files**
```bash 
/etc/mysql/mariadb.conf.d/50-server.cnf
```

9. ## **Restart MariaDB**
```bash 
sudo systemctl restart mariadb
```
