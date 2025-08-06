Usage
Authentication

Register a new account or log in with existing credentials
The app stores JWT tokens in localStorage for session management
Employee Management

View all employees in a table format
Add new employees with name, department, and role
Edit or delete existing employee records
Task Management

Create tasks with description and assign to employees
Update task status (e.g., pending, in progress, completed)
Delete tasks when no longer needed
API Endpoints
The frontend interacts with these backend endpoints:

Authentication

POST /api/login - User login
POST /api/register - User registration
Employees

GET /employees - Fetch all employees
POST /employees - Create a new employee
PUT /employees/:id - Update an employee
DELETE /employees/:id - Delete an employee
Tasks

GET /tasks - Fetch all tasks
POST /tasks - Create a new task
PUT /tasks/:id - Update a task
DELETE /tasks/:id - Delete a task
Deployment
This project is deployed using:

Frontend static files hosted on AWS S3 (or similar)
Backend API running on AWS EC2
PostgreSQL database on AWS RDS
Domain and DNS configured via AWS Route 53
HTTPS security with Let's Encrypt SSL certificates

Security Features
JWT authentication for protected routes
Password hashing with bcrypt on the backend
HTTPS for secure API communication
Protected routes requiring authentication
