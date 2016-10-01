module.exports = {
    facebookAuth : {
        clientID : '', //facebook app ID
        clientSecret : '', //your secret key
        callbackURL : 'http://localhost:3000/auth/facebook/callback', //callback url if granted permission
        profileFields: ['emails', 'displayName', 'name']
    }
}
