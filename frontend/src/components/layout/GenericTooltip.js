import React, {useState} from 'react';
import { Button, Overlay, Popover } from "react-bootstrap";

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
          // container={ref.current}
        //   containerPadding={chosenPadding ? chosenPadding : 20}
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
