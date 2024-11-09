const Action = require("../models/Action");
const User = require("../models/User");
const calculateEcoScore = require("../utils/calculateEcoScore");

const getActions = async (req, res, next) => {
  try {
    const actions = await Action.find().exec();
    res.status(200).json(actions);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const completeAction = async (req, res, next) => {
  try {
    const { actionId } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const action = await Action.findById(actionId).exec();
    if (!action) {
      return res.status(404).json({ error: "Action not found" });
    }

    const actionCompleted = user.actionsCompleted.some(
      (completedAction) => completedAction.actionId.toString() === actionId
    );

    if (actionCompleted) {
      return res.status(400).json({ error: "Action already completed" });
    }

    user.actionsCompleted.push({ actionId });

    const actionIds = user.actionsCompleted.map(
      (completedAction) => completedAction.actionId
    );
    const actionsData = await Action.find({ _id: { $in: actionIds } }).exec();
    let emissionsSaved = actionsData.reduce((total, action) => {
      return total + action.CO2Saved;
    }, 0);

    if (!emissionsSaved || emissionsSaved == NaN) {
      emissionsSaved = 0;
    }

    const newEcoScore = calculateEcoScore(user.lifestyleData, emissionsSaved);
    user.ecoScore = newEcoScore;

    await user.save();

    res.status(200).json({ message: "Action completed and ecoScore updated" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getActions,
  completeAction,
};
