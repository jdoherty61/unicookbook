import React from 'react'; //https://reactjs.org/
import Container from 'react-bootstrap/Container'; //https://react-bootstrap.github.io/components
import LargerRecipeCard from "../post/LargerRecipeCard";

//https://www.google.com/search?q=tescos+icon&rlz=1C1CHBF_en-GBGB923GB923&sxsrf=ALeKk03KpCk8FAyYyNmSHWYlb3bzpjnn8Q:1614289848764&tbm=isch&source=iu&ictx=1&fir=KV-2IZgTGvIcnM%252C4ZVe1P0ZVq8V9M%252C_&vet=1&usg=AI4_-kQPEOvuD44bRRtWFzz6mkeajg1_QQ&sa=X&ved=2ahUKEwjk1f-ngobvAhXTtHEKHSAlDA0Q9QF6BAgNEAE&biw=1064&bih=1061#imgrc=OAaQEcP3DmRkhM
//https://www.google.com/search?q=sainsburyspng&tbm=isch&ved=2ahUKEwiE6bOLg4bvAhVG0uAKHTzuDFYQ2-cCegQIABAA&oq=sainsburyspng&gs_lcp=CgNpbWcQAzIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjoECAAQQzoCCABQsCRYgDJg2DNoAXAAeACAAUWIAcQFkgECMTGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=iRw4YMSADsakgwe83LOwBQ&bih=1061&biw=1064&rlz=1C1CHBF_en-GBGB923GB923#imgrc=bwwEeDhuGbFLqM
//https://freebiesupply.com/logos/spar-logo-2/

//https://www.google.com/search?q=tescos+recipe&rlz=1C1CHBF_en-GBGB923GB923&sxsrf=ALeKk01fEQwi_eBNv20Nelf7ETnyAARoHg:1614290392718&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjz_K-rhIbvAhXhSxUIHXCICGwQ_AUoAnoECBcQBA&biw=1064&bih=997#imgrc=m1G-Tw8heiFRHM
//https://www.google.com/search?q=tescos+recipe&rlz=1C1CHBF_en-GBGB923GB923&sxsrf=ALeKk01fEQwi_eBNv20Nelf7ETnyAARoHg:1614290392718&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjz_K-rhIbvAhXhSxUIHXCICGwQ_AUoAnoECBcQBA&biw=1064&bih=997#imgrc=YtHNS55hkmqikM


//All of the above images were saved in main promotion directory folder. 
import tesco from './tescos.png';
import spar from './spar.png';
import sainsburys from './sainsburys.png';

import meal from './tescosmeal.jpg';
import meal2 from './meal2.jpg';
import meal3 from './meal3.jpg';


const recipe1 = {
effortTime: 5,
image: `${meal}`,
meal: "DINNER",
ownerAvatar: `${tesco}`,
ownerName: "Tesco",
ownerUni: "Belfast Area",
title: "Chicken Dish",
totalPrice: 5.55
};

const recipe2 = {
  effortTime: 5,
  image: `${meal2}`,
  meal: "DINNER",
  ownerAvatar: `${spar}`,
  ownerName: "Spar",
  ownerUni: "Belfast Area",
  title: "Tomato and Basil Dish",
  totalPrice: 5.55
  };
  
const recipe3 = {
  effortTime: 5,
  image: `${meal3}`,
  meal: "DINNER",
  ownerAvatar: `${sainsburys}`,
  ownerName: "Sainsburys",
  ownerUni: "Belfast Area",
  title: "Rasp and Almond Dish",
  totalPrice: 5.55
  };

export const Promotions = () => {
    return (
        <Container>
        <div style={{ marginTop: 10, padding: 10 }}>
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            Three picks of the week
          </h2>
        </div>
        <div style={{display: 'flex', overflow: 'scroll'}}>
        <LargerRecipeCard recipe={recipe1}/>
        <LargerRecipeCard recipe={recipe2}/>
        <LargerRecipeCard recipe={recipe3}/>
        </div>


        </Container>
    );
};

export default Promotions;
