import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Row, Col } from '../shared/containers';

const { useState } = React;

function Characteristics({ factors, setCharacteristics }) {
  const [selectionMeaning, setSelectionMeaning] = useState('none selected');

  const handleSelection = (event) => {
    const { value, id } = event.target;
    setCharacteristics((prevObj) => ({ ...prevObj, [id]: value }));
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
            <input type="radio" id={key} name={key} value="1" onChange={handleSelection} required />
            <label htmlFor={`${key }+1`}>1</label>
          </Col>
          <Col>
            <input type="radio" id={key} name={key} value="2" onChange={handleSelection} required />
            <label htmlFor={`${key }+2`}>2</label>
          </Col>
          <Col>
            <input type="radio" id={key} name={key} value="3" onChange={handleSelection} required />
            <label htmlFor={`${key }+3`}>3</label>
          </Col>
          <Col>
            <input type="radio" id={key} name={key} value="4" onChange={handleSelection} required />
            <label htmlFor={`${key }+4`}>4</label>
          </Col>
          <Col>
            <input type="radio" id={key} name={key} value="5" onChange={handleSelection} required />
            <label htmlFor={`${key }+5`}>5</label>
          </Col>
          </Row>
        </Row>
      ))}
    </fieldset>
  );
}

export default Characteristics;
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';

// import { Row, Col } from '../shared/containers';

// function Characteristics({ factors, setCharacteristics }) {
//   const [selectionMeanings, setSelectionMeanings] = useState({});

//   const meanings = {
//     1: 'A size too small',
//     2: '½ a size too small',
//     3: 'Perfect',
//     4: '½ a size too big',
//     5: 'A size too wide'
//   };

//   const handleSelection = (event) => {
//     const { value, name } = event.target;
//     setSelectionMeanings(prevSelections => ({ ...prevSelections, [name]: meanings[value] }));
//     setCharacteristics(prevObj => ({ ...prevObj, [name]: value }));
//   };

//   return (
//     <fieldset>
//       <legend>Characteristics? *</legend>
//       {Object.keys(factors).map((key) => (
//         <Row key={key}>
//           <div>
//             <h3>{key}</h3>
//             <p>{selectionMeanings[key] || 'none selected'}</p>
//           </div>
//           <div>
//             {[1, 2, 3, 4, 5].map((rating) => (
//               <div key={`${key}-${rating}`}>
//                 <input
//                   type="radio"
//                   id={`${key}-${rating}`}
//                   name={key}
//                   value={rating}
//                   onChange={handleSelection}
//                   required
//                 />
//                 <label htmlFor={`${key}-${rating}`}>{rating}</label>
//               </div>
//             ))}
//           </div>
//         </Row>
//       ))}
//     </fieldset>
//   );
// }

// export default Characteristics;
