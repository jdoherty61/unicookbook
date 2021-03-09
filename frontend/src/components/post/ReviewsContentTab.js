
import React, { useEffect, useState } from "react";
import { Card, InputGroup, Button, Modal, ListGroup } from "react-bootstrap"; //https://react-bootstrap.github.io/
import logo from "../../images/logo.png";

//This is for the reviews tab in the Post view. It is currently hard coded as there is no review functionality, but it shows the capabilities of
//this feature and potential use.

const ReviewsContentTab = () => {
    //hard coded to show what the potential of a reviews section will be 
    return (
      <div style={{ padding: 5 }}>
       <ListGroup>
       <ListGroup.Item>
       <div style={{ display: "flex" }}>
          <div>
            <img
              src={logo} //refactored to allow users to edit their profile pics
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
              Caoimhe Power
            </Card.Title>
            <Card.Subtitle
              style={{ marginBottom: 0, fontSize: 15 }}
              className="mb-2 text-muted"
            >
              Queen's University, Belfast
            </Card.Subtitle>
          </div>
          <div style={{ position: "absolute", right: 10, marginTop: 10 }}>
            <i style={{ color: "grey" }} class="fas fa-ellipsis-v fa-lg"></i>
            {/* will be for people who own the recipe */}
          </div>
        </div>
        <ListGroup.Item>Unreal! I got the same recipe from tescos for £2 cheaper. Love this thank you</ListGroup.Item>
       </ListGroup.Item>
    
       <ListGroup.Item>
       <div style={{ display: "flex" }}>
          <div>
            <img
              src={logo} //refactored to allow users to edit their profile pics
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
              Jenny Stevenson
            </Card.Title>
            <Card.Subtitle
              style={{ marginBottom: 0, fontSize: 15 }}
              className="mb-2 text-muted"
            >
              Queen's University, Belfast
            </Card.Subtitle>
          </div>
          <div style={{ position: "absolute", right: 10, marginTop: 10 }}>
            <i style={{ color: "grey" }} class="fas fa-ellipsis-v fa-lg"></i>
            {/* will be for people who own the recipe */}
          </div>
        </div>
        <ListGroup.Item>Love it</ListGroup.Item>
       </ListGroup.Item>
     </ListGroup>
    </div>
    )
    };

    export default ReviewsContentTab;