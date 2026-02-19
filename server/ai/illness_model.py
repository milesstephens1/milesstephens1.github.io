import joblib
import numpy as np
import pandas as pd

model = joblib.load("illness_model.pkl")

def predict_illness(features):
    feature_names = ["avg_temp", "max_temp", "temp_trend", "avg_hr", "avg_sleep", "steps_drop"]
    
    df = pd.DataFrame([features], columns=feature_names)
    
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return {    
        "ill": bool(prediction),
        "probability": float(probability)
    }