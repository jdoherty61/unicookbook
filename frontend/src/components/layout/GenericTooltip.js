import React, {useState} from 'react';
import { Button, Overlay, Popover } from "react-bootstrap"; // Using bootstrap components https://react-bootstrap.github.io/

//This is a generic tooltip which is used to explain and guide the user for particular areas of the application which may be complicated to understand

export const GenericTooltip = ({title, subtitle, explanation, chosenPadding }) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    // const ref = useRef(null);
    // https://react-bootstrap.netlify.app/components/overlays/#tooltips
  
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };
  
    return (
      <div style={{chosenPadding}}>
        <Button style={{borderRadius: 100}} onClick={handleClick}><i class="fas fa-info"></i></Button>
  
        <Overlay
          show={show}
          target={target}
          placement="left"
        >
          <Popover id="popover-contained">
            <Popover.Title as="h3">{title}</Popover.Title>
            <Popover.Content>
              <strong>{subtitle}</strong> {explanation}
            </Popover.Content>
          </Popover>
        </Overlay>
      </div>
    )
};
export default GenericTooltip;
