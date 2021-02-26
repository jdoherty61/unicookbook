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
    number: {
      type: Number,
      required: true,
      default: 1
    },
    timescale: {
      type: String,
      required: true,
      default: "MONTHLY"
    }
  },
  totalBudget: {          // Front end will calculate this, and then push up to database. This will be easier when reused in certain areas of application.
    type: Number,
    default: null
  },
  totalIncome: {
    type: Number,
    default: null
  },
  totalSpending: {
    type: Number,
    default: null
  },
  isCustom: {
    type: Boolean,
    default: false
  }
//   date: {
//     type: Date,
//     default: Date.now,
//   },
});

module.exports = UserBudget = mongoose.model("userBudget", UserBudgetSchema);
