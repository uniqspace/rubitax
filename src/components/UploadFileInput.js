import React from 'react';
import BackupIcon from '@material-ui/icons/Backup';
import styled from 'styled-components';

const Input = styled.div`
  width: 100%;
  height: 56px;
  position: relative;
  background: #FBF8F8;
  border-radius: 3px 3px 0px 0px;
  border-bottom: 1px solid rgba(148, 148, 148, 0.3);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const RightButton = styled.div`
  width: 76.99px;
  height: 56px;
  background-color: #C4C4C4;
  border-radius: 0px 3px 0px 0px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
  :hover {
    opacity: 0.5;
  }
  & .MuiSvgIcon-root {
    color: white;
  }
`;

const Label = styled.p`
  position: absolute;
  left: 14px;
  opacity: 0.5;
  top: 5px;
  font-size: 14px;
`;

export default function UploadFileInput() {
  return (
    <Input>
    <Label>upload file</Label>
      <RightButton>
        <BackupIcon color="white" />
      </RightButton>
    </Input>
  )
};