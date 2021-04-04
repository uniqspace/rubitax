import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import BackupIcon from '@material-ui/icons/Backup';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

import { Controller } from 'react-hook-form';

import { useDropzone } from 'react-dropzone'

const useStyles = makeStyles((theme) => ({
  fileUploader: {
    height: 330,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF8F8',
    border: '0.5px dashed #9A9A9A',
    borderRadius: '3px 3px 0px 0px',
    textAlign: 'center',
    '&:focus': {
      outline: 'none',
    },
    '& > svg': {
      opacity: 0.2
    },
    '& > .MuiTypography-root': {
      opacity: 0.4
    }
  },
  thumbsContainer: {
    position: 'absolute',
    top: 240,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -18,
    paddingLeft: 28,
    paddingRight: 28,
  },
  thumb: {
    padding: 9,
    boxSizing: 'border-box'
  },
  thumbInner: {
    background: '#E7E7E7',
    width: 50,
    height: 58,
    borderRadius: 3,
    border: '1px solid #eaeaea',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: '#C4C4C4'
  },
  fileName: {
    width: 50,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

function FileInput({
  name, control, register, setValue, onChange, height = 330
}) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    let _files = files.slice(0);
    const _acceptedFiles = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    _files = _files.concat(_acceptedFiles)
    setFiles(_files);
    setValue(`${name}`, _files);
      onChange();
  }, [files, setValue, name, onChange]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    multiple: true,
    maxFiles: 10
  });

  const removeFile = (e, fileIdx) => {
    e.stopPropagation();
    e.preventDefault();
    let _files = files.slice(0);
    _files = _files.filter((value, index, arr) => { 
      return index !== fileIdx;
    });
    setFiles(_files);
    setValue(`${name}`, _files);
    onChange();
  }

  const thumbs = files.map((file, idx) => (
    <div key={`${file.name}_${idx}`} className={classes.thumb}>
      <div
        className={classes.thumbInner}
        onClick={(e) => removeFile(e, idx)}
      >
        <CancelIcon size="small" />
      </div>
      <Typography
        variant="body2"
        className={classes.fileName}
      >{file.name}</Typography>
    </div>
  ));

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={props => (
        <div>
          <Box style={{
            height: height,
          }} className={classes.fileUploader} {...getRootProps()}>
            <input
              ref={register}
              {...getInputProps()}
            />
            {
              isDragActive?
              <Typography variant="body2">Drop the files here ...</Typography>:
              <>
                <BackupIcon style={{fontSize: 52, marginBottom: 20}} />
                <Typography variant="body2">Drag and drop to upload file<br/>or browse</Typography>
                <aside className={classes.thumbsContainer}>
                  {thumbs}
                </aside> 
              </>
            }
          </Box>
        </div>
      )}
    />
  );
}

export default FileInput;