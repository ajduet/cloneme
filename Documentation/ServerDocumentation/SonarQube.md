# SonarQube

## Introduction
SonarQube is a tool for code analysis. It analyzes Java, Javascript, and other languages, automatically finding bugs, voulnerabilities, code smells (code that works, but may not be using best practices), and code duplication.  It also tracks elements over time.

More information here: http://www.sonarqube.org/

## Before you start

- SonarQube likes to have an external database to store any persistant information. Consider which database to use before your start.  This guide will conect to an Oracle database and detail the special procedures used for connecting to that type of database.  Using MySQL would most likely be easier, but it was not explored for this guide.

## Installation
  1. Spin up a new EC2 instance of Amazon Linux (the default image)
  2. SSH into it
  3. Update your instance if there's a message by running:
  
```sh
$ sudo yum -y update
```
  4. Run the following commands:
  
  ```sh
$ sudo wget -O /etc/yum.repos.d/sonar.repo http://downloads.sourceforge.net/project/sonar-pkg/rpm/sonar.repo
$ sudo yum -y install sonar
```  
  
  (More information about installing SonarQube as a service can be found [here](http://sonar-pkg.sourceforge.net/))
  
  ## Configuration (Oracle Database)
  ([Source](https://obscuredclarity.blogspot.com/2012/05/install-sonar-using-oracle-as-database.html))
  5. Download the `ojdbc6.jar` driver from [here](http://www.oracle.com/technetwork/database/enterprise-edition/jdbc-112010-090769.html)
  6. Get it onto the instance and place the jar file in `/opt/sonar/extensions/jdbc-driver/oracle/` (Note: you'll probably have to be `sudo` to copy it, since `/opt` is probably write-protected for normal users)
  7. Run:
  
  ```sh
  $ sudo vim /opt/sonar/conf/sonar.properties
  ```
  8. In the properties file, write something similar to this:
  
  ```
sonar.jdbc.url=jdbc:oracle:thin:@$AddressOfOracleDatabase:1521/$nameOfSID
sonar.jdbc.driverClassName: oracle.jdbc.OracleDriver
sonar.jdbc.validationQuery: select 1 from dual
sonar.jdbc.username=$Username
sonar.jdbc.password=$Password
  ```
  Where:
  - $AddressOfOracleDatabase is the web address of the database
  - $nameOfSID is the SID of the database you're using
  - $Username is the username of the user you set up for the SonarQube application (it is **highly** recommended to have a separate user set up for SonarQube)
  - $Password is the password for that user

SonarQube is now ready to be run. SonarQube defaults to port `9000`, and the default login is `admin`, with a password of `admin`.  To run, use:

```sh
$ sudo service sonar start
```

To stop, run: 

```sh
$ sudo service sonar stop
```

## Configuration (Using Port 80)
HTTP requests default to port 80.  It's good practice to use a reverse proxy to redirect traffic from port 80 to port 9000, but that was not known at the time of setting this server up.  Here's the configuration steps to put this server on port 80.
9. Edit your `sonar.properties` file by running:

```sh
$ sudo vim /opt/sonar/conf/sonar.properties
```

10. Change `sonar.web.port=9000` to `sonar.web.port=80`

Because ports below 1024 need to be run as `sudo`, the way you start the server needs to change. To run the server, run:
```sh
$ sudo /opt/sonar/bin/linux-x86-64/sonar.sh start
```
To stop the server, run:
```sh
$ sudo /opt/sonar/bin/linux-x86-64/sonar.sh stop
```
