from fastapi import FastAPI
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_features = [
 'SeniorCitizen', 'tenure', 'MonthlyCharges', 'TotalCharges',
 'gender_Male', 'Partner_Yes', 'Dependents_Yes', 'PhoneService_Yes',
 'MultipleLines_No phone service', 'MultipleLines_Yes',
 'InternetService_Fiber optic', 'InternetService_No',
 'OnlineSecurity_No internet service', 'OnlineSecurity_Yes',
 'OnlineBackup_No internet service', 'OnlineBackup_Yes',
 'DeviceProtection_No internet service', 'DeviceProtection_Yes',
 'TechSupport_No internet service', 'TechSupport_Yes',
 'StreamingTV_No internet service', 'StreamingTV_Yes',
 'StreamingMovies_No internet service', 'StreamingMovies_Yes',
 'Contract_One year', 'Contract_Two year', 'PaperlessBilling_Yes',
 'PaymentMethod_Credit card (automatic)',
 'PaymentMethod_Electronic check', 'PaymentMethod_Mailed check'
]

# Load model and scaler
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")


@app.get("/")
def home():
    return {"message": "Customer Churn API is running"}

@app.post("/predict")
def predict(data: dict):

    try:
        # Create full input with all features
        input_dict = {feature: 0 for feature in model_features}

        # Update with user input
        input_dict.update(data)

        # Convert to array in correct order
        input_data = [input_dict[feature] for feature in model_features]

        input_array = np.array(input_data).reshape(1, -1)

        # Scale
        scaled_data = scaler.transform(input_array)

        # Predict
        prediction = model.predict(scaled_data)[0]

        return {"churn_prediction": int(prediction)}

    except Exception as e:
        return {"error": str(e)}