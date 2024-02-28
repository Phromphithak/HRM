import { Employee } from "../db/models/employee.mjs";

// Endpoint to fetch attendance data
export const attendance = async (req, res) => {
    try {
      // Fetch all employees with attendance information
      const employees = await Employee.find({}, 'personalInformation employmentInformation');
  
      // Map employee data to the desired format for attendance information
      const attendanceData = employees.map((employee) => ({
        _id: employee._id,
        employeeId: employee._id,
        firstName: employee.personalInformation.firstName,
        lastName: employee.personalInformation.lastName,
        attendanceStatus: getAttendanceStatus(employee.employmentInformation),
        reason: getReason(employee.employmentInformation),
      }));
  
      res.status(200).json(attendanceData);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Helper function to get attendance status based on check-in, leave, or late information
  const getAttendanceStatus = (employmentInformation) => {
    if (employmentInformation.checkInTime) {
      return 'เช็คชื่อ'; // Checked in
    } else if (employmentInformation.leaveHistory && employmentInformation.leaveHistory.length > 0) {
      return 'ลา'; // On leave
    } else if (employmentInformation.lateHistory && employmentInformation.lateHistory.length > 0) {
      return 'มาสาย'; // Came late
    } else {
      return 'ขาด'; // Absent
    }
  };  
  
  // Helper function to get reason based on leave or late information
  const getReason = (employmentInformation) => {
    if (employmentInformation.leaveHistory && employmentInformation.leaveHistory.length > 0) {
        return employmentInformation.leaveHistory[0].reason;
    } else if (employmentInformation.lateHistory && employmentInformation.lateHistory.length > 0) {
        return `มาสาย ${employmentInformation.lateHistory[0].lateTime} นาที`;
    } else {
        return '';
    }
};


// บันทึกข้อมูลการขาดงาน
export const recordAbsence = async (req, res) => {
    try {
        const { employeeId, date, reason } = req.body;

        // ค้นหาพนักงาน
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // เพิ่มข้อมูลการขาดงาน
        employee.employmentInformation.leaveHistory.push({
            startDate: date,
            endDate: date,
            reason: reason,
        });

        // บันทึกการเปลี่ยนแปลง
        await employee.save();

        res.status(200).json({ message: 'Absence recorded successfully' });
    } catch (error) {
        console.error('Error recording absence:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// บันทึกข้อมูลการลา
export const recordLeave = async (req, res) => {
    try {
        const { employeeId, startDate, endDate, leaveType, reason } = req.body;

        // ค้นหาพนักงาน
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // เพิ่มข้อมูลการลา
        employee.employmentInformation.leaveHistory.push({
            startDate,
            endDate,
            leaveType,
            reason,
        });

        // บันทึกการเปลี่ยนแปลง
        await employee.save();
        console.log('Received check-in data:', req.body);
        res.status(200).json({ message: 'Leave recorded successfully' });
    } catch (error) {
        console.error('Error recording leave:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// บันทึกข้อมูลการมาสาย
export const recordLate = async (req, res) => {
    try {
        const { employeeId, date, lateTime } = req.body;

        // ค้นหาพนักงาน
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // เพิ่มข้อมูลการมาสาย
        employee.employmentInformation.lateHistory.push({
            date,
            lateTime,
        });

        // บันทึกการเปลี่ยนแปลง
        await employee.save();

        res.status(200).json({ message: 'Late recorded successfully' });
    } catch (error) {
        console.error('Error recording late:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Check-in function
export const checkIn = async (req, res) => {
    try {
        const { employeeIds, checkInTime, attendanceStatus, reason } = req.body;
        console.log('Received check-in data:', req.body);

        // Check if employeeIds is an array
        if (!Array.isArray(employeeIds) || employeeIds.length === 0) {
            return res.status(400).json({ error: 'Invalid employeeIds' });
        }

        // Loop through each employeeId and perform check-in
        for (const employeeId of employeeIds) {
            // Find employee by ID
            const employee = await Employee.findById(employeeId);

            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }

            // Validate checkInTime
            const checkInDate = new Date(checkInTime);
            if (isNaN(checkInDate.getTime())) {
                return res.status(400).json({ error: 'Invalid checkInTime' });
            }

            // Check if checkInTime is for the current day
            const today = new Date().toISOString().split('T')[0];
            const checkInDateString = checkInDate.toISOString().split('T')[0];

            // Check if already checked in on the current day
            if (employee.employmentInformation.checkInTime && checkInDateString === today) {
                return res.status(400).json({ error: 'Employee already checked in for today' });
            }

            // Set check-in information only if checkInTime is not already set
            employee.employmentInformation.checkInTime = checkInDate;

            // Add attendance history
            employee.employmentInformation.attendanceHistory.push({
                date: new Date(),
                status: attendanceStatus,
                reason: reason,
                checkInTime: checkInDate,
            });

            // Save changes
            await employee.save();
        }

        res.status(200).json({ message: 'Check-in recorded successfully' });
    } catch (error) {
        console.error('Error recording check-in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};