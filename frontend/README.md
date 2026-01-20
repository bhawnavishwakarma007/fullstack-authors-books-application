## Setting up the Presentation Tier

# conncet to your  front end instance
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
### Install httpd (apache)
```
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
```
#### Clone repository
```
git clone https://github.com/CloudTechDevOps/fullstack-autors-books-application.git
```
###Switch to frontend
```
cd fullstack-authors-books-application
cd frontend
```
### In frontend path .env file is there if not existis please create .env file 
```
VITE_API_URL=http://3.85.56.86/api   // put your backend public ip or dns name 
```
#### Run the following commnads in frontend 
```
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

### Now access the frontend with public ip 
