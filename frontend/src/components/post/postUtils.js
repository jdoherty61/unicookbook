//This file is dedicated to the utils related to the posts/recipes. 

//This takes in the difficulty and converts it to a user friendly text as opposed to capitals.
// The reason being for it initially being capitals is to allow it to be converted to somewhat ENUM in the future
//Capitals is also considered a CONSTANT in JS and they will always stay the same.

const convertDifficultyToUserFriendlyText = (difficulty) => {
    switch(difficulty) {
      case 'EASY':
      return 'Easy';
      case 'MODERATE':
        return 'Moderate';
      case 'DIFFICULT': 
      return 'Difficult';
     default: 
      return '';
    }
  };

  const convertMealToUserFriendlyText = (meal) => {
    switch(meal) {
      case 'BREAKFAST':
      return 'Breakfast';
      case 'LUNCH':
        return 'Lunch';
      case 'DINNER': 
      return 'Dinner';
      case 'SNACK':
        return 'Snack';
     default: 
      return '';
    };
  };

  
  export {
      convertDifficultyToUserFriendlyText,
      convertMealToUserFriendlyText
  }