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
    top: 28.5,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -18,
    paddingLeft: 28,
    paddingRight: 28,
  },
  thumb: {
    width: 95,
    height: 116.5,
    background: '#E7E7E7',
    borderRadius: '6px',
    marginRight: 14,
    position: 'relative',
    display: 'flex',
    // justifyContent: 'center',
    paddingLeft: '10px',
    alignItems: 'center',
  },
  thumbInner: {
    position: 'absolute',
    top: 11,
    left: 10,
    cursor: 'pointer',
    color: '#C4C4C4'
  },
  fileNameContainer: {
    display: 'flex',
    flexWrap: 'nowrap'
  },
  fileName: {
    width: 40,
    height: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  fileFormat: {
    // width: 40,
    // height: 20,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  fileSize: {
    position: 'absolute',
    bottom: 28,
    left: 10,
    fontSize: 12,
    opacity: 0.5,
  },
}));

function FileInput({
  name, control, register, setValue, onChange, height = 330, withoutThumbs = false,
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

  const formatFileSize = (size) => {
    if (size > (1000 * 1000)) {
      return `${parseInt(size / (1000 * 1000))} mb`
    }
    if (size > 1000) {
      return `${parseInt(size / 1000)} kb`
    }
    return `${size} b`
  }

  const thumbs = files.map((file, idx) => {
    const format = file.name.split('.')[1];
    return (
      <div key={`${file.name}_${idx}`} className={classes.thumb}>
        <div  onClick={(e) => removeFile(e, idx)} className={classes.thumbInner}>
          <CancelIcon size="small" />
        </div>
        <span className={classes.fileNameContainer}>
          <span className={classes.fileName}>{file.name}</span>
          <span className={classes.fileFormat}>.{format}</span>
        </span>
        <div className={classes.fileSize}>
          {formatFileSize(file.size)}
        </div>
      </div>
    )
  });

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
                <BackupIcon style={{fontSize: 52, marginBottom: 5, marginTop: 80}} />
                <Typography variant="body2">Drag and drop to upload file or browse</Typography>
                {!withoutThumbs ? <aside className={classes.thumbsContainer}>
                  {thumbs}
                </aside> : null}
              </>
            }
          </Box>
        </div>
      )}
    />
  );
}

export default FileInput;