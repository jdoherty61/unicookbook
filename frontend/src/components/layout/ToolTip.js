import React, {useState} from 'react';
import { Button, Overlay, Popover } from "react-bootstrap";

export const ToolTip = () => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    // const ref = useRef(null);
    // https://react-bootstrap.netlify.app/components/overlays/#tooltips

  
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };
  
    return (
      <div style={{paddingLeft: 70}}>
        <Button style={{borderRadius: 100}} onClick={handleClick}><i class="fas fa-info"></i></Button>
  
        <Overlay
          show={show}
          target={target}
          placement="left"
          // container={ref.current}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Title as="h3">Custom Budget</Popover.Title>
            <Popover.Content>
              <strong>This will override your current budget calculation!</strong> You can set your own weekly budget here without calculations.
            </Popover.Content>
          </Popover>
        </Overlay>
      </div>
    )
};
export default ToolTip;
