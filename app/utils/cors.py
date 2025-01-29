# app/middlewares/cors.py
from starlette.middleware.cors import CORSMiddleware
from app.config.config import settings

def configure_cors(app):
    """Configuring CORS Policies for Production"""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
