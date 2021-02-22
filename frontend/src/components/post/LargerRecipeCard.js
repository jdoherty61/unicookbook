import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import colorScheme from "../../styles/mainColorPallete";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImageHeader,
  CardText,
  CardTitle,
} from "styled-card-component";
import { AiOutlineClockCircle } from "react-icons/ai";


const StyledCard = styled(Card)`
  height: 160px;
  width: 115px;
  background-color: ${colorScheme.pale};
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

export const LargerRecipeCard = ({recipe}) => {
    return (
        <Link to={`/posts/${recipe._id}`}>
        <StyledCard key={recipe.id}>
          <StyledImage src={`../../../../${recipe.image}`} />
          <StyledCardBody>
            <StyledCardText>
              {recipe.title}
              </StyledCardText>
              <StyledCardText>
              
              £{recipe.totalPrice}
              <AiOutlineClockCircle style={{ fill: colorScheme.blue, paddingLeft: 10, paddingTop: 10}} size={25} />{recipe.effortTime}
              </StyledCardText>
  
            {/* <CardFooter>
              {recipe.totolPrice}
              {recipe.effortTime}
            </CardFooter> */}
          </StyledCardBody>
        </StyledCard>
        </Link>
    )
}

export default LargerRecipeCard;
