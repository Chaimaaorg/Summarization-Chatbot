# -*- coding: utf-8 -*-
from fastapi import  HTTPException, Request, status
from jose import jwt
from pydantic import ValidationError
from app.config.config import settings

async def user_id_identifier(request: Request) -> str:
    """Identify the user from the request."""
    if request.scope["type"] == "http":
        # Retrieve the Authorization header from the request
        auth_header = request.headers.get("Authorization")

        if auth_header is not None:
            # Check that the header is in the correct format
            header_parts = auth_header.split()
            if len(header_parts) == 2 and header_parts[0].lower() == "bearer":
                token = header_parts[1]
                try:
                    payload = jwt.decode(
                        token,
                        yaml.SECRET_KEY,
                        algorithms=["HS256"],
                    )
                except (
                    jwt.JWTError,
                    ValidationError,
                ):
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail="Could not validate credentials",
                    )
                user_id = payload["sub"]
                print(
                    "here2",
                    user_id,
                )
                return user_id

    if request.scope["type"] == "websocket":
        return request.scope["path"]

    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0]

    ip = request.client.host if request.client else ""
    return ip + ":" + request.scope["path"]