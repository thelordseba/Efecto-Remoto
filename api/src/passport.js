const server = require("express").Router();
const { User, Product, Location } = require("./db.js");
const jwt = require("jsonwebtoken")
const { Op } = require("sequelize");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, HOST, secretJWT } = process.env;

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  FacebookStrategy = require("passport-facebook").Strategy,
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  BearerStrategy = require("passport-http-bearer").Strategy;

/// ESTRATEGIA LOCAL ///
passport.use(new LocalStrategy(
  {usernameField: "email", passwordField: "password", session: false},
  async (email, password, done) => {
    const user = await User.findOne({where: { email }})
      if (!user) { return done(null, false) }
      if (!user.verifyPassword(password)) { return done(null, false) }
      return done(null, user);
  })
)

/// ESTRATEGIA GOOGLE ///
const getOneByGoogleId = async (gmailId) => {
  try {
    const user = User.findOne({
      where: { gmailId }     
    });
    return user;
  } catch (error) {
    return error;
  }
};

const createOne = (firstName, lastName, email, isAdmin, gmailId) => {
  return new Promise((resolve, reject) => {
    User.create({ firstName, lastName, email, isAdmin, gmailId})
      .then((user) => {
        if (isAdmin) {
          user.isAdmin = isAdmin;
          user.save();
        }
        return user;
      })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};

passport.use(new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${HOST}/auth/login/google/callback`,
      session: false,
    },
    async (token, tokenSecret, profile, done) => {
      let user = await getOneByGoogleId(profile.id);
      if (!user) { 
        user = await User.findOne({where: {email: profile.emails[0].value}})
        if (!user) {
          user = await createOne(
            profile.name.givenName,
            profile.name.familyName,
            profile.emails[0].value,
            false,
            profile.id,
          );
          const location = await Location.create();
          await user.setLocation(location);
        };
      }
      const { id, firstName, lastName, email, isAdmin, gmailId } = user;
      return done(null, {
        id, firstName, lastName, email, isAdmin, gmailId
      });
    }
  )
);

/// ESTRATEGIA DE FACEBOOK ///
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
      callbackURL: `${HOST}/auth/login/facebook/callback`,
      profileFields: ["id", "email", "displayName", "first_name", "last_name"],
      scope: ["email"],
      session: false, // Le estamos diciendo a FB "esta estrategia no es para guardar en la sesión"
    },
    async function (_accessToken, _refreshToken, profile, done) {
      console.log(profile)
      let user = await getOneByFacebookId(profile.id);
      if (!user) {
        if (profile.emails[0].value) {
          user = await User.findOne({where: {email: profile.emails[0].value}})
        }
        try {
          user = await User.create({
            userName: profile.username,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            isAdmin: false,
            facebookId: profile.id,
          });
          
          const location = await Location.create();
          await user.setLocation(location);
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
      const { id, userName, firstName, lastName, email, isAdmin, facebookId } = user; // si no mandamos el usuario desestructurado, JWT no sabe serializar, entonces se rompe.
      return done(null, { id, userName, firstName, lastName, email, isAdmin, facebookId });
    }
  )
);

///

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, secretJWT, (err, user) => {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
