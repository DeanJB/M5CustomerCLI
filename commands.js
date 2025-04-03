import { program } from "commander";
import mongoose from "mongoose";
import connectDB from "./database.js";
import Customer from "../CUSTOMER-CLI/models/customer.js";
import inquirer from "inquirer";

connectDB(); // Connect to MongoDB

// Simiplified the details down
program
      .command("add")
      .description("Add a new customer with an auction item")
      .action(async () => {
            try {
                  console.log("starting the prompt");
                  console.log("Inquirer object:", inquirer);

                  const answers = await inquirer.prompt([
                        { type: "input", name: "email", message: "Enter your email:" },
                        // { type: "input", auction: "lastName", message: "Enter the customer's last name:" },
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

                  console.log("Prompt finished. Answers received:", answers);

                  const { email, title, description, startPrice, reservePrice } = answers;

                  const newCustomer = new Customer({
                        email,
                        title,
                        description,
                        startPrice,
                        reservePrice,
                  });

                  await newCustomer.save();
                  console.log(`Customer with email ${email} added with auction item.`);
            } catch (error) {
                  console.error("Error adding customer:", error.message);
            } finally {
                  mongoose.connection.close();
            }
      });

// List all customers
program
      .command("list")
      .description("List all customers")
      .action(async () => {
            try {
                  const customers = await Customer.find();
                  console.log("Customers:", customers);
            } catch (error) {
                  console.error("Error listing customers:", error.message);
            } finally {
                  mongoose.connection.close();
            }
      });

// Delete customer by email
program
      .command("delete")
      .description("Delete a customer by email")
      .action(async () => {
            try {
                  // Prompt the user for the email
                  const answers = await inquirer.prompt([
                        { type: "input", name: "email", message: "Enter the email of the customer to delete:" },
                  ]);

                  const { email } = answers;

                  // Find and delete the customer by email, unless i figureout nanoID
                  const result = await Customer.findOneAndDelete({ email });

                  if (result) {
                        console.log(`Customer with email ${email} deleted.`);
                  } else {
                        console.log(`No customer found with email: ${email}`);
                  }
            } catch (error) {
                  console.error("Error deleting customer:", error.message);
            } finally {
                  mongoose.connection.close();
            }
      });

program
      .command("update-email")
      .description("Update a customer's auction listing to include an email")
      .action(async () => {
            try {
                  const answers = await inquirer.prompt([
                        { type: "input", name: "title", message: "Enter the auction title to update:" },
                        { type: "input", name: "email", message: "Enter the email to add:" },
                  ]);

                  const { title, email } = answers;

                  // Find and update the listing
                  const updatedCustomer = await Customer.findOneAndUpdate(
                        { title: new RegExp(title, "i") }, // Case-insensitive match
                        { email }, // Add email field
                        { new: true } // Return the updated document
                  );

                  if (updatedCustomer) {
                        console.log(
                              `Auction item '${updatedCustomer.title}' updated with email: ${updatedCustomer.email}`
                        );
                  } else {
                        console.log("No matching auction listing found.");
                  }
            } catch (error) {
                  console.error("Error updating email:", error.message);
            } finally {
                  mongoose.connection.close();
            }
      });

program.parse(process.argv);
