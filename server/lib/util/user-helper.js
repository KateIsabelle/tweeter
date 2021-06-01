"use strict";

module.exports = {
  generateRandomUser: () => {

    const characters = [
      {
        name: "Cosmo Kramer",
        handle: "@kraaamer",
        avatar: "https://res.cloudinary.com/davik/image/upload/v1622510910/tweeter/kramer-icon_z2q2i6.png"
      },
      {
        name: "Elaine Benes",
        handle: "@dancemachine",
        avatar: "https://res.cloudinary.com/davik/image/upload/v1622510891/tweeter/elaine-icon_l6tsbk.png"
      },
      {
        name: "Jerry Seinfeld",
        handle: "@manhands",
        avatar: "https://res.cloudinary.com/davik/image/upload/v1622510904/tweeter/jerry-icon_dk79lg.png"
      },
      {
        name: "George Costanza",
        handle: "@costanzaman",
        avatar: "https://res.cloudinary.com/davik/image/upload/v1622510899/tweeter/george-icon_hwz4ra.png"
      }
    ]

    const user = characters[Math.floor(Math.random()*characters.length)]

    return {
      name: user.name,
      handle: user.handle,
      avatars: user.avatar
    };
  }
};