# 🚀 Node Docker Jenkins CI/CD Demo

This project demonstrates a **CI/CD pipeline** for a simple Node.js application using:  
✅ **Docker** (containerize app)  
✅ **Docker Hub** (store container image)  
✅ **Jenkins** (build, push & deploy)  
✅ **AWS EC2** (host production app)

---

## 📝 **Project Overview**

This pipeline does the following:  
1. Clones the Node.js app from GitHub.  
2. Builds a Docker image for the app.  
3. Pushes the image to Docker Hub.  
4. SSHes into an EC2 server, pulls the image, and deploys it.  

> ✅ When done, your app is accessible at your EC2 **public IP** on port 80.

---

## 🗂 **Folder Structure**
node-docker-demo/
├── app/
│ ├── Dockerfile # Builds Node.js Docker image
│ ├── package.json # Node.js app dependencies
│ └── server.js # Node.js Express app
├── Jenkinsfile # Jenkins pipeline script
└── README.md # Project documentation
