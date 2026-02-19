import joblib
import numpy as np

model = joblib.load("illness_model.pkl")

def predict_illness(features):
    features = np.array(features).reshape(1, -1)
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]

    return {    
        "ill": bool(prediction),
        "probability": float(probability)
    }
