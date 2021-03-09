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