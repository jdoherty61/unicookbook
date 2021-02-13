const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const ShoppingList = require('../../models/ShoppingList');
const User = require('../../models/User');
const { json } = require('express');

// TODO: DELETE ONE RECIPE FROM THE LIST - COULD DO THIS BY REPOSTING THE SHOPPING LIST AGAIN WITHOUT THAT RECIPE OR PUT? OR DELETE? 


// @route   GET api/shoppingList/me
// @desc   get current users shopping list 
// @access  private
router.get('/me', auth, async (req, res) => {
    try {

        const shoppingList = await ShoppingList.findOne({user: req.user.id }).populate('user', 'list');

        if(!shoppingList){
            //or return empty array? - for front end purpose
          

            //return a created empty array - would prevent errors for the time being - needs re-evaluated in next iteration
            // let shoppingListFields = {};

            // shoppingListFields.user = req.user.id;
            newShoppingList = new ShoppingList({
              user: req.user.id
            });

            await newShoppingList.save();
            // return res.status(200).json({ msg: 'There is was no current shopping list for the user so default created'});
            res.json(newShoppingList);
        }
        
        res.json(shoppingList);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// // @route    PUT api/shoppingList/list
// // @desc     Add to shoppingList
// // @access   Private
router.put(
    '/list',
    auth,
    // check('Ingredients', 'Ingredient is required').notEmpty(),
    // check('Price', 'Price is required of this ingredeint').notEmpty(),

      async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
          //Finding the shopping list of the user
        const shoppingList = await ShoppingList.findOne({ user: req.user.id });
        
        // If there is no current shopping list
        if(!shoppingList) {
          newShoppingList = new ShoppingList({
            user: req.user.id
          });

          return await newShoppingList.save();
        }

        shoppingList.list.unshift(req.body);
  
        await shoppingList.save();
  
        res.json(shoppingList);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );

// // @route    DELETE api/shoppingList/list/:shoppinglist_id 
// // @desc     Deletes the !!ENTIRE!! shopping list
// // @access   Private
router.delete('/list/:shoppinglist_id', auth, async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findOne({ user: req.user.id });

    //Get the remove index
    const removeIndex = shoppingList.list.map(item => item.id).indexOf(req.params.shoppinglist_id);

    shoppingList.list.splice(removeIndex, 1);

    await shoppingList.save();

    res.json(shoppingList);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


module.exports = router;