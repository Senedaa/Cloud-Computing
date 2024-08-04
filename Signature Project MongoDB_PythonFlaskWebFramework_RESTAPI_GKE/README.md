**MongoDB and Application Deployment on GKE**

**Introduction**  
This project deploys MongoDB with persistent storage on Google Kubernetes Engine (GKE) and two applications, Student Server (Node.js) and Bookshelf (Python/Flask).

**Table of Contents**
1. Set Up the Environment
2. Download Programs and Documentation
3. Process of Program Execution
4. Documentation of Execution Results

**1. Set Up the Environment**

**Prerequisites**
- Google Cloud Platform (GCP) account
- Google Cloud SDK (`gcloud`)
- `kubectl`
- Docker
- Node.js
- Python with Flask

**Installation**
- Google Cloud SDK: [Install Guide](https://cloud.google.com/sdk/docs/install)
- `kubectl`: [Install Guide](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- Docker: [Install Guide](https://docs.docker.com/get-docker/)
- Node.js: [Install Guide](https://nodejs.org/en/download/)

**2. Download Programs and Documentation**

**Clone Repository**
```bash
git clone https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE
cd Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE
```

**Documentation**
- [Kubernetes Docs](https://kubernetes.io/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Node.js Docs](https://nodejs.org/en/docs/)
- [Flask Docs](https://flask.palletsprojects.com/)

**3. Process of Program Execution**

**Step 1: Create MongoDB Using Persistent Volume on GKE and Insert Records**

1. **Create a Cluster on GKE**
   Create a Kubernetes cluster named `kubia` using Google Kubernetes Engine (GKE) with 0 nodes.

2. **Create a Persistent Volume**
   ```bash
   gcloud compute disks create mongodb --size=10GiB --zone=us-central1-a
   ```

3. **Create MongoDB Deployment**
   Apply the MongoDB deployment configuration from the `mongodb-deployment.yaml` file. [Find the file on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

4. **Check Deployment Pod**
   ```bash
   kubectl get pods
   ```

5. **Create MongoDB Service**
   Apply the MongoDB service configuration from the `mongodb-service.yaml` file. [Find the file on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

6. **Check Service Status**
   ```bash
   kubectl get svc
   ```

7. **Test MongoDB Connection**
   ```bash
   kubectl exec -it mongodb-deployment-694c495656-28wjl -- bash
   mongosh --host 34.71.187.5 --port 27017
   ```

8. **Exit MongoDB Pod**
   ```bash
   exit
   ```

9. **Insert Records into MongoDB**
   Create a Node.js script to connect to MongoDB and insert sample student records. [Find the script on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

**Step 2: Modify Student Server to Get Records from MongoDB and Deploy to GKE**

1. **Create `studentServer.js`**
   Define a Node.js server to retrieve student records from MongoDB. [Find the file on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

2. **Create Dockerfile**
   Containerize the student server application. [Find the Dockerfile on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

3. **Build Docker Image**
   ```bash
   docker build -t student-server .
   ```

4. **Push Docker Image**
   ```bash
   docker push asdg124/mydbd:latest
   ```

**Step 3: Create Python Flask Bookshelf REST API and Deploy on GKE**

1. **Create `bookshelf.py`**
   Define a Flask application for managing a bookshelf. [Find the file on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

2. **Create Dockerfile**
   Containerize the Flask application. [Find the Dockerfile on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

3. **Create `requirements.txt`**
   Specify the required dependencies for the Flask application. [Find the file on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

4. **Build Docker Image**
   ```bash
   docker build -t bookshelf-app .
   ```

5. **Push Docker Image**
   ```bash
   docker push asdg124/flask-mongodb:latest
   ```

**Step 4: Deploy Applications on Minikube**

1. **Start Minikube**
   ```bash
   minikube start
   ```

2. **Start Ingress**
   ```bash
   minikube addons enable ingress
   ```

3. **Create YAML Files for Deployments and Services**
   [Find all YAML files on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

4. **Apply Student Server Deployment and Service**
   ```bash
   kubectl apply -f studentserver-deployment.yaml
   kubectl apply -f studentserver-configmap.yaml
   kubectl apply -f studentserver-service.yaml
   ```

5. **Apply Bookshelf Deployment and Service**
   ```bash
   kubectl apply -f bookshelf-deployment.yaml
   kubectl apply -f bookshelf-configmap.yaml
   kubectl apply -f bookshelf-service.yaml
   ```

6. **Check Pods Status**
   ```bash
   kubectl get pods
   ```

7. **Create Ingress Configuration**
   Apply the ingress configuration from the `studentservermongoIngress.yaml` file. [Find the file on GitHub](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

8. **Apply Ingress Configuration**
   ```bash
   kubectl apply -f studentservermongoIngress.yaml
   ```

9. **Check Ingress Status**
   ```bash
   kubectl get ingress
   ```

10. **Update `/etc/hosts`**
    ```bash
    minikube ip
    sudo vi /etc/hosts
    ```
    Add the line:
    ```
    192.168.49.2 cs571.project.com
    ```

11. **Access the Applications**
    Use `curl` to test the endpoints:
    ```bash
    # Access Student Server
    curl cs571.project.com/studentserver/api/score?student_id=11111

    # List all books in Bookshelf
    curl cs571.project.com/bookshelf/books

    # Add a book
    curl -X POST -d "{\"book_name\": \"cloud computing\",\"book_author\": \"unknown\", \"isbn\": \"123456\" }" http://cs571.project.com/bookshelf/book

    # Update a book
    curl -X PUT -H "Content-Type: application/json" -d '{"book_name": "Updated Book Name", "book_author": "Updated Author", "isbn": "Updated ISBN"}' http://cs571.project.com/bookshelf/book/66a87500f086ee9aa5b9bae1

    # Delete a book
    curl -X DELETE http://cs571.project.com/bookshelf/book/66a87500f086ee9aa5b9bae1
    ```

**Appendix**

For the complete configuration files and additional details, refer to the repository: [GitHub Repository](https://github.com/ASD-Are/Cloud-Computing/tree/main/Signature%20Project%20MongoDB_PythonFlaskWebFramework_RESTAPI_GKE).

---

Feel free to adjust any details or add more specific instructions based on your needs!