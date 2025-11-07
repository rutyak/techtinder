const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: isProduction
        ? `${process.env.BASE_URL}/auth/google/callback`
        : `${process.env.BASE_URL_LOCAL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile?.emails?.[0]?.value });
        const name = profile?.displayName?.split(" ");
        if (!user) {
          user = await User.create({
            googleId: profile?.id,
            firstname: name[0],
            lastname: name[1],
            email: profile?.emails?.[0]?.value,
            profilePic: profile?.photos?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
