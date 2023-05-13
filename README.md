Thank you for your interest in CarEase, a mobile application designed to help car owners manage their car maintenance and service schedules. Below is important information and instructions to help you run the application on your mobile device:

Application Details:

Frontend: The frontend of CarEase is built using React Native, and there is one TypeScript file included.
Backend: The backend of CarEase is developed using Node.js and Express.
Database: MySQL is used as the database management system.
Developers:
This application was built by the following developers:

Aimen Guedhami
Adem Ben Alaya
Selim Soyah
Khalil Fekih Hassen
Instructions:

Server Setup:
a. Open the backend folder and create a file named .env. This file is essential for security purposes.
b. Inside the .env file, add the following content, replacing the placeholders with your actual values:
```
{
    serverport = 'your port'
    user = 'your db user'
    host = 'your host'
    password = 'your db password'
    database = 'the name of your schema'
    port = 'your db port'
}
```
c. Save the .env file.

Launching the Server:
a. Open your terminal or command prompt and navigate to the backend folder.
b. Run the command npm run dev to start the server using nodemon. This command will automatically restart the server whenever changes are made, making development easier.

Frontend Configuration:
a. Manually enter the IP address and server port in the frontend code. Be cautious not to include the .env file in the frontend folder, as it may cause issues.

Running the Application:
a. Once the server is up and running, you can run the mobile application on your device.
b. The application will remind you of specific car maintenance check dates and provide the option to search for the nearest mechanic shops.
c. Users can access ratings, categories, and locations of various mechanic shops.
d. The application facilitates direct communication between car owners and mechanics.
e. The notification system will keep reminding car owners about their upcoming check dates.

Please follow these instructions to successfully run CarEase on your mobile device. Should you have any further questions or issues, feel free to reach out for assistance.

Best regards,
