const server = require('express').Router();
const { User, Review, Product } = require('../db.js');

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, HOST } = process.env;

const passport = require('passport'), FacebookStrategy = require('passport-facebook').Strategy;

const getOneByFacebookId = async (facebookId) => {
    try {
      const user = User.findOne({
        where: { facebookId },
        include: [{ model: Review, include: Product }],
      });
      return user;
    }
    catch {error => error};
};

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `${HOST}auth/facebook/callback`,
    profileFields: ["id", "emails", "displayName"],
},
    async function(accessToken, refreshToken, profile, done) {
        let user = await getOneByFacebookId(profile.id);
        if (!user)
          user = await createOne(
            profile.displayName,
            profile.emails,
            null,
            "GUEST",
            null,
            profile.id
          );
        const { id, name, email, isAdmin, status, createdAt, updatedAt } = user;
        return done(null, {
          id,
          name,
          email,
          isAdmin,
          status,
          createdAt,
          updatedAt,
        });
      }
    )
);
  
module.exports = passport;