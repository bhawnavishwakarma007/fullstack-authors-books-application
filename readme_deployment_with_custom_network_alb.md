# Fullstack Authors & Books Application

This project is a **Full‑Stack Web Application** built using **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **MySQL (Amazon RDS)** as the database.  
It is deployed on **AWS using a custom VPC network, Application Load Balancer (ALB), Target Groups, and EC2 instances**, following a **3‑Tier Architecture**.

> ⚠️ **Note**: This deployment was done **manually using AWS Console** to understand real infrastructure behavior. The same setup will be automated using **Terraform (IaC)** in the next phase.

---

## 🏗️ Architecture Overview (3‑Tier)

**Presentation Tier**  
- React (Vite) Frontend
- Hosted on EC2
- Served via **ALB → Frontend Target Group (Port 80)**

**Application Tier**  
- Node.js + Express API
- Managed with **PM2**
- Exposed via **ALB → Backend Target Group (Port 3000)**

**Data Tier**  
- Amazon RDS (MySQL)
- Deployed inside the **same custom VPC**

---

## 🌐 AWS Infrastructure (Manual Setup)

- **Custom VPC**
- Public Subnets (Frontend + ALB)
- Private Subnets (optional / future hardening)
- **Application Load Balancer (ALB)**
- **2 Target Groups**
  - `frontend` → Port 80
  - `backend` → Port 3000
- **Path‑based routing**
  - `/api` → Backend Target Group
  - `/*` → Frontend Target Group
- **EC2 Instances** (t2.micro)
- **RDS MySQL (db.t4g.micro)**

---

## 🔁 ALB Listener Rules

| Path | Forward To |
|-----|-----------|
| `/api` or `/api/*` | Backend Target Group |
| `/*` | Frontend Target Group |

This enables frontend and backend to be accessed using **one ALB DNS**.

---

## 📸 Application Screenshots

### Dashboard
![Dashboard](./frontend/public/ss/dashboard.png)

### Books Page
![Books](./frontend/public/ss/books.png)

### Authors Page
![Authors](./frontend/public/ss/authors.png)

---

## 🚀 Frontend Setup (Presentation Tier)

### Connect to Frontend EC2 Instance

```bash
sudo yum update -y
sudo yum install git -y
sudo dnf install -y nodejs
```

### Install Apache (httpd)

```bash
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
```

### Clone Repository

```bash
git clone https://github.com/bhawnavishwakarma007/fullstack-authors-books-application.git
cd fullstack-authors-books-application/frontend
```

### Configure Environment

Create `.env` file:

```env
VITE_API_URL=http://<ALB-DNS>/api
```

### Build & Deploy Frontend

```bash
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

Access frontend via **ALB DNS**.

---

## 🗄️ Database Setup (Data Tier – RDS)

- Engine: **MySQL Community**
- Port: **3306**
- Deployed in **same VPC**
- Security Group allows access from Backend EC2 only

---

## ⚙️ Backend Setup (Application Tier)

### Connect to Backend EC2 Instance

```bash
sudo yum update -y
sudo yum install git -y
sudo dnf install -y nodejs
npm install -g pm2
sudo yum install mariadb105-server -y
```

### Clone Repository

```bash
git clone https://github.com/bhawnavishwakarma007/fullstack-authors-books-application.git
cd fullstack-authors-books-application/backend
```

### Configure Database Connection

Edit `configs/db.js`:

```js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '<RDS-ENDPOINT>',
  port: 3306,
  user: '<DB-USER>',
  password: '<DB-PASSWORD>',
  database: 'react_node_app'
});

module.exports = db;
```

### Initialize Database

```bash
mysql -h <rds-endpoint> -u <user> -p < db.sql
```

### Run Backend with PM2

```bash
npm install
pm2 start server.js --name "Bhawna"
pm2 startup
pm2 save
```

Backend Health Check:

```bash
curl http://localhost:3000/api
```

---

## 🔐 Security Considerations

- Security Groups used instead of open access
- Backend not directly exposed (only via ALB)
- RDS accessible only from backend SG

---

## 📌 Git & Deployment Notes

- `.gitignore` excludes:
  - `node_modules/`
  - `dist/` / `build/`
  - `.env`
- Frontend and backend are **tracked separately** inside one repo

---


## ✨ Conclusion

This project demonstrates **real‑world AWS deployment** using a **custom network, ALB, target groups, and RDS**, deployed **manually for strong fundamentals**.  
Next step: **Infrastructure as Code using Terraform**.

---

👩‍💻 **Author**: Bhawna Vishwakarma With guidance and inspiration from Veera Babu Sir, Naresh i Technologies.

