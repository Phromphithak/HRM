// models/employee.mjs
import mongoose from "mongoose";

const leaveHistorySchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
});

const payrollInformationSchema = new mongoose.Schema({
  salary: { type: Number, required: true },
  taxDeduction: { type: Number, required: true },
  socialSecurity: { type: Number, required: true },
  overtime: { type: Number, required: true },
  payHistory: [
    {
      socialSecurity: { type: Number, required: true },
      taxDeduction: { type: Number, required: true },
      overtime: { type: Number, required: true },
      date: { type: Date, required: true },
      salary: { type: Number, required: true },
    },
  ],
});


const paymentInformationSchema = new mongoose.Schema({
  paymentDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
});

const deductionsSchema = new mongoose.Schema({
  tax: { type: Number, required: true },
  socialSecurity: { type: Number, required: true },
  loanRepayment: { type: Number, required: true },
});

const specialWorkHistorySchema = new mongoose.Schema({
  bonus: { type: Number, required: true },
  allowance: { type: Number, required: true },
});

const adjustmentsSchema = new mongoose.Schema({
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  reason: { type: String, required: true },
});

const employmentInformationSchema = new mongoose.Schema({
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  employmentType: { type: String, required: true },
  workSchedule: { type: String, required: true },
  leaveHistory: [leaveHistorySchema],
});

const personalInformationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  nationalID: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
});

const employeeSchema = new mongoose.Schema({
  personalInformation: personalInformationSchema,
  employmentInformation: employmentInformationSchema,
  payrollInformation: payrollInformationSchema,
  paymentInformation: paymentInformationSchema,
  deductions: deductionsSchema,
  specialWorkHistory: specialWorkHistorySchema,
  adjustments: [adjustmentsSchema],
});

export const Employee = mongoose.model('employees', employeeSchema);

