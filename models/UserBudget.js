const mongoose = require("mongoose");

//Creating a schema based off the user budget in order to maintain a structure.

const UserBudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  studentFinanceIncome: {
    type: Number,
    default: null,
  },
  income: { type: Array, default: [] },
  spending: { type: Array, default: [] },
  duration: {
      type: String,
      required: true,
      default: "MONTHLY"
  }
//   date: {
//     type: Date,
//     default: Date.now,
//   },
});

module.exports = UserBudget = mongoose.model("userBudget", UserBudgetSchema);
