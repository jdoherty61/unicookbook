import React from 'react'; //https://reactjs.org/
import colorScheme from "../../styles/mainColorPallete";

//created a componenet dedicated to a separator for information which can be reused all over the application!
export const Separator = () => {
    return (
        <div
        style={{
          borderBottom: `solid ${colorScheme.blue}`,
          marginBottom: 4,
          marginTop: 4,
          padding: 2,
        }}
      />
    );
};

export default Separator;
