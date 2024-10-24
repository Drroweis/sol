import User from '../models/User.js';

const PRIZES = {
  BTC: { min: 0.0001, max: 0.001 },
  MAJOR: { min: 1, max: 10 },
  USDT: { min: 1, max: 100 },
  USDC: { min: 1, max: 100 },
  STAR: { min: 10, max: 100 },
  GBD: { min: 1, max: 50 },
  NOT: { min: 1, max: 20 }
};

const SPIN_COOLDOWN = 5 * 60 * 1000; // 5 minutes

export const spin = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.spinsLeft <= 0) {
      const timeElapsed = Date.now() - user.lastSpinTime;
      if (timeElapsed < SPIN_COOLDOWN) {
        return res.status(400).json({
          message: 'No spins left',
          recoveryTime: SPIN_COOLDOWN - timeElapsed
        });
      }
      user.spinsLeft = 10; // Reset spins after cooldown
    }

    // Select random prize
    const prizeTypes = Object.keys(PRIZES);
    const selectedPrize = prizeTypes[Math.floor(Math.random() * prizeTypes.length)];
    const { min, max } = PRIZES[selectedPrize];
    const amount = Math.random() * (max - min) + min;

    // Update user's wallet
    user.walletBalances[selectedPrize] += Number(amount.toFixed(8));
    user.spinsLeft -= 1;
    user.lastSpinTime = Date.now();

    await user.save();

    res.json({
      prize: {
        type: selectedPrize,
        amount: Number(amount.toFixed(8))
      },
      spinsLeft: user.spinsLeft,
      walletBalances: user.walletBalances
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};