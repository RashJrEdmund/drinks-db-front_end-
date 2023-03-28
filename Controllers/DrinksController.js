const Drink = require("../database/drinks");

const getAllDrinks = async (req, res, next) => {
  const allDrinks = await Drink.findAll();
  res.send(allDrinks);
}

const createOneDrink = async (req, res, next) => {
  const{
    name,
    description,
    image_url,
    recipe,
    is_alcoholic,
  } = req.body;

  if (!name || !description || !image_url || !recipe) {
    res.send('{ Missing Drink Info }');
    return;
  }

  const newDrink = await Drink.create({
    name,
    description,
    image_url,
    recipe,
    is_alcoholic,
  });

  console.log('\n \n this newDrink', newDrink);

  res.send(newDrink);
}

const getOneDrink = async (req, res, next) => {
  const [drink] = await Drink.findAll({ // this to make sure the drink exits
    where: {
      id: +req.params.id
    }
  });
  if(!drink) {
    res.send(`DrinkID ${req.params.id} does not Exits`);
    return;
  }

  res.send(drink);
}

const putOneDrink = async (req, res, next) => {
  const [drink] = await Drink.findAll({ // this is to make sure that the drink even exits
    where: {
      id: +req.params.id
    }
  });
  if(!drink) {
    res.send(`DrinkID ${req.params.id} does not Exits`);
    return;
  }

  await Drink.update(req.body, {where: {
    id: req.params.id
  }})

  const overWrittenDrink = await Drink.findAll({where: { id: req.params.id}})
  res.send(overWrittenDrink)
}

const patchOneDrink = async (req, res, next) => {
  const [drink] = await Drink.findAll({ // this is to make sure that the drink even exits
    where: {
      id: +req.params.id
    }
  });
  if(!drink) {
    res.send(`DrinkID ${req.params.id} does not Exits`);
    return;
  }

 await Drink.update(req.body, { where: { id: req.params.id}})
 updatedDrink = await Drink.findAll( { where: { id: req.params.id } })
  res.send(updatedDrink);
}

const deleteOneDrink = async (req, res, next) => {
  await Drink.destroy({
    where: { id: +req.params.id }
  });
  res.send(`DrinkId ${req.params.id} dropped!`);
}

module.exports = {
  getAllDrinks,
  createOneDrink,
  getOneDrink,
  putOneDrink,
  patchOneDrink,
  deleteOneDrink
}