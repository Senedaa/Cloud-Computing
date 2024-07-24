# Machine Learning on Kubernetes

## Introduction
This project demonstrates how to set up and deploy a machine learning model on a Kubernetes cluster. The goal is to provide a scalable and efficient solution for machine learning inference using Google Kubernetes Engine (GKE) and Docker. We will build, train, and deploy a machine learning model, encapsulated in a Flask application, and run it in a Kubernetes environment.

## Design
The design of this project involves the following key components:
1. **Kubernetes Cluster:** A GKE cluster with three nodes for running the Docker containers.
2. **Machine Learning Model:** A classification model built, trained, and saved using `pickle`.
3. **Flask Application:** A web service that serves the machine learning model for predictions.
4. **Docker Container:** Encapsulation of the Flask application in a Docker image to ensure portability and ease of deployment.
5. **Flasgger UI:** A simple UI for interacting with the Flask API, making it user-friendly to test and use the model.

## Implementation

### Step 1: Setting Up Kubernetes Cluster
1. **Create a Kubernetes Cluster:**
   ```sh
   gcloud container clusters create kubia --num-nodes=1 --machine-type=e2-micro --region=us-west1
   ```
2. **Verify the Cluster:**
   ```sh
   gcloud container clusters list
   ```
3. **Alternatively, Start Minikube:**
   ```sh
   minikube start
   ```

### Step 2: Train and Save Machine Learning Model
1. **Train the Model:**
   - Build, train, and test your machine learning model.
2. **Save the Model:**
   - Save the trained model using `pickle`:
     ```python
     import pickle
     with open('logreg.pkl', 'wb') as file:
         pickle.dump(model, file)
     ```

### Step 3: Create Flask Application
1. **Create `flask_api.py`:**

### Step 4: Create Docker File
1. **Create `Dockerfile`:**
   
2. **Create `requirements.txt`:**
  
### Step 5: Build and Run Docker Container
1. **Build Docker Image:**
   ```sh
   sudo docker build -t ml_app_docker .
   ```
2. **Run Docker Container:**
   ```sh
   sudo docker container run -p 5000:5000 ml_app_docker
   ```

### Step 6: Deploy on Kubernetes
1. **Deploy the Docker Container on Kubernetes:**
   - Create a Kubernetes deployment YAML file and apply it to deploy the application.

## Results
The successful deployment of the machine learning model in a Kubernetes cluster allows for scalable and efficient handling of inference requests. Users can interact with the Flask API through a simple web interface provided by Flasgger UI. The application can handle both single and batch predictions, demonstrating the capability of the model in a production environment.


## Conclusion
This project showcases the integration of machine learning with Kubernetes and Docker, highlighting the benefits of containerization and orchestration for scalable machine learning deployments. By following the steps outlined, one can easily deploy and manage machine learning models in a cloud-native environment.

## Presentation

https://docs.google.com/presentation/d/1RQgDPLvKBSIPujjnPw6TxVXP7ion3hCWrZGIoyMrjuI/edit#slide=id.g2ee489b3ed9_1_39

## Appendix
