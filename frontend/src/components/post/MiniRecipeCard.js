import React from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components"; //https://styled-components.com/
import {
  Card,
  CardBody,
  CardImageHeader,
  CardText
} from "styled-card-component"; //https://www.npmjs.com/package/styled-card-component

import { AiOutlineClockCircle } from "react-icons/ai";
import colorScheme from "../../styles/mainColorPallete";

//  background-color: ${colorScheme.pale};
const StyledCard = styled(Card)`
  height: 160px;
  width: 115px;
  margin: 2px;
  box-shadow: 0px 1px 9px 1px ${colorScheme.shadow};
  border-radius: 10px;
`;

const StyledCardText = styled(CardText)`
  white-space: nowrap;
  font-size: 15px;
  text-overflow: ellipsis;
  overflow-y: hidden;
  margin-bottom: 0;
  overflow: hidden;
`;

const StyledCardBody = styled(CardBody)`
  padding: 5px;
  color: ${colorScheme.blue};
  font-weight: bold;
  
`;

const StyledImage = styled(CardImageHeader)`
width: 95%;
height: 100px;
margin: 5px;
margin-bottom: 0px;
border-radius: 5px;
align-self: center;
`;

const StyledCardPrice = styled(CardText)`
  white-space: nowrap;
  font-size: 15px;
  text-overflow: ellipsis;
  overflow-y: hidden;
  margin-bottom: 0;
  overflow: hidden;
  color: ${colorScheme.orange};
`;

//This component is for the recipe cards all over the application. Used for search results, profile etc.
export const MiniRecipeCard = ({recipe}) => {
    return (
        <Link to={`/posts/${recipe._id}`}>
        <StyledCard key={recipe.id}>
          <StyledImage src={`../../../../${recipe.image}`} />
          <StyledCardBody>
            <StyledCardText>
              {recipe.title}
              </StyledCardText>
              <StyledCardPrice>
              £{recipe.totalPrice}
              
              <span style={{ position: 'absolute', right: 0, fontSize: 12, color: 'grey', fontWeight: 'normal', paddingTop: 3}}>
              {recipe.effortTime} mins
              <AiOutlineClockCircle style={{ fill: colorScheme.blue, paddingBottom: 4}} size={20} />
              </span>
              </StyledCardPrice>
          </StyledCardBody>
        </StyledCard>
        </Link>
    )
}

export default MiniRecipeCard;
