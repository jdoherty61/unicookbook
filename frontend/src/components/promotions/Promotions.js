import React from 'react'
import Container from 'react-bootstrap/Container';
import { Button, Card } from "react-bootstrap";
import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GiCook } from "react-icons/gi";
import { FiList } from "react-icons/fi";
import colorScheme from "../../styles/mainColorPallete";

//https://www.google.com/search?q=tescos+icon&rlz=1C1CHBF_en-GBGB923GB923&sxsrf=ALeKk03KpCk8FAyYyNmSHWYlb3bzpjnn8Q:1614289848764&tbm=isch&source=iu&ictx=1&fir=KV-2IZgTGvIcnM%252C4ZVe1P0ZVq8V9M%252C_&vet=1&usg=AI4_-kQPEOvuD44bRRtWFzz6mkeajg1_QQ&sa=X&ved=2ahUKEwjk1f-ngobvAhXTtHEKHSAlDA0Q9QF6BAgNEAE&biw=1064&bih=1061#imgrc=OAaQEcP3DmRkhM
//https://www.google.com/search?q=sainsburyspng&tbm=isch&ved=2ahUKEwiE6bOLg4bvAhVG0uAKHTzuDFYQ2-cCegQIABAA&oq=sainsburyspng&gs_lcp=CgNpbWcQAzIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjoECAAQQzoCCABQsCRYgDJg2DNoAXAAeACAAUWIAcQFkgECMTGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=iRw4YMSADsakgwe83LOwBQ&bih=1061&biw=1064&rlz=1C1CHBF_en-GBGB923GB923#imgrc=bwwEeDhuGbFLqM
//https://freebiesupply.com/logos/spar-logo-2/

//https://www.google.com/search?q=tescos+recipe&rlz=1C1CHBF_en-GBGB923GB923&sxsrf=ALeKk01fEQwi_eBNv20Nelf7ETnyAARoHg:1614290392718&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjz_K-rhIbvAhXhSxUIHXCICGwQ_AUoAnoECBcQBA&biw=1064&bih=997#imgrc=m1G-Tw8heiFRHM
//https://www.google.com/search?q=tescos+recipe&rlz=1C1CHBF_en-GBGB923GB923&sxsrf=ALeKk01fEQwi_eBNv20Nelf7ETnyAARoHg:1614290392718&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjz_K-rhIbvAhXhSxUIHXCICGwQ_AUoAnoECBcQBA&biw=1064&bih=997#imgrc=YtHNS55hkmqikM


//All of the above images were saved in main promotion directory folder. 
import tesco from './tescos.png';
// import spar from './spar.png';
// import sainsburys from './sainsburys';

import meal from './tescosmeal.jpg';

const PromotionCard = () => {
    return (
        <Card>
        <div style={{ display: "flex" }}>
          <div>
            <img
              src={tesco} 
              alt="new"
              style={{
                height: 40,
                width: 40,
                border: "1px solid #33e",
                borderRadius: 100,
                margin: 5,
                alignSelf: "center",
              }}
            />
          </div>
          <div>
            <Card.Title style={{ marginTop: 5, marginBottom: 5, fontSize: 20 }}>
              tescos
            </Card.Title>
            <Card.Subtitle
              style={{ marginBottom: 0, fontSize: 15 }}
              className="mb-2 text-muted"
            >
              Tesco's Belfast Area
            </Card.Subtitle>
          </div>
        </div>
        <Card.Img style={{
          height: 300,
          width: 325,
          alignSelf: 'center'
        }} variant="top" src={meal} />
        <Card.Body style={{ padding: 10 }}>
          <Card.Title style={{ display: "flex" }}>
            <div>Chicken Dish</div>
            <div style={{ right: 10, position: "absolute", color: "red" }}>
              £5.50
            </div>
          </Card.Title>
          <Card.Text>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <AiOutlineClockCircle
                  style={{ fill: colorScheme.blue }}
                  size={30}
                />
                5 mins
              </div>
              <div>
                <GiCook style={{ fill: "black" }} size={30} />
               easy
              </div>
              <div>meal: Dinner</div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    );
};

export const Promotions = () => {
    return (
        <Container>
        <div style={{ marginTop: 10, padding: 10 }}>
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            Three picks of the week
          </h2>
        </div>
        <PromotionCard/>
        </Container>
    );
};

export default Promotions;
