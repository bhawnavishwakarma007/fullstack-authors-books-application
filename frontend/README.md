# Frontend – Authors & Books UI

This is the **Frontend (Presentation Tier)** of the *Fullstack Authors & Books Application*.  
It is built using **React (Vite)** and served via **Apache (httpd)** on an **EC2 instance** behind an **Application Load Balancer (ALB)**.

---

##  Architecture Role

- **Presentation Tier (3-Tier Architecture)**
- React (Vite) SPA
- Hosted on **EC2**
- Served via **ALB → Frontend Target Group (Port 80)**

---

##  Tech Stack

- React (Vite)
- Apache (httpd)
- AWS EC2
- Application Load Balancer

---

##  Setting up the Presentation Tier (Frontend)

### Step 1: Connect to Frontend EC2 Instance

```bash
sudo yum update -y
sudo yum install git -y
git --version
```

---

### Step 2: Install Node.js (v18)

```bash
sudo yum install -y nodejs
node -v
npm -v
```

---

### Step 3: Install Apache (httpd)

```bash
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
```

---

### Step 4: Clone Repository

```bash
git clone https://github.com/bhawnavishwakarma007/fullstack-authors-books-application.git
cd fullstack-authors-books-application/frontend
```

---

### Step 5: Configure Environment

Create `.env` file (if not exists):

```env
VITE_API_URL=http://<ALB-DNS>/api
```

---

### Step 6: Install Dependencies

```bash
npm install
```

---

### Step 7: Build & Deploy Frontend

```bash
npm run build
sudo cp -r dist/* /var/www/html/
```

---

### Step 8: Access Frontend

Open browser:

```text
http://<ALB-DNS>
```

---

##  Author

**Bhawna Vishwakarma**  
Inspired and guided by **Veera Babu Sir, Naresh i Technologies**
