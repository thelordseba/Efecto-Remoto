const server = require("express").Router();
const { User } = require("./db.js");

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, HOST, secretJWT } = process.env;

const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  BearerStrategy = require("passport-http-bearer").Strategy;

const getOneByFacebookId = async (facebookId) => {
  try {
    const user = User.findOne({
      where: { facebookId },
    });
    return user;
  } catch {
    (error) => error;
  }
};

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: `${HOST}auth/login/facebook/callback`,
      profileFields: ["id", "email", "displayName", "first_name", "last_name"],
      session: false, // Le estamos diciendo a FB "esta estrategia no es para guardar en la sesión"
    },
    async function (_accessToken, _refreshToken, profile, done) {
      let user = await getOneByFacebookId(profile.id);
      if (!user)
        try {
          user = await User.create({
            userName: profile.username,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.email,
            isAdmin: false,
            facebookId: profile.id,
          });
        } catch (err) {
          console.error(err);
          done(err);
        }
      const {
        id,
        userName,
        firstName,
        lastName,
        email,
        isAdmin,
        facebookId,
      } = user; // si no mandamos el usuario desestructurado, JWT no sabe serializar, entonces se rompe.
      return done(null, {
        id,
        userName,
        firstName,
        lastName,
        email,
        isAdmin,
        facebookId,
      });
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, secretJWT, (err, user) => {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
