import React from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
export const Search = () => {
  return (
    <Container>
      <div style={{ marginTop: 20, padding: 10 }}>
        <h2 style={{ color: "white", fontWeight: "bold" }}>
          What are you cooking today?
        </h2>
        <InputGroup style={{ marginTop: 25 }} className="mb-3">
          <FormControl
            style={{
              borderRadius: "20px 0px 0px 20px",
              boxShadow: "0px -2px 6px 1px #c05a2e",
            }}
            placeholder="Search by title"
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              style={{
                borderRadius: "0px 20px 20px 0px",
                boxShadow: "0px -2px 6px 1px #c05a2e",
              }}
            >
              <i class="fas fa-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>

      <div style={{marginTop: 100}}>
      <Button  size="lg" block >Search By Your Preferences</Button>
      <Button  size="lg" block>Search By Your Uni</Button>
      </div>
      <div style={{marginTop: 100}}>
        <h4 style={{ color: "white" }}>Category</h4>
        <Button style={{ width: 80, margin: 1 }}>
          <i class="fas fa-apple-alt"></i>
          <div style={{ position: "absolute" }}>Breakfast</div>
        </Button>
        <Button style={{ width: 80, margin: 1 }}>
          <i class="fas fa-bacon"></i>
          <div style={{ position: "absolute" }}>Lunch</div>
        </Button>
        <Button style={{ width: 80, margin: 1 }}>
          <i class="fas fa-drumstick-bite"></i>
          <div style={{ position: "absolute" }}>Dinner</div>
        </Button>
        <Button style={{ width: 80, margin: 1 }}>
          <i class="fas fa-cookie"></i>
          <div style={{ position: "absolute" }}>Snack</div>
        </Button>
      </div>
    </Container>
  );
};

export default Search;
