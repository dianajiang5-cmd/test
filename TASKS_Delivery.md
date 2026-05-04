# Tasks Delivery
## 1) REST service endpoint table

Base URL: `http://localhost:8080`  
Base resource: `/api/employees`

| Method | URL | Parameters | Request body | Success response | Error codes |
|---|---|---|---|---|---|
| GET | `/api/employees` | None | None | `200` + `[{"_id","name","job"}]` | `500` |
| GET | `/api/employees/:id` | Path: `id` | None | `200` + `{"_id","name","job"}` | `404`, `500` |
| POST | `/api/employees` | None | `{"name":"string(3-30)","job":"string(3-30)"}` | `201` + created object | `409`, `500` |
| PUT | `/api/employees/:id` | Path: `id` | `{"name":"string(3-30)","job":"string(3-30)"}` | `200` + updated object | `404`, `500` |
| DELETE | `/api/employees/:id` | Path: `id` | None | `200` + `{"message":"Employee has been deleted"}` | `404`, `500` |

## 2) Execute required requests in Apidog

1. Create a new project in Apidog.
2. Add environment variable:
   - `baseUrl = http://localhost:8080`
3. Create requests:

### A. Get all records

`GET {{baseUrl}}/api/employees`

### B. Get one record by id

Use an id from step A, for example:

`GET {{baseUrl}}/api/employees/e1c5bfad-e7a3-4474-b54a-2fcefb425f9a`

### C. Add one new record

`POST {{baseUrl}}/api/employees`

Body (JSON):

```json
{
  "name": "Diana Jiang",
  "job": "Software Engineer"
}
```

Save returned `_id` as `newEmployeeId`.

### D. Delete the added record

`DELETE {{baseUrl}}/api/employees/{{newEmployeeId}}`

## Notes

- Demo seed data is in `data/employees.json`.
- The API now uses local JSON storage, so no remote MongoDB is required.
