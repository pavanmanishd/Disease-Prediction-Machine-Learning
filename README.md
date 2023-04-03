# Disease Prediction using Machine Learning

## Introduction

- This project is based on the idea of predicting the disease of a patient based on the symptoms he/she is facing.
- The dataset used for this project is taken from [Kaggle](https://www.kaggle.com/itachi9604/disease-symptom-description-dataset).
- The dataset contains 4920 rows and 132 columns.
- The dataset contains the name of the disease, the symptoms of the disease and the description of the disease.
- The dataset is in the form of a csv file.

## Procedure
- The dataset is cleaned and preprocessed.
- The dataset is then split into training and testing data.
- The training data is then used to train the model.
- The model is then tested on the testing data.
- The model is then used to predict the disease of a patient based on the symptoms he/she is facing.

## Technologies Used
### ML
- Python
- Scikit-learn
- Pandas
- Numpy
### Web
- React
- Node.js
- Express.js

## How to run the project
- Clone the repository.
- Open the terminal in the project directory.
- Run the following commands:
```
cd server
npm install
npm start
```
- The server will be running on localhost:5000.
- Open another terminal in the project directory.
- Run the following commands:
```
cd frontend
npm install
npm start
```
- The project will be running on localhost:3000.


#


## NOTE : For linux users, in server/server.js file , in line 14 change the command spawned to `python3` or `python` instead of `py`.

#




# Project Architecture

## Frontend

- The frontend is built using React.
- The frontend is divided into 2 components:
    - Home
    - Predict
- The Home component is the landing page of the website.
- The Predict component is used to predict the disease of a patient based on the symptoms he/she is facing.
- Symptoms are selected from the list of symptoms.
- The selected symptoms are then sent to the backend.
- The predicted disease is then displayed on the screen.

## Backend

- The backend is built using Node.js and Express.js.
- The backend contains server.js file which is the entry point of the server.
- It runs the python script and returns the predicted disease to the frontend.
- The python script is run using the child_process module of Node.js.


## Contributors

<!-- - ![Pavan Manish](https://avatars.githubusercontent.com/u/108605548) -->
<!-- - ![Vishal Sai](https://avatars.githubusercontent.com/u/99084280) -->
<a href="https://github.com/pavanmanishd">
<img src="https://avatars.githubusercontent.com/u/108605548?v=4" width = "50" style="border-radius:25px;">
</a>
<a href="https://github.com/Vishal0129">
<img src="https://avatars.githubusercontent.com/u/99084280?v=4" width = "50" style="border-radius:25px;">
</a>


