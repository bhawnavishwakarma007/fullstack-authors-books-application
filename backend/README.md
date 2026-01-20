# Backend – Authors & Books Application

This repository contains the **Backend (Application Tier)** of the *Fullstack Authors & Books Application*.  
The backend is built using **Node.js, Express, and MySQL**, and deployed on **AWS EC2** behind an **Application Load Balancer (ALB)** in a **custom VPC network**.

---

##  Architecture Role

- **Application Tier (3-Tier Architecture)**
- Hosted on **EC2**
- Managed using **PM2**
- Connected to **Amazon RDS (MySQL)**
- Accessed via **ALB path-based routing**

---

##  Application Load Balancer (ALB) Routing

The Application Load Balancer acts as a single entry point for both frontend and backend using **path-based routing**.

### Target Groups

| Target Group | Port | Purpose |
|-------------|------|---------|
| frontend-tg | 80 | Serves React frontend |
| backend-tg | 3000 | Serves Node.js API |

### Listener Rules (HTTP : 80)

| Path Pattern | Forward To |
|-------------|-----------|
| /api or /api/* | Backend Target Group (Port 3000) |
| /* | Frontend Target Group (Port 80) |

### Request Flow

1. User accesses:  
   `http://<ALB-DNS>` → routed to frontend EC2  
2. Frontend calls API:  
   `http://<ALB-DNS>/api/books` → routed to backend EC2  
3. Backend fetches data from **RDS MySQL** and returns response.

---

##  Setting up the Data Tier (RDS)

1. Create a **MySQL RDS** instance.
2. Ensure RDS is created in the **same VPC** as backend EC2.
3. Allow inbound access on port **3306** from backend EC2 security group.
4. Note RDS endpoint, username, password, and database name.

---

##  Setting up the Application Tier (Backend)

### Step 1: Connect to Backend EC2 Instance

```bash
sudo yum update -y
```

### Step 2: Install Git

```bash
sudo yum install git -y
git --version
```

### Step 3: Install Node.js (v18)

```bash
sudo yum install -y nodejs
```

### Step 4: Install PM2

```bash
sudo npm install -g pm2
```

### Step 5: Install MySQL Client

```bash
sudo yum install mariadb105-server -y
```

### Step 6: Clone Repository

```bash
git clone https://github.com/bhawnavishwakarma007/fullstack-authors-books-application.git
cd fullstack-authors-books-application/backend
```

### Step 7: Configure Database

Edit file:

```bash
vi configs/db.js
```

```js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '<RDS-ENDPOINT>',
  port: 3306,
  user: 'admin',
  password: '<RDS-PASSWORD>',
  database: 'react_node_app'
});

module.exports = db;
```

### Step 8: Initialize Database

```bash
mysql -h <RDS-ENDPOINT> -u admin -p<RDS-PASSWORD> < db.sql
```

### Step 9: Install Dependencies

```bash
npm install
```

### Step 10: Start Backend

```bash
pm2 start server.js --name "backend-api"
pm2 startup
sudo systemctl enable pm2-root
pm2 save
```

---

##  Verification

```bash
curl http://localhost:3000/api
```

Expected response:

```json
{ "status": "OK" }
```

---

##  Author

**Bhawna Vishwakarma**  
With guidance and inspiration from **Veera Babu Sir, Naresh i Technologies**
