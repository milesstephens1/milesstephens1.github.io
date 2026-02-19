from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from illness_model import predict_illness

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://milesstephens1.github.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class HealthData(BaseModel):
    avg_temp: float
    max_temp: float
    temp_trend: int
    avg_hr: float
    avg_sleep: float
    steps_drop: int

@app.post("/predict")
def predict(data: HealthData):
    features = [
        data.avg_temp,
        data.max_temp,
        data.temp_trend,
        data.avg_hr,
        data.avg_sleep,
        data.steps_drop
    ]

    return predict_illness(features)
