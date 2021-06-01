"use strict";

const Chance      = require("chance"),
      chance      = new Chance();

const md5 = require('md5');


module.exports = {
  generateRandomUser: () => {
    // const gender    = chance.gender();
    // const firstName = chance.first({gender: gender});
    // const lastName  = chance.last();
    // const userName  = firstName + " " + lastName;
    
    // let userHandle = "@";
    // if (Math.random() > 0.5) {
    //   let prefix    = chance.prefix({gender: gender});
    //   prefix = prefix.replace(".", "");
    //   userHandle += prefix
    // }

    // userHandle += lastName;

    // if (Math.random() > 0.5) {
    //   const suffix = Math.round(Math.random() * 100);
    //   userHandle += suffix;
    // }
   
    // const avatars = {
    
      // Female: ["https://i.imgur.com/nlhLi3I.png","https://i.imgur.com/z5LNkkB.png","https://i.imgur.com/v0JXau2.png","https://i.imgur.com/lRUnDgU.png", "https://i.imgur.com/3GvwNBf.png"],
      // Male: ["https://i.imgur.com/73hZDYK.png","https://i.imgur.com/5fUVPRP.png","https://i.imgur.com/DVpDmdR.png","https://i.imgur.com/2WZtOD6.png", "https://i.imgur.com/ilT4JDe.png"]
    
    // }

    const avatars = [
      ""
    ]
    
    const avatarArray = ["https://res.cloudinary.com/davik/image/upload/v1622510910/tweeter/kramer-icon_z2q2i6.png", "https://res.cloudinary.com/davik/image/upload/v1622510904/tweeter/jerry-icon_dk79lg.png", "https://res.cloudinary.com/davik/image/upload/v1622510899/tweeter/george-icon_hwz4ra.png", "https://res.cloudinary.com/davik/image/upload/v1622510891/tweeter/elaine-icon_l6tsbk.png"]
    const userAvatar = avatarArray[Math.floor(Math.random()*avatarArray.length)]
  

    return {
      name: "Cosmo Kramer",
      handle: "@kraaamer",
      avatars: userAvatar//["https://res.cloudinary.com/davik/image/upload/v1622510910/tweeter/kramer-icon_z2q2i6.png"]
    };
  }
};