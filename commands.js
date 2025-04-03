import { program } from "commander";
import mongoose from "mongoose";
import connectDB from "./database.js";
import Customer from "../CUSTOMER-CLI/models/customer.js";
import inquirer from "inquirer";
import { nanoid } from "nanoid";

connectDB(); // Connect to MongoDB

async function cliMenu() {
      while (true) {
            const { action } = await inquirer.prompt([
                  {
                        type: "list",
                        name: "action",
                        message: "What would you like to do?",
                        choices: ["Add a listing", "List all listings", "Delete a listing", "Exit"],
                  },
            ]);

            if (action === "Add a listing") {
                  await addListing();
            } else if (action === "List all listings") {
                  await listAllListings();
            } else if (action === "Delete a listing") {
                  await deleteListing();
            } else if (action === "Update Email") {
                  await updateEmail();
            } else if (action === "Exit") {
                  console.log("Exiting the CLI. Goodbye!");
                  mongoose.connection.close();
                  process.exit(0);
            }
      }
}

async function addListing() {
      try {
            const answers = await inquirer.prompt([
                  { type: "input", name: "email", message: "Enter your email:" },
                  { type: "input", name: "title", message: "Enter the auction title:" },
                  { type: "input", name: "description", message: "Enter the auction description:" },
                  {
                        type: "input",
                        name: "startPrice",
                        message: "Enter the auction start price:",
                        validate: (value) => (!isNaN(value) ? true : "Please enter a valid number"),
                  },
                  {
                        type: "input",
                        name: "reservePrice",
                        message: "Enter the auction reserve price:",
                        validate: (value) => (!isNaN(value) ? true : "Please enter a valid number"),
                  },
            ]);

            const auctionID = nanoid(10);
            const newCustomer = new Customer({
                  auctionID,
                  ...answers,
            });
            await newCustomer.save();
            console.log(`✅ Listing added successfully with ID: ${auctionID}`);
      } catch (error) {
            console.error("❌ Error adding listing:", error.message);
      }
}

async function listAllListings() {
      try {
            const customers = await Customer.find();
            if (customers.length === 0) {
                  console.log("No listings found.");
            } else {
                  console.table(customers, [
                        "auctionID",
                        "email",
                        "title",
                        "description",
                        "startPrice",
                        "reservePrice",
                  ]);
            }
      } catch (error) {
            console.error("❌ Error listing customers:", error.message);
      }
}

async function deleteListing() {
      try {
            const answers = await inquirer.prompt([
                  {
                        type: "input",
                        name: "auctionID",
                        message: "Enter the Auction ID of the customer to delete:",
                  },
            ]);
            const result = await Customer.findOneAndDelete({ auctionID });
            if (result) {
                  console.log(`✅ Listing with auctionID ${auctionID} deleted.`);
            } else {
                  console.log(`❌ No listing found with auctionID: ${auctionID}`);
            }
      } catch (error) {
            console.error("❌ Error deleting listing:", error.message);
      }
}

cliMenu();
