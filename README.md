Country Info App
This application provides information about countries and allows users to add national holidays to their calendar. It uses external APIs to fetch country details such as borders, population data, and flag images.

Table of Contents:

Installation and Setup
Running the Application
Development Mode
Production Mode
API Endpoints
Testing the Application
Additional Notes
Installation and Setup

Clone the repository:

git clone <repository_url>
cd country-info-app
Install dependencies:

npm install
Configure environment variables:

Create a .env file in the project root with the following content:

PORT=3000
NAGER_API_BASE=https://date.nager.at/api/v3
COUNTRIES_NOW_API_BASE=https://countriesnow.space/api/v0.1

Adjust the values if needed.
Running the Application

Build the project:

npm run build
Start the server:

npm run start
API Endpoints
GET /countries
Retrieves a list of available countries.

GET /countries/:countryCode/info
Retrieves detailed information about a specific country, including:

Borders
Population data
Flag image URL

Example:
GET http://localhost:3000/countries/UKR/info
POST /users/:userId/calendar/holidays
Adds national holidays to a user’s calendar.

Example request:

POST http://localhost:3000/users/123/calendar/holidays
Request body:

json
Copy
{
  "countryCode": "US",
  "year": 2025,
  "holidays": ["New Year's Day", "Independence Day"]
}


Verify that:
The server is running on the specified port (default is 3000).
Endpoints return expected responses.
Error handling works correctly (for example, missing required fields in a POST request returns a 400 status code).
Additional Notes
Ensure that environment variables are correctly set up before running the application.
The application uses external APIs (Nager API and CountriesNow API) to fetch country details. Make sure these APIs are accessible from your environment.
