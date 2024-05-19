
## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- npm or yarn installed on your machine

### Backend Setup

1. **Navigate to the backend directory**:
    ```bash
    cd backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file**:
   Create a `.env` file in the `backend` directory with the following content:
    ```
    HUGGING_FACE_API_TOKEN=your_hugging_face_api_token
    ```

4. **Run the backend server**:
    ```bash
    node index.js
    ```

   The backend server will start on port 4000.

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the frontend development server**:
    ```bash
    npm start
    ```

   The frontend server will start on port 3000 by default.

### Running the Application

1. **Start the backend server**:
   Ensure that you have the backend server running on port 4000:
    ```bash
    cd backend
    node app.js
    ```

2. **Start the frontend server**:
   In a new terminal window or tab, start the frontend server:
    ```bash
    cd frontend
    npm start
    ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`. You should see the React application where you can upload audio files or record audio and receive transcriptions and sentiment analysis results.

### Notes

- Make sure the `.env` file in the backend directory is not shared or committed to version control as it contains sensitive information (Hugging Face API token).

- If you need to change the backend server's port, update the backend code accordingly and adjust the frontend API calls to point to the correct port.

## License

This project is licensed under the MIT License.
