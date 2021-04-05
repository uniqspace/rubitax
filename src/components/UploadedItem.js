import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import styled from 'styled-components';

const Container = styled.div`
  width: 310px;
  height: 40px;
  border-bottom: 1px solid rgba(200, 200, 200, 0.4);
  margin-top: 16px;
  border-bottom-width: ${({isLast}) => isLast ? 0 : 1}px;
`;

export const Text = styled.span`
  font-size: 14px;
  line-height: 20px;
  margin-left: 23px;
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & .MuiSvgIcon-root {
    opacity: 0.2;
  }
`;

const IconButton = styled.div`
  cursor: pointer;
`;

const UploadedItem = ({isLast, onDelete}) => {
  return (
    <Container isLast={isLast}>
      <ValueContainer>
        <IconButton onClick={onDelete}>
          <DeleteIcon color="#9A9A9A" />
        </IconButton>
        <Text>January PCN Report</Text>
      </ValueContainer>
    </Container>
  )
}
export default UploadedItem;
