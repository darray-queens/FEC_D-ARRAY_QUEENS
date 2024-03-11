/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

import { Row, Col } from '../shared/containers';

const { useState } = React;

function Characteristics({ factor, setCharacteristics }) {
  const [selectionMeaning, setSelectionMeaning] = useState('none selected');

  const handleSelection = (event) => {
    const { value, id } = event.target;
    setCharacteristics((prevObj) => ({ ...prevObj, [id]: parseInt(value, 10) }));
  };

  return (
    <fieldset>
      <legend>Characteristics? *</legend>
      {Object.keys(factors).map((key) => (
        <Row key={key}>
          <Row>
            <h2>{key}</h2>
          </Row>
          <Row>
            <p>{selectionMeaning}</p>
          </Row>
          <Row>
            <Col>
              <input type="radio" id={factors[key].id} name={key} value="1" onChange={handleSelection} required />
              <label htmlFor={`${key}+1`}>1</label>
              <div>
                {key === 'Size' ? (<span>A size too small</span>)
                  : key === 'Width' ? (<span>Too narrow</span>)
                    : key === 'Comfort' ? (<span>Uncomfortable</span>)
                      : key === 'Quality' ? (<span>Poor</span>)
                        : key === 'Length' ? (<span>Runs Short</span>)
                          : key === 'Fit' ? (<span>Runs tight</span>) : null}
              </div>
            </Col>
            <Col>
              <input type="radio" id={factors[key].id} name={key} value="2" onChange={handleSelection} required />
              <label htmlFor={`${key}+2`}>2</label>
            </Col>
            <Col>
              <input type="radio" id={factors[key].id} name={key} value="3" onChange={handleSelection} required />
              <label htmlFor={`${key}+3`}>3</label>
            </Col>
            <Col>
              <input type="radio" id={factors[key].id} name={key} value="4" onChange={handleSelection} required />
              <label htmlFor={`${key}+4`}>4</label>
            </Col>
            <Col>
              <input type="radio" id={factors[key].id} name={key} value="5" onChange={handleSelection} required />
              <label htmlFor={`${key}+5`}>5</label>
              <div>
                {key === 'Size' ? (<span>A size too wide</span>)
                  : key === 'Width' ? (<span>Too wide</span>)
                    : key === 'Comfort' ? (<span>Perfect</span>)
                      : key === 'Quality' ? (<span>Perfect</span>)
                        : key === 'Length' ? (<span>Runs long</span>)
                          : key === 'Fit' ? (<span>Runs long</span>) : null}
              </div>
            </Col>
          </Row>
        </Row>
      ))}
    </fieldset>
  );
}

export default Characteristics;
