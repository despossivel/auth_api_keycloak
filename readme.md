## KEYCLOAK AUTH API REST Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
   1. [Auth](#auth)
   2. [Create User](#create-user)
   3. [Reset Password](#reset-password)

## 1. Introduction

This book provides documentation for the API, covering various endpoints and their usage. The API allows users to interact with authentication-related functionalities, such as user authentication, account creation, and password reset.

## 2. Authentication

### 2.1 Auth

**Endpoint:** `POST` [http://localhost:8000/auth](http://localhost:8000/auth)

**Request:**
```curl
curl -X POST http://localhost:8000/auth \
  -H "Content-Type: application/json" \
  -H "User-Agent: insomnia/8.4.5" \
  -d '{
    "username": "demo",
    "password": "demo"
  }'
```

### 2.2 Create User
**Endpoint:** `POST` [http://localhost:8000/signup](http://localhost:8000/signup)

**Request:**

```curl
curl -X POST http://localhost:8000/signup \
  -H "Content-Type: application/json" \
  -H "User-Agent: insomnia/8.4.5" \
  -d '{
    "firstName": "Matheus",
    "lastName": "Brito",
    "email": "test2@2test.com",
    "enabled": "true",
    "username": "app-user-2"
  }'

```

### 2.3 Reset Password
**Endpoint:** `PUT` [http://localhost:8000/reset/password/{user_id}](http://localhost:8000/reset/password/{user_id})

**Request:**

```curl
curl -X PUT http://localhost:8000/reset/password/af2f7549-c0ab-4ddc-b484-df2c363039c1 \
  -H "Content-Type: application/json" \
  -H "User-Agent: insomnia/8.4.5" \
  -d '{
    "value": "newPassword"
  }'
```
