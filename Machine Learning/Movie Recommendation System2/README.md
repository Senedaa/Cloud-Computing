## Introduction

In this project, we implemented a movie recommendation engine using PySpark on Google Cloud Platform (GCP). The primary objective was to leverage the distributed computing capabilities of PySpark to build and evaluate a collaborative filtering model using the Alternating Least Squares (ALS) algorithm. This project showcases how to set up and execute a PySpark job on GCP Dataproc, using data stored in Google Cloud Storage (GCS).

## Design

This is the Design Diagram:

![Design](https://github.com/Senedaa/Cloud-Computing/blob/main/Machine%20Learning/Movie%20Recommendation%20System2/images/Design.png)

## Implementation

#### 1. Upload Data and Scripts to GCS

First, ensure you have already uploaded `movies.csv`, `ratings.csv`, and your PySpark script (e.g., `Recommendation_Engine_MovieLens.py`) to your GCS bucket.

#### 2. Create a Google Cloud Storage (GCS) Bucket

Create a bucket in GCS to store your scripts and data.

```bash
gsutil mb gs://movie_recommendation_with_mllib_collaborative_filter
```

#### 3. Upload Data and Scripts to GCS

Upload the `movies.csv`, `ratings.csv`, and your PySpark script to your GCS bucket.

```bash
gsutil cp movies.csv gs://movie_recommendation_with_mllib_collaborative_filter/
gsutil cp ratings.csv gs://movie_recommendation_with_mllib_collaborative_filter/
gsutil cp Recommendation_Engine_MovieLens.py gs://movie_recommendation_with_mllib_collaborative_filter/
```

#### 4. Modify the PySpark Script to Use GCS Paths

Update your PySpark script to read the files from GCS. You can use command-line arguments to pass the paths of the CSV files, making the script more flexible. Check the Recommendation_Engine_MovieLens.py file

Upload the modified script to your GCS bucket.

```bash
gsutil cp Recommendation_Engine_MovieLens.py gs://movie_recommendation_with_mllib_collaborative_filter/
```

#### 5. Create a Dataproc Cluster

Create the Dataproc cluster with the desired configuration.

```bash
gcloud dataproc clusters create spark-cluster \
    --region us-west1 \
    --zone us-west1-a \
    --master-machine-type n1-standard-4 \
    --worker-machine-type n1-standard-4 \
    --num-workers 2
```

#### 6. Submit the PySpark Job with GCS Paths

Submit your PySpark job to the Dataproc cluster, providing the GCS paths for the input files.

```bash
gcloud dataproc jobs submit pyspark gs://movie_recommendation_with_mllib_collaborative_filter/Recommendation_Engine_MovieLens.py \
    --cluster=spark-cluster \
    --region=us-west1 \
    -- \
    --input_path_movies=gs://movie_recommendation_with_mllib_collaborative_filter/movies.csv \
    --input_path_ratings=gs://movie_recommendation_with_mllib_collaborative_filter/ratings.csv
```

Replace `movie_recommendation_with_mllib_collaborative_filter` with the actual name of your GCS bucket.

## Results

Upon executing the PySpark job, the output will display the root-mean-square error (RMSE) of the model and the top 10 movie recommendations for each user. Here is a sample output for illustration:
![Design](https://github.com/Senedaa/Cloud-Computing/blob/main/Machine%20Learning/Movie%20Recommendation%20System2/images/result.png)

Predicted vs. Actual Ratings: The model's predicted ratings are mostly high (above 4.9), indicating it expects the user to rate these movies highly. The user's actual ratings show a tendency to rate certain movies very highly. Genre Match: There is a reasonable overlap in genres between recommended movies and the user's top-rated movies, suggesting the system effectively captures the user's preferences for genres like Comedy, Drama, and Romance.

This result demonstrates the successful implementation and deployment of the movie recommendation engine using PySpark on GCP Dataproc. By following these steps, your PySpark script will correctly read the files from GCS when running on GCP.

## Presentation 

https://docs.google.com/presentation/d/1B6PUaX1Zj4bJotzjtKdEFCSUWQkSW55nc_ks65JJ1PA/edit?usp=sharing

## Appendix
https://colab.research.google.com/drive/1-wVWJim5iMIFxQgvXXTTlPBkIU-4GoHh

