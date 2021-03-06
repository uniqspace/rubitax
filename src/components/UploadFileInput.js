import React from 'react';
import BackupIcon from '@material-ui/icons/Backup';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone'

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

const RightButton = styled.label`
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

export const Value = styled.p`
  position: absolute;
  left: 14px;
  top: 5px;
  font-size: 14px;
`;
export default function UploadFileInput({id}) {
  const [file, setFile] = React.useState(null)

  // const onDrop = React.useCallback(acceptedFiles => {
  //   let _files = files.slice(0);
  //   const _acceptedFiles = acceptedFiles.map(file => Object.assign(file, {
  //     preview: URL.createObjectURL(file)
  //   }));
  //   _files = _files.concat(_acceptedFiles)
  //   setFiles(_files);
  //   setValue(`${name}`, _files);
  //     onChange();
  // }, [files, setValue, name, onChange]);

  const onDrop = (file) => {
    console.log('drop', file);
    setFile(`/${file[0].path}`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    multiple: true,
    maxFiles: 10
  });

  return (
    <Input {...getRootProps()}>
    {!file ? <Label>{'upload file'}</Label> : <Value>{file}</Value>}
      <input {...getInputProps()} onChange={(e) => setFile(e.nativeEvent.target.value)} type="file" id={id} name={id} style={{visibility: 'hidden'}} />
      <RightButton for={id}>
        <BackupIcon color="white" />
      </RightButton>
    </Input>
  )
};
