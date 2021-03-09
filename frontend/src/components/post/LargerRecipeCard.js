import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImageHeader,
  CardText
} from "styled-card-component"; //https://www.npmjs.com/package/styled-card-component
import { AiOutlineClockCircle } from "react-icons/ai";

import colorScheme from "../../styles/mainColorPallete";

const StyledCard = styled(Card)`
  height: 325px;
  width: 220px;
  margin: 2px;
  box-shadow: 0px 1px 9px 1px ${colorScheme.shadow};
  border-radius: 10px;
`;

const StyledCardText = styled(CardText)`
  white-space: nowrap;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow-y: hidden;
  margin-bottom: 0;
  overflow: hidden;
`;

const StyledCardPrice = styled(CardText)`
  white-space: nowrap;
  font-size: 20px;
  text-overflow: ellipsis;
  overflow-y: hidden;
  margin-bottom: 0;
  overflow: hidden;
  color: ${colorScheme.orange};
`;

const StyledUniText = styled(CardText)`
  white-space: nowrap;
  font-size: 15px;
  text-overflow: ellipsis;
  overflow-y: hidden;
  margin-bottom: 0;
  overflow: hidden;
  width: 140px
`; 

const StyledCardBody = styled(CardBody)`
  padding: 5px;
  padding-top: 0px;
  color: ${colorScheme.blue};
  font-weight: bold;
  
`;

const StyledImage = styled(CardImageHeader)`
  width: 95%;
  height: 200px;
  margin: 5px;
  margin-top: 0px;
  margin-bottom: 0px;
  border-radius: 5px;
  align-self: center;
`;

//This for the recipe cards that were designed for the home screen. They are larger versions of the smaller recipe cards.
export const LargerRecipeCard = ({recipe}) => {
    return (
        <Link to={`/posts/${recipe._id}`}>
        <StyledCard key={recipe.id}>
        <div style={{ display: "flex" }}>
        
            <img
              src={recipe.ownerAvatar} //refactored to allow users to edit their profile pics
              alt="new"
              style={{
                height: 40,
                width: 40,
                border: `2px solid ${colorScheme.blue}`,
                borderRadius: 100,
                margin: 5,
                alignSelf: "center",
              }}
            />
            <div>
            <CardText style={{ marginTop: 5, marginBottom: 0, fontSize: 15, overflow: 'hidden' }}>
              {recipe.ownerName}
            </CardText>
            <StyledUniText
              style={{ marginBottom: 0, fontSize: 12 }}
              className="mb-2 text-muted"
            >
              {recipe.ownerUni}
            </StyledUniText>
            </div>
          
              </div>
          <StyledImage src={`../../../../${recipe.image}`} />
          <StyledCardBody>
            <StyledCardText>
              {recipe.title}
              </StyledCardText>
              <StyledCardPrice>
              £{recipe.totalPrice}
              
              <span style={{position: 'absolute', right: 0, padding: 5, fontSize: 15, color: 'grey', fontWeight: 'normal'}}>
              {recipe.effortTime} mins
              <AiOutlineClockCircle style={{ fill: colorScheme.blue, paddingBottom: 4}} size={25} />
              </span>
              </StyledCardPrice>
          </StyledCardBody>
        </StyledCard>
        </Link>
    );
};

export default LargerRecipeCard;
