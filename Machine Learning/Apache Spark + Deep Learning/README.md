# Deep Learning Pipelines for Apache Spark

### Project Overview

This project introduces Deep Learning Pipelines for Apache Spark, a library published by Databricks to provide high-level APIs for scalable deep learning model application and transfer learning via integration of popular deep learning libraries with MLlib Pipelines and Spark SQL.

### Technologies

- **Deep Learning Pipelines by Databricks:** For high-level APIs and integration.
- **Apache Spark:** For data processing and MLlib for machine learning.
- **TensorFlow and Keras:** For deep learning model creation and application.
- **Google Cloud Platform (GCP):** For data storage and processing.

## Design

### Identify and Understand the Problems

**Problem Statement:** Provide high-level APIs for scalable deep learning model application and transfer learning via integration of popular deep learning libraries with MLlib Pipelines and Spark SQL.

**Challenges:**

- Integrating deep learning libraries with Spark DataFrames and SQL.
- Handling large-scale image data efficiently.
- Ensuring scalability and ease of use.

### Possible Solutions

**Existing Deep Learning Libraries:**

- **TensorFlow, Keras, PyTorch:**
  - Pros: Highly customizable and powerful, extensive community support and documentation.
  - Cons: Complex integration with Spark and large-scale data handling, requires substantial setup and configuration.
- **Spark MLlib:**
  - Pros: Great for machine learning.
  - Cons: Lacks deep learning capabilities.

**Custom Integration:**

- Pros: Tailored to specific needs and use cases, potential for optimized performance.
- Cons: Time-consuming to develop, requires extensive maintenance and updates.

**Deep Learning Pipelines by Databricks:**

- Pros: Simplifies the process of integrating deep learning with Spark, provides high-level APIs and utilities for common tasks, scalable and efficient for large-scale data.
- Cons: May have limitations compared to fully custom solutions, dependency on the library’s updates and support.

### Selected Solution

**Deep Learning Pipelines by Databricks:**

- Advantages: Provides high-level APIs for scalable deep learning model application, integrates popular deep learning libraries with MLlib Pipelines and Spark SQL, simplifies the process of working with images in Spark DataFrames, facilitates transfer learning and distributed hyper-parameter tuning.

## Implementation and Testing

### Image Data Handling

#### Step 1: Setting Up the Cluster Environment

- **Install Libraries:** Deep Learning Pipelines is available as a Spark Package. To use it on your cluster, create a new library with the Source option "Maven Coordinate", using "Search Spark Packages and Maven Central" to find "spark-deep-learning" and then attach the library to a cluster.
- **Install Dependencies:**
  - Add the Maven coordinate for spark-deep-learning to your Spark setup.
  - Install required Python libraries: TensorFlow, Keras, h5py, and spark-deep-learning.

#### Step 2: Obtain Image Dataset

- Download and extract the flowers dataset from the TensorFlow retraining tutorial.

#### Step 3: Create a Sample Set of Images

- Create a smaller sample set of images for quick demonstrations.

#### Step 4: Load Images into Spark DataFrames

- Read images using DLP's tools to read images directly into Spark DataFrames.

#### Step 5: Create Training and Test Data Frames for Transfer Learning

- Read images, assign labels, and split the data into training and test sets.

#### Step 6: Train and Evaluate the Model

- Train the model using a pipeline that includes feature extraction with a pre-trained model and logistic regression, then evaluate its performance.

#### Step 7: Applying Deep Learning Models at Scale

- Use Spark DataFrames to apply deep learning models to large-scale datasets. Deep Learning Pipelines provides a set of (Spark MLlib) Transformers for applying TensorFlow Graphs and TensorFlow-backed Keras Models at scale.

#### Step 7.1: Apply Popular Image Models

- Use the DeepImagePredictor transformer to apply popular pre-trained models for image classification.

#### Step 7.2: Create Custom TensorFlow Graphs (For TensorFlow users)

- The TFImageTransformer allows users to apply custom TensorFlow Graphs to the image DataFrame.

#### Step 7.3: Apply Keras Models (For Keras users)

- The KerasImageFileTransformer allows users to apply Keras models to the DataFrame containing image URIs.

#### Step 8: Testing with Pre-trained Keras Model

- Apply a pre-trained Keras model (InceptionV3) to images stored in a DataFrame.

## Appendix

https://docs.google.com/presentation/d/1ENK5JRw_bSc6vBkSaVC36UaD4zCREstJ_xW0gFUYjJU/edit#slide=id.g27a150c8a4a_3_39
