# Full Stack Web Application with SignalR Integration

## Overview

This project is a full-stack web application that demonstrates real-time communication using SignalR. The application simulates a long-running process on the backend and provides real-time progress updates to the frontend.

## Technologies Used

### Backend

- .NET 8.0
- ASP.NET Core Web API
- SignalR
- C#

### Frontend

- React.js
- SignalR Client
- JavaScript

## Project Structure

### Backend

```plaintext
server/
├─ Controllers/
│  └─ ProcessController.cs    # API controller to start the process
├─ Hubs/
│  └─ ProcessHub.cs          # SignalR hub for real-time communication
├─ Services/
│  └─ ProcessService.cs   # Simulated long-running process
└─ Program.cs                # Application configuration and startup
```

### Frontend

```plaintext
client/
├─ src/
│  └─ components/
|     ├─ Main.jsx       # Main component with UI and API calls
│     └─ Main.css     
|  └─ services/
│     └─ signalRService.js      # SignalR client service
|  └─ App.js
└─ package.json              # Project dependencies
```

## Installation

### Backend

1. Navigate to the backend folder:
   ```bash
   cd SignalRApp
   ```
2. Install dependencies:
   ```bash
   dotnet restore
   ```
3. Run the application:
   ```bash
   dotnet run
   ```
API will be available at: http://localhost:5150

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd signalr-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```
  

