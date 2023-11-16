// models/employee.mjs
import mongoose from 'mongoose';


const employeeSchema = new mongoose.Schema({
  name: String,
  address: String,
  phonenumber: String,
  email: String,
  position: String,
  avatarUrl:String,
  isVerified: Boolean,
  salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
