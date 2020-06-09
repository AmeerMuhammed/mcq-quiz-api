const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const router = express.Router()
const controller = require('./controllers/controller')
const User = require('./models/User')
require('dotenv').config()

let apikeyGen = ""

router.get('/index/:id',controller.renderIndex)
router.get('/',controller.getQuestions)
router.get('/:count',controller.getQuestions)
router.post('/',controller.addQuestions)
router.put('/',controller.updateQuestion)
router.delete('/',controller.deleteQuestion)
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/index/'+apikeyGen);
  });
  
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
        User.findOne({'googleId': profile.id }, 
        function(err, user) { 
          if (user){ apikeyGen = user.apikey }
          if (err) { return done(err) }
        if (!user) {
            apikeyGen = controller.createHash() 
            user = new User({
                name: profile.displayName,
                googleId: profile.id,
                apikey: apikeyGen
            });
            user.save(function(err) {
                if (err) console.log(err)
                return done(err, user)
            })
        } else {
            return done(err, user);
        }
        })
        passport.serializeUser(function(user, done) {
            done(null, user);
          })
    }
))

module.exports = router