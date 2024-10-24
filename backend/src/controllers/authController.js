import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { validateRegistration, validateLogin } from '../validators/auth.js';

export const register = async (req, res) => {
  try {
    const { email, password, username } = validateRegistration(req.body);
    
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email or username already exists' 
      });
    }

    const user = new User({ email, password, username });
    user.generateReferralCode();
    await user.save();

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        walletBalances: user.walletBalances,
        spinsLeft: user.spinsLeft
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = validateLogin(req.body);
    
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        walletBalances: user.walletBalances,
        spinsLeft: user.spinsLeft
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};