const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Action = require("../models/Action");
const calculateEcoScore = require("../utils/calculateEcoScore");
const validateLifestyleData = require("../utils/validateLifestyleData");

const register = async (req, res, next) => {
  try {
    const { username, email, password, lifestyleData } = req.body;

    if (!username || !email || !password || !lifestyleData) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validateLifestyleData(lifestyleData)) {
      return res
        .status(400)
        .json({ error: "All lifestyle data fields are required" });
    }

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    }).exec();

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const ecoScore = calculateEcoScore(lifestyleData, 0);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      ecoScore,
      lifestyleData,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const checkAuth = (req, res, next) => {
  return res.status(200).json({ message: "Authorized" });
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { email, oldPassword, newPassword, lifestyleData } = req.body;

    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (email && email !== user.email) {
      const emailTaken = await User.findOne({ email }).exec();
      if (emailTaken) {
        return res.status(400).json({ error: "Email is already taken" });
      }
      user.email = email;
    }

    if (oldPassword && newPassword) {
      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isOldPasswordValid) {
        return res.status(400).json({ error: "Old password is incorrect" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (lifestyleData) {
      if (!validateLifestyleData(lifestyleData)) {
        return res
          .status(400)
          .json({ error: "All lifestyle data fields are required" });
      }

      user.lifestyleData = lifestyleData;

      const emissionsSaved = await user.actionsCompleted.reduce(
        async (total, action) => {
          const actionData = await Action.findById(action.actionId);
          if (!actionData) return total;
          return total + actionData.emissionsSaved;
        },
        0
      );

      user.ecoScore = calculateEcoScore(user.lifestyleData, emissionsSaved);
    }

    await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, checkAuth, updateUser, getUser };
