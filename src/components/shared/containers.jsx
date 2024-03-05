import styled from 'styled-components';

// applies part of a style sheet based on a media query
export const media = {
  // if the screen width is 480 pixels or less, apply a provided style
  xs: (styles) => `
    @media only screen and (max-width: 480px) {
      ${styles}
    }
  `,
};

export const Grid = styled.div``;

// Cols inside this Row will follow CSS flex rules,
// and will wrap when the screen drops below a certain width
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ProductModuleRow = styled.div`
  display: flex;
  flex-flow: row;
  overflow: hidden;
`;

// if a Col has a collapse attribute equal to "xs" (as a string),
// the styles on line 24 will be applied when the screen is narrower than 480px
export const Col = styled.div`
  flex: ${(props) => props.size};
  ${(props) => props.collapse && media[props.collapse](`
    // add style effects for mobile format
  `)};
`;

// Grid contains Rows which contains Cols
// Source: https://medium.com/swlh/create-a-responsive-grid-with-react-flexbox-styled-components-f7a55f607480

export const Card = styled.div`
  flex: ${(props) => props.size};
  margin: 0 1rem 1rem 0;
  border: 1px solid grey
  ${(props) => props.collapse && media[props.collapse](`
    // add style effects for mobile format
  `)};
`;

export const Container = styled.div`
position: relative;
width: 300px;
`;

export const ActionButton = styled.button`
  type: 'button';
  color: white;
  text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0 10px;
  margin: 10px;
  font-size: 2em;
`;

export const StyledImage = styled.img`
  width:100%;
  border: 0 1px solid grey;
`;
