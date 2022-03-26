const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["product_name"]
      }
    ]
  })
  .then(data => res.json(data))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ["product_name"]
      }
    ]
  })
  .then(data => {
    if (!data) {
      res.status(400).json({message: "No category found with this id"});
      return;
  }
    res.json(data)}
    )
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  const categoryName = req.body.category_name;
  Category.create({
      category_name: categoryName
  })
  .then(data => {
    res.json(data);
    console.log("Successfully added new category "+req.body.category_name);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(data => {
    res.json(data);
    console.log("Successfully updated category with ID "+req.params.id+" to "+req.body.category_name);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.json(data);
    console.log("Successfully deleted category "+req.params.id);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
