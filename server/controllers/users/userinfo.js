const { user } = require("../../models")
const { animal } = require("../../models")
const { isAuthorized } = require("../tokenFunc")

module.exports = (req, res) => {
  //   console.log(req.query.serchAnimalInfo)
  const { serchAnimalInfo } = req.query
  console.log(serchAnimalInfo)

  animal
    .findAll({
      where: { userId: serchAnimalInfo },
    })
    .then((useranimaldata) => {
      //   console.log(useranimaldata[0].dataValues)
      if (!useranimaldata) {
        res.status(422).send("반려동물 없음")
      }

      res.status(222).send(useranimaldata[0].dataValues)
    })
}
