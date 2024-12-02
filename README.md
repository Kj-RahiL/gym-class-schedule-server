# 🧘‍♂️ Gym Class Scheduling and Membership Management Server app

## Live Url: https://gym-class-schedule.vercel.app

## Story

The Gym Class Scheduling and Membership Management System is designed to manage gym operations efficiently. The system defines three roles: Admin, Trainer, and Trainee, each with specific permissions. Admins are responsible for creating and managing trainers, scheduling classes, and assigning trainers to these schedules. Each day can have a maximum of five class schedules, with each class lasting two hours. Trainers conduct the classes and can view their assigned class schedules but cannot create new schedules or manage trainee profiles.

## Features

- **User Authentication**: User sign-up, login, and role-based access control (Admin/Trainer/Trainee).
- **Trainer Management**: Admins can add, update, delete trainer.
- **Class Management**: ADmin can create, update, delete class schedule.
- **Booking System**: trainee can book their class.

## Technologies Used

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ORM
- **Validation**: Zod for input validation
- **Authentication**: JSON Web Tokens (JWT) for secure authentication
- **Error Handling**: Global error handling middleware

## Installation

1. Clone the repository:

   ```bash
   git clone <your repository>

    ```
2. Navigate to the project directory:
    ``` 
    cd gym-class-schedule
    ```
3. Install the dependencies:
    ``` 
    npm install
    ```
4. Set up environment variables:
    ```example
    NODE_ENV= development
    PORT= your port
    DATABASE_URL=mongodbi uri
    BCRYPT_SALT_ROUNDS = salt rounds
    JWT_ACCESS_SECRET = your access_secret
    JWT_ACCESS_EXPIRE_IN=expire day
    JWT_REFRESH_SECRET = your refreshscret
    JWT_REFRESH__EXPIRE_IN= expire day

    // admin credentials
    Admin_Email= <your email>
    Admin_Pass=<your pass>
    ```
5. Start the server:
    ```
    npm run dev
    ```
## 🚀 Usage

### Running the Application Locally
- Start the server and frontend as described in the setup instructions.
    ```
    http://localhost:5000
    ```

### Admin Access
- To access only admin can manage trainer and schedule.

## 🔗 API Endpoints

Below are some key API endpoints available for this application. For a full list, refer to the API Documentation if Swagger or similar is set up.

| Endpoint                       | Method | Description                   |
|--------------------------------|--------|-------------------------------|
| `/api/auth/register`           | POST   | Register a new user           |
| `/api/auth/login`              | POST   | Login user                    |
| `/api/trainer/create-trainer`  | POST   | Create a new trainer          |
| `/api/trainer/:id`             | GET    | Get a single trainer          |
| `/api/trainer`                 | GET    | Get a All trainer             |
| `/api/trainer/:id`             | PUT    | Get a update trainer          |
| `/api/trainer/:id`             | DELETE | Get a delete trainer          |
| `/api/schedule/create-schedule`| POST   | Create a new Schedule         |
| `/api/schedule/:id`            | GET    | get Schedule                  |
| `/api/schedule`                | GET    | Get all Schedule              |
| `/api/schedule/:id`            | PUT    | Update Schedule               |
| `/api/schedule/:id`            | DELETE | DELETE Schedule               |
| `/api/booking/create-booking`  | POST   | Create a Booking              |

## License
    This project is Task Project .

## 📬 Contact

For questions or support, please reach out through the [Contact Us](#) page on the website or email us at **rahiilarham@gmail.com**.

Happy Coding! 🥘