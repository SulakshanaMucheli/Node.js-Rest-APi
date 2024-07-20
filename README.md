# User Location API

A simple API built with Node.js, Express.js, and MongoDB to retrieve users based on their geographical coordinates.

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)


## Description

This project provides an API to retrieve users based on their geographical coordinates using MongoDB's geospatial queries. It calculates the distance between a specified latitude and longitude and filters users within a given radius.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/user-location-api.git
   cd user-location-api
   ```
  Node and MongoDB Installation
  ```bash
  npm init -y
  npm i express mongoose
  ```
## API EndPoints
-GET /users
Fetches users based on provided latitude and longitude.

Query Parameters
latitude: Latitude of the center point.
longitude: Longitude of the center point.
page: (Optional) Page number for pagination (default: 1).
limit: (Optional) Number of users per page (default: 10).
```bash
GET /users?latitude=37.7749&longitude=-122.4194&page=1&limit=10
```
## Usage
Fetch users based on location:

Send a GET request to /users with query parameters latitude and longitude to retrieve users within a specified radius.
