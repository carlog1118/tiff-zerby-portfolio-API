const express = require("express");
const authRouter = express.Router();
const AuthService = require("./auth-service");
const jsonParser = express.json();

authRouter.route("/api/login").post(jsonParser, (req, res /*,next*/) => {
  const { user_name, password } = req.body;
  const loginUser = { user_name, password };
  const knexInstance = req.app.get("db");

  AuthService.getUserWithUserName(knexInstance, loginUser.user_name).then(
    (dbUser) => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect username or password.",
        });

      return AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      ).then((compareMatch) => {
        if (!compareMatch)
          return res.status(400).json({
            error: "Incorrect username or password.",
          });
        console.log('log in success')
        const sub = dbUser.user_name;
        const payload = { user_id: dbUser.id };
        res.send({
          authToken: AuthService.createJwt(sub, payload),
        });
      });
    }
  );
  
});

module.exports = authRouter;
