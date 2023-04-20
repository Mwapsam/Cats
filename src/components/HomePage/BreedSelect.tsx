import React from 'react';
import Form from 'react-bootstrap/Form';
import { useCatContext } from '../../context/CatContext';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: between;
  margin-top: 30px;
`;

const StyledSelect = styled(Form.Select)`
  width: 15rem;
`;

const BreedSelect = () => {
  const { handleSelectChange } = useCatContext();

  return (
    <StyledDiv>
      <h1>Cat Breeds</h1>
      <StyledSelect onChange={handleSelectChange}>
        <option value="">Select a breed</option>
        <option value="aege">Aege</option>
        <option value="abys">Abys</option>
        <option value="abob">American Bobtail</option>
        <option value="acur">American Curl</option>
        <option value="asho">American Shorthair</option>
        <option value="awir">American Wirehair</option>
        <option value="amau">Arabian Mau</option>
        <option value="amis">Australian Mist</option>
        <option value="bali">Balinese</option>
      </StyledSelect>
    </StyledDiv>
  );
};

export default BreedSelect;
