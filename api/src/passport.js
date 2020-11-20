const server = require("express").Router();
const { User } = require("./db.js");

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, HOST, secretJWT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  BearerStrategy = require("passport-http-bearer").Strategy,
  GoogleStrategy = require('passport-google-oauth20').Strategy
  
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

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//   passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//       done(err, user);
//     });
//   }); Esto es para una estrategia de sesión, no sirve para la estrategia de JWT

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${HOST}auth/login/google/callback`
  },
  
  function(accessToken, refreshToken, user, done) {
    //info del perfil para checkear si el usuario esta registrado en db
    User.findOrCreate({ googleId: user.id }, function (err, user) {
      return done(err, user);
    });
  }
));

module.exports = passport;
