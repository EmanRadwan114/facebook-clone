import { User } from "../../database/models.js";

export const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
