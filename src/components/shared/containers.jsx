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
