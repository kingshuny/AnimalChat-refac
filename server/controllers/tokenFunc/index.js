require("dotenv").config()
const { sign, verify } = require("jsonwebtoken")

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1days" })
  },
  //   generateRefreshToken: (data) => {
  //     return sign(data, process.env.REFRESH_SECRET, { expiresIn: "5s" })
  //   },
  //   sendRefreshToken: (data) => {
  //     res.cookie("refreshToken", refreshToken, {
  //       HttpOnly: true,
  //     })
  //   },

  sendAccessToken: (res, accessToken, data) => {
    res.cookie("jwt", accessToken, {
      HttpOnly: true,
    })
    res
      .status(200)
      .json({ data: { accessToken: accessToken, data: data }, message: "ok" })
  },

  //   resendAccessToken: (res, accessToken) => {
  //     res.json({ accessToken, message: "ok" })
  //   },

  isAuthorized: (req) => {
    //console.log(req.headers)

    const authorization = req.headers.cookie
    if (!authorization) {
      return null
    }
    //const token = authorization.split(' ')[1];
    const token = authorization.split("=")[1].split(",")[0]
    //console.log(token)
    try {
      return verify(token, process.env.ACCESS_SECRET)
    } catch (err) {
      return null
    }
  },

  //   checkRefreshToken: (refreshToken) => {
  //     try {
  //       return verify(refreshToken, process.env.REFRESH_SECRET)
  //     } catch (err) {
  //       // return null if refresh token is not valid
  //       return null
  //     }
  //   },
}
