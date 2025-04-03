import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
      // firstName: { type: String },
      // lastName: { type: String },
      // phone: { type: String },
      email: { type: String },
      // auctionID: { type: Number, unique: true },

      // Trade me auction fields
      title: { type: String, required: true },
      description: { type: String },
      startPrice: { type: Number, required: true },
      reservePrice: { type: Number, required: true },

      updatedAT: { type: Date, default: Date.now },
});

customersSchema.pre("save", function (next) {
      this.updatedAt = new Date();

      next();
});

const Customer = mongoose.model("Customers", customersSchema);
export default Customer;
