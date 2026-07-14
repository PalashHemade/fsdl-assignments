const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// POST /api/auth/register (Student Registration)
router.post('/register', async (req, res) => {
  try {
    const { prn, fullName, email, password } = req.body;
    
    let existingStudent = await Student.findOne({ $or: [{ prn }, { email }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with given PRN or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = new Student({ prn, fullName, email, password: hashedPassword });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body; // role can be passed from frontend, or we detect it

    if (role === 'admin') {
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ message: 'Invalid admin credentials' });
      
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid admin credentials' });

      const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, role: 'admin', user: { id: admin._id, name: admin.name, email: admin.email } });
    } else {
      // Default to student login
      // Login using email or PRN as username
      const student = await Student.findOne({ $or: [{ email }, { prn: email }] }).populate('division');
      if (!student) return res.status(400).json({ message: 'Invalid student credentials' });

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid student credentials' });

      const token = jwt.sign({ id: student._id, role: 'student' }, JWT_SECRET, { expiresIn: '1d' });
      return res.json({ 
        token, 
        role: 'student', 
        user: { 
          id: student._id, 
          fullName: student.fullName, 
          prn: student.prn, 
          email: student.email,
          division: student.division
        } 
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
