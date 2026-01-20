# Setting up the Data Tier

```
create a rds database in same vpc
```
### Setting up the Application Tier

## conncet to your  backend instance

#### Install GIT
```
sudo yum update -y

sudo yum install git -y

git — version
```

#### Install node.js
1. To install node version manager (nvm)
```
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```
### Install pm2
```
sudo npm install -g pm2
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH="$HOME/.npm-global/bin:$PATH"
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
npm install -g pm2
```
### Install mysql or mariadb for database initilization
```
sudo yum install mariadb105-server -y
```
#### Clone repository
```
git clone https://github.com/CloudTechDevOps/fullstack-autors-books-application.git
```
### Switch to backend
```
cd fullstack-authors-books-application
cd backend
```
### change the database details  in db.js
### *** vi configs/db.js***
```
const mysql = require('mysql2');

const db = mysql.createConnection({
   host: 'rds endpoint',
   port: '3306',
   user: 'radmin',
   password: 'rds-password',
   database: 'react_node_app'
});

module.exports = db;
```
### Initilize the database 
```
mysql -h <rdsendpoint> -u admin -p<rdspassword> < db.sql
mysql -h database-1.cj6qigogwls0.us-east-1.rds.amazonaws.com -u admin -pveeradon < db.sql

```
### Everything is completed run the follwing commnds for backend execution
```
npm install
pm2 start server.js --name "veera"
pm2 startup
sudo systemctl enable pm2-root
sudo pm2 save
```
### hit public ip you will get this responce 
#### Dashboard
![Dashboard](./frontend/public/ss/dashboard.png)

### add the autors and books 
                                            
