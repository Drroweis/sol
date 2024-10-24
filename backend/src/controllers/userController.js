import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        walletBalances: user.walletBalances,
        spinsLeft: user.spinsLeft,
        referralCode: user.referralCode,
        referralCount: user.referralCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if username is already taken
    const existingUser = await User.findOne({ username, _id: { $ne: user._id } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    user.username = username;
    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        walletBalances: user.walletBalances,
        spinsLeft: user.spinsLeft,
        referralCode: user.referralCode,
        referralCount: user.referralCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};