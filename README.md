# Customer Churn Prediction Platform

A full-stack machine learning application for predicting telecom customer churn. The project combines an ML training pipeline, a FastAPI inference service, and a modern Next.js frontend for entering customer details and displaying prediction results.

## Overview

This repository is organized into three main parts:

- `training_ml/` for data exploration, preprocessing, model training, and artifact export.
- `backend/` for the FastAPI prediction API that loads the trained model and scaler.
- `frontend/` for the Next.js user interface that collects customer information and calls the API.

The end-to-end flow is:

1. A user enters customer details in the frontend.
2. The frontend sends the payload to the backend prediction endpoint.
3. The backend expands the request into the expected feature vector, scales the input, and runs the model.
4. The API returns a binary churn prediction.
5. The frontend renders the result as a clear high-risk or low-risk outcome.

## Machine Learning Training

### Dataset

The model was trained on the IBM Telco Customer Churn dataset located at:

- `training_ml/data/WA_Fn-UseC_-Telco-Customer-Churn.csv`

Dataset characteristics observed in the notebook:

- 7,043 customer records
- 21 original columns
- Target column: `Churn` with `Yes` / `No` labels

### Preprocessing

The notebook performs the following preparation steps before model training:

- Converts `TotalCharges` from text to numeric.
- Handles missing `TotalCharges` values by filling with the median.
- Encodes the churn target into a binary label.
- Applies binary encoding for yes/no style fields.
- Uses one-hot encoding for categorical service and contract features.
- Scales numeric inputs with `StandardScaler`.
- Splits the data into training and test sets using an 80/20 split.

### Feature Set

The final inference schema used by the backend contains 31 engineered features, including:

- Demographics: `SeniorCitizen`, `gender_Male`, `Partner_Yes`, `Dependents_Yes`
- Service usage: `PhoneService_Yes`, `MultipleLines_Yes`, internet and streaming service flags
- Contract and billing: `Contract_One year`, `Contract_Two year`, `PaperlessBilling_Yes`
- Payment method indicators
- Financial and tenure fields: `tenure`, `MonthlyCharges`, `TotalCharges`

### Models Evaluated

The notebook evaluates three classifiers:

- Logistic Regression
- Random Forest Classifier
- XGBoost Classifier

### Results

The final evaluation metrics recorded in the notebook are:

| Model | Accuracy | F1 Score | ROC-AUC |
| --- | ---: | ---: | ---: |
| Logistic Regression | 0.8197 | 0.6361 | 0.7479 |
| Random Forest | 0.7899 | 0.5361 | - |
| XGBoost | 0.7984 | 0.5848 | - |

After comparing multiple models, Logistic Regression was selected as the best model due to:

- Highest F1-score (better balance between precision and recall)
- More stable performance on imbalanced dataset
- Lower risk of overfitting compared to ensemble models
- Better interpretability for business use

## 📊 Key Insight

Although XGBoost is often more powerful, Logistic Regression performed better on this dataset due to its simplicity and better generalization on imbalanced churn data.

### Trained Artifacts

The persisted model files are stored in the repository for inference:

- `backend/model.pkl`
- `backend/scaler.pkl`

The notebook also contains the training outputs and export steps used to generate these artifacts:

- `training_ml/notebooks/EDA.ipynb`

## Backend

### Technology Stack

- FastAPI
- Uvicorn
- NumPy
- scikit-learn
- Joblib

### Key File

- `backend/main.py`

### API Behavior

The backend service:

- Loads the trained model and scaler with Joblib.
- Exposes a health check route at `GET /`.
- Exposes a prediction route at `POST /predict`.
- Enables CORS for all origins during development.
- Builds a full 31-feature input vector by defaulting missing features to `0`.
- Scales the input before inference.
- Returns `{"churn_prediction": 0}` or `{"churn_prediction": 1}`.

### Important Implementation Notes

- The backend expects to run from the `backend/` directory so that `model.pkl` and `scaler.pkl` are available at runtime.
- The current CORS policy is permissive for development. Restrict it before deploying to production.

### API Endpoints

#### `GET /`

Returns a simple health message.

Example response:

```json
{
  "message": "Customer Churn API is running"
}
```

#### `POST /predict`

Accepts a JSON payload containing the customer features used by the trained model.

Example request:

```json
{
  "SeniorCitizen": 0,
  "tenure": 12,
  "MonthlyCharges": 79.9,
  "TotalCharges": 950.4,
  "gender_Male": 1,
  "Partner_Yes": 1,
  "Dependents_Yes": 0,
  "PhoneService_Yes": 1,
  "MultipleLines_Yes": 0,
  "InternetService_Fiber_optic": 1,
  "Contract_One_year": 0,
  "Contract_Two_year": 0,
  "PaperlessBilling_Yes": 1,
  "PaymentMethod_Electronic_check": 1
}
```

Example response:

```json
{
  "churn_prediction": 1
}
```

## Frontend

### Technology Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- ESLint

### Key Files

- `frontend/src/app/page.jsx`
- `frontend/src/app/predict/page.jsx`
- `frontend/src/components/prediction-form.jsx`
- `frontend/src/app/layout.js`

### UI Behavior

The frontend provides a polished churn prediction experience with:

- A landing page that introduces the product and highlights the prediction workflow.
- A dedicated prediction page with grouped customer inputs.
- Styled cards for customer profile, service details, account information, contract type, and billing context.
- A result panel that clearly shows high-risk or low-risk churn output.
- Responsive layout and a dark visual theme optimized for readability.

### Prediction Flow

The form collects the customer inputs, converts them into the feature payload expected by the backend, and sends the request to:

- `http://127.0.0.1:8000/predict`

If the backend runs on a different host or port, update the fetch URL in:

- `frontend/src/components/prediction-form.jsx`

## Project Structure

```text
customer-churn/
├── backend/
│   ├── main.py
│   ├── model.pkl
│   ├── scaler.pkl
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   ├── package.json
│   └── README.md
├── training_ml/
│   ├── data/
│   ├── notebooks/
│   ├── requirements.txt
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10 or newer
- Node.js 18 or newer
- npm

### 1. Start the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The web app will be available at `http://localhost:3000`.

### 3. Open the prediction UI

- Visit the home page for an overview.
- Open `/predict` to enter customer information and generate a churn prediction.

## Training the Model Again

To retrain the model, open the notebook in `training_ml/notebooks/EDA.ipynb`, rerun the preprocessing and model evaluation cells, then export the updated artifacts.

After retraining, ensure the latest `model.pkl` and `scaler.pkl` are copied into `backend/` so the API uses the refreshed model.

## Notes

- The current backend returns a binary churn label rather than a probability score.
- The frontend currently sends the core feature subset used in the form, while the backend fills any omitted one-hot features with zeros.
- For production use, consider adding authentication, tighter CORS rules, logging, and structured error handling.

## License

No license has been specified in this repository.