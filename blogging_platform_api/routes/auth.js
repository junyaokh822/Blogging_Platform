const { User } = require("../models");

router.get("/current_user", async (req, res) => {
    if (req.session.userId) {
      const user = await User.findByPk(req.session.userId);
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } else {
      return res.status(401).json({user: null})
    }
  });