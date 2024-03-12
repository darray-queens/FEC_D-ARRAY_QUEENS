/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

import { Row, Col } from '../shared/containers';

const { useState } = React;

const WideFieldset = styled.fieldset`
  width: 100%;
`;

const StylesDiv = styled.div`
  width: 300px;
`;

const StyledH2 = styled.h2`
  display: block;
  width: 100%;
`;

const StyledP = styled.p`
  display: block;
  width: 100%;
`;

function Characteristics({ factor, ID, setCharacteristics }) {
  const [selectionMeaning, setSelectionMeaning] = useState('none selected');

  const handleSelection = (event) => {
    const { value, id } = event.target;
    if (parseInt(value, 10) === 1) {
      if (factor === 'Size') {
        setSelectionMeaning('A size too small');
      } else if (factor === 'Width') {
        setSelectionMeaning('Too narrow');
      } else if (factor === 'Comfort') {
        setSelectionMeaning('Uncomfortable');
      } else if (factor === 'Quality') {
        setSelectionMeaning('Poor');
      } else if (factor === 'Length') {
        setSelectionMeaning('Runs Short');
      } else if (factor === 'Fit') {
        setSelectionMeaning('Runs tight');
      }
    }
    if (parseInt(value, 10) === 2) {
      if (factor === 'Size') {
        setSelectionMeaning('½ a size too small');
      } else if (factor === 'Width') {
        setSelectionMeaning('Slightly narrow');
      } else if (factor === 'Comfort') {
        setSelectionMeaning('Slightly uncomfortable');
      } else if (factor === 'Quality') {
        setSelectionMeaning('Below average');
      } else if (factor === 'Length') {
        setSelectionMeaning('Runs slightly short');
      } else if (factor === 'Fit') {
        setSelectionMeaning('Runs slightly tight');
      }
    }
    if (parseInt(value, 10) === 3) {
      if (factor === 'Size') {
        setSelectionMeaning('Perfect');
      } else if (factor === 'Width') {
        setSelectionMeaning('Perfect');
      } else if (factor === 'Comfort') {
        setSelectionMeaning('Ok');
      } else if (factor === 'Quality') {
        setSelectionMeaning('What I expected');
      } else if (factor === 'Length') {
        setSelectionMeaning('Perfect');
      } else if (factor === 'Fit') {
        setSelectionMeaning('Perfect');
      }
    }
    if (parseInt(value, 10) === 4) {
      if (factor === 'Size') {
        setSelectionMeaning('½ a size too big');
      } else if (factor === 'Width') {
        setSelectionMeaning('Slightly wide');
      } else if (factor === 'Comfort') {
        setSelectionMeaning('Comfortable');
      } else if (factor === 'Quality') {
        setSelectionMeaning('Pretty great');
      } else if (factor === 'Length') {
        setSelectionMeaning('Runs slightly long');
      } else if (factor === 'Fit') {
        setSelectionMeaning('Runs slightly long');
      }
    }
    if (parseInt(value, 10) === 5) {
      if (factor === 'Size') {
        setSelectionMeaning('A size too wide');
      } else if (factor === 'Width') {
        setSelectionMeaning('Too wide');
      } else if (factor === 'Comfort') {
        setSelectionMeaning('Perfect');
      } else if (factor === 'Quality') {
        setSelectionMeaning('Perfect');
      } else if (factor === 'Length') {
        setSelectionMeaning('Runs long');
      } else if (factor === 'Fit') {
        setSelectionMeaning('Runs long');
      }
    }
    setCharacteristics((prevObj) => ({ ...prevObj, [id]: parseInt(value, 10) }));
  };

  return (
    <StylesDiv>
      <WideFieldset>
        <legend>Characteristics? *</legend>
        <Row>
          <Row>
            <StyledH2>{factor}</StyledH2>
          </Row>
          <StylesDiv>
            <Row>
              <StyledP>{selectionMeaning}</StyledP>
            </Row>
          </StylesDiv>
          <Row>
            <Col>
              <input type="radio" id={ID} name={factor} value="1" onChange={handleSelection} required />
              <label htmlFor={`${factor}+1`}>1</label>
              <div>
                {factor === 'Size' ? (<span>A size too small</span>)
                  : factor === 'Width' ? (<span>Too narrow</span>)
                    : factor === 'Comfort' ? (<span>Uncomfortable</span>)
                      : factor === 'Quality' ? (<span>Poor</span>)
                        : factor === 'Length' ? (<span>Runs Short</span>)
                          : factor === 'Fit' ? (<span>Runs tight</span>) : null}
              </div>
            </Col>
            <Col>
              <input type="radio" id={ID} name={factor} value="2" onChange={handleSelection} required />
              <label htmlFor={`${factor}+2`}>2</label>
            </Col>
            <Col>
              <input type="radio" id={ID} name={factor} value="3" onChange={handleSelection} required />
              <label htmlFor={`${factor}+3`}>3</label>
            </Col>
            <Col>
              <input type="radio" id={ID} name={factor} value="4" onChange={handleSelection} required />
              <label htmlFor={`${factor}+4`}>4</label>
            </Col>
            <Col>
              <input type="radio" id={ID} name={factor} value="5" onChange={handleSelection} required />
              <label htmlFor={`${factor}+5`}>5</label>
              <div>
                {factor === 'Size' ? (<span>A size too wide</span>)
                  : factor === 'Width' ? (<span>Too wide</span>)
                    : factor === 'Comfort' ? (<span>Perfect</span>)
                      : factor === 'Quality' ? (<span>Perfect</span>)
                        : factor === 'Length' ? (<span>Runs long</span>)
                          : factor === 'Fit' ? (<span>Runs long</span>) : null}
              </div>
            </Col>
          </Row>
        </Row>
      </WideFieldset>
    </StylesDiv>
  );
}

export default Characteristics;
