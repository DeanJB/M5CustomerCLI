# Auction Listings Management CLI & API

This project is a **Customer Management CLI** tool with an API backend that allows users to manage auction listings. It leverages **MongoDB** to store auction data, and you can interact with it via a **CLI** (Command Line Interface) or through an **API** endpoint.

### **Project Goals (Phase 1)**

- **Database Setup**: Using **MongoDB** to store auction data.
- **Create, Read, Update, Delete (CRUD) Operations**: Implement the CLI and API for managing auction listings.
- **Search Functionality**: Allow users to search for auction items by keyword or use generative AI to assist with search queries.

### **Tech Stack**

- **Node.js**: JavaScript runtime to execute the server and CLI commands.
- **MongoDB**: NoSQL database for storing auction listings.
- **Express.js**: Web framework for Node.js to create the API backend.
- **Mongoose**: MongoDB ODM for interacting with the database.
- **Commander.js**: For handling CLI commands.
- **Inquirer.js**: To provide prompts for user input in the terminal.
- **Dotenv**: For environment variable management.

### **Dependencies**

```json
"dependencies": {
    "commander": "^13.1.0",
    "dotenv": "^16.4.7",
    "express": "^5.1.0",
    "inquirer": "^12.5.0",
    "mongoose": "^8.13.1",
    "nodemon": "^3.1.9"
}
```

### **Setup and Installation**

1. Clone the repository to your local machine:

      ```bash
      git clone https://github.com/DeanJB/M5CustomerCLI.git
      ```

2. Navigate to the project directory:

      ```bash
      cd CUSTOMER-CLI
      ```

3. Install the required dependencies:

      ```bash
      npm install
      ```

4. Create a `.env` file in the root directory and add the following line to configure your MongoDB connection:

      ```bash
      MONGO_URI=mongodb://127.0.0.1:27017/customer-cli
      ```

      You can find your connection string from your MongoDB provider (like MongoDB Atlas).

### **Running the Project**

- **Start the server**:
  To run the API server, use the following command:

     ```bash
     npm run dev
     ```

     This will start the server on **http://localhost:5000**.

- **CLI Commands**:
  The CLI interface allows you to interact with the database directly. Here are the available commands:

     - **Add a new auction listing**:

          ```bash
          node commands.js add
          ```

          This command will prompt you to input auction details, including the customer’s name, auction title, description, start price, and reserve price.

     - **List all auction listings**:

          ```bash
          node commands.js list
          ```

          This will display all current auction listings in the database.

     - **Delete an auction listing by email**:

          ```bash
          node commands.js delete
          ```

          This command will delete a customer/auction listing from the database based on the email.

     - **Update an auction listing**:

          node commands.js update-email

          This command add an email to the auction data in the database, currently doesn't update anything else.

### **API Endpoint**

- **Search Auction Listings**:
  You can search for auction listings using the following API endpoint:

     ```
     GET http://localhost:5000/search?keyword=<your-search-keyword>
     ```

     Example:

     ```
     GET http://localhost:5000/search?keyword=drone
     ```

     This will return auction listings where either the `title` or `description` matches the provided keyword.

### **Project Structure**

```
/customer-cli
├── /models
│   └── customer.js         # Mongoose schema for auction listings
├── /commands.js            # CLI commands (add, list, delete)
├── /db.js                  # MongoDB connection logic
├── /server.js              # Express server and API logic
├── /package.json           # Project dependencies and scripts
├── /.env                   # Environment variables (MongoDB URI)
└── /README.md              # Project documentation
```

### **Future Enhancements**

- **AI-Enhanced Search**: Implement an AI-powered search system to provide better results based on auction item descriptions and titles.
- **Update Functionality**: Add functionality to update existing auction listings via CLI or API.

### **License**

This project is licensed under the ISC License.
