const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../model/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile?.id,
            name: profile?.displayName,
            email: profile?.emails?.[0]?.value,
            profilePic: profile?.photos?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
