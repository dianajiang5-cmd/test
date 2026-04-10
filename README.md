# express api

A simple REST API in Node.js.

## Quick Start

Install dependencies:

```bash
npm install
```

Start server in dev mode:

```bash
npm run dev
```

Default URL:

```text
http://localhost:8080
```

## Endpoint Table (for task delivery)

Base path: `/api/employees`

| Method | URL | Parameters | Request Body Format | Response Format | Error Codes |
|---|---|---|---|---|---|
| GET | `/api/employees` | None | None | `200` + JSON array of employee objects: `[{"_id","name","job"}]` | `500` server error |
| GET | `/api/employees/:id` | `path`: `id` (employee id) | None | `200` + JSON object: `{"_id","name","job"}` | `404` employee not found, `500` server error |
| POST | `/api/employees` | None | JSON object: `{"name":"string(3-30)","job":"string(3-30)"}` | `201` + created JSON object: `{"_id","name","job"}` | `409` duplicate name, `500` validation/server error |
| PUT | `/api/employees/:id` | `path`: `id` (employee id) | JSON object: `{"name":"string(3-30)","job":"string(3-30)"}` | `200` + updated JSON object: `{"_id","name","job"}` | `404` employee not found, `500` validation/server error |
| DELETE | `/api/employees/:id` | `path`: `id` (employee id) | None | `200` + JSON message: `{"message":"Employee has been deleted"}` | `404` employee not found, `500` server error |

## Local Data

This project now uses a simple local JSON file for demo/testing:

`data/employees.json`

So you can run the API directly without external MongoDB.

## Apidog Test Requests

After starting the server, create these requests in Apidog:

1. Get all employees  
   - `GET http://localhost:8080/api/employees`

2. Get one employee by id  
   - `GET http://localhost:8080/api/employees/{{employeeId}}`

3. Create one employee  
   - `POST http://localhost:8080/api/employees`  
   - Body (JSON):
   ```json
   {
     "name": "Cathy Wu",
     "job": "Backend Engineer"
   }
   ```

4. Delete the created employee  
   - `DELETE http://localhost:8080/api/employees/{{employeeId}}`


