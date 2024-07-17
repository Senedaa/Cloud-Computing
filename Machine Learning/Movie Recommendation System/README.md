## README

![Collaborative Filtering](https://upload.wikimedia.org/wikipedia/commons/5/52/Collaborative_filtering.gif)

### Introduction
This project demonstrates how to build a movie recommendation system using Apache Spark and Google Cloud Platform (GCP) services, specifically Google Cloud Storage and Google Cloud Dataproc. The dataset used is the u.data file from the MovieLens dataset. The main objectives are to transform the data, upload it to Cloud Storage, create a PySpark script for collaborative filtering using MLlib, and run the PySpark job on a Dataproc cluster.

### Design and Implementation

#### Step 1: Listing Dataproc Clusters
First, list the available Dataproc clusters in the specified region.
```bash
gcloud dataproc clusters list --region us-central1
```

#### Step 2: Creating a Cloud Storage Bucket
Create a new Cloud Storage bucket to store data and scripts.

#### Step 3: Preparing and Transforming Data
Transform the `u.data` file to the required format (UserID, MovieID, rating) using a shell script and upload it to your Cloud Storage bucket.

**Code:**
1. Create the `u.data` file:
   - Create a file named `u.data` and populate it with your data.

2. Transform Data Using Shell Script:
```bash
# Create transform_data.sh
echo '#!/bin/bash
cat u.data | tr -s ' ' | cut -d' ' -f1-3 | tr ' ' ',' > u_data_transformed.csv' > transform_data.sh

# Make the script executable
chmod +x transform_data.sh

# Run the script
./transform_data.sh
```
**Explanation:**
The shell script reads the `u.data` file, trims extra spaces, extracts the first three fields (UserID, MovieID, rating), and replaces spaces with commas. The transformed data is saved in `u_data_transformed.csv`.

#### Step 4: Upload Data to Cloud Storage Bucket
Upload the transformed data file `u_data_transformed.csv` to your Cloud Storage bucket.

**Code:**
```bash
gsutil cp u_data_transformed.csv gs://big_data_ml_recommendation_sys/
```
**Explanation:**
The `gsutil cp` command copies the `u_data_transformed.csv` file from your local machine to your specified Cloud Storage bucket.

#### Step 5: Create and Upload the PySpark Script
Create a PySpark script to perform collaborative filtering using MLlib and upload it to your Cloud Storage bucket.

**Code:**
1. Create the PySpark Script:
   - Create a file named `recommendation_example.py`.

2. Upload the PySpark Script:
```bash
gsutil cp recommendation_example.py gs://big_data_ml_recommendation_sys/
```

**Explanation:**
The PySpark script loads the transformed data from Cloud Storage, trains a collaborative filtering model using ALS, evaluates the model by calculating the mean squared error, and saves the model back to Cloud Storage. The script is then uploaded to the Cloud Storage bucket.

#### Step 6: Creating a Dataproc Cluster
Create a Dataproc cluster to run the PySpark job.

**Code:**
```bash
gcloud dataproc clusters create spark-cluster --region us-west1 --zone us-west1-a --single-node
```

**Explanation:**
This command creates a single-node Dataproc cluster in the specified region and zone.

#### Step 7: Submitting the PySpark Job to Dataproc
Submit the PySpark job to your Dataproc cluster to execute the collaborative filtering task.

**Code:**
```bash
gcloud dataproc jobs submit pyspark gs://big_data_ml_recommendation_sys/recommendation_example.py --cluster spark-cluster --region us-west1
```

**Explanation:**
The `gcloud dataproc jobs submit pyspark` command submits the PySpark script stored in Cloud Storage to the Dataproc cluster named `spark-cluster` located in the `us-west1` region for execution.

### Results and Conclusion

The PySpark job successfully ran on the Dataproc cluster and trained a collaborative filtering model. The Mean Squared Error (MSE) of the model was calculated and printed:

```plaintext
Mean Squared Error = 0.48419423210378404
```

**Conclusion:**
This project demonstrates how to preprocess data, train a machine learning model using PySpark, and run it on a Dataproc cluster. The resulting MSE indicates the prediction error of the collaborative filtering model, which can be further improved by tuning the model parameters and preprocessing steps.

## Presentation
https://docs.google.com/presentation/d/1EfZw5twQBTdiQpFTL1Vqj3_qCq_0rtn8SF0mrMkg8LY/edit?usp=sharing

## Appendix
