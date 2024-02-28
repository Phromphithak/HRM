// models/employee.mjs
import mongoose from "mongoose";

const leaveHistorySchema = new mongoose.Schema({
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  reason: { type: String, required: false },
  
});

const payrollInformationSchema = new mongoose.Schema({
  salary: { type: Number, required: true },
  taxDeduction: { type: Number, required: true },
  socialSecurity: { type: Number, required: true },
  overtime: { type: Number, required: true },
  payHistory: [
    {
      socialSecurity: { type: Number, required: true },
      loanRepayment: {type: Number, require: true},
      taxDeduction: { type: Number, required: true },
      overtime: { type: Number, required: true },
      date: { type: Date, required: true },
      salary: { type: Number, required: true },
    },
  ],
});


const paymentInformationSchema = new mongoose.Schema({
  paymentDate: { type: Date, required: false },
  paymentMethod: { type: String, required: false },
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
  startDate: { type: Date, required: false },
  employmentType: { type: String, required: true },
  workSchedule: { type: String, required: false },
  lateTime : {type: String, require: true},
  leaveHistory: [leaveHistorySchema],
  checkInTime: { type: String, require: true },
  attendanceHistory:[{
    date:{type: Date, require:true},
    status:{type: String, require:true},
    reason:{type: String, require:true},
    checkInTime:{type: String, require:true},
  }]
});

const personalInformationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: false },
  nationalID: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  email: { type: String, required: false },
  image: { type: Buffer },
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

