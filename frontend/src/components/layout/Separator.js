import React from 'react'
import colorScheme from "../../styles/mainColorPallete";

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
