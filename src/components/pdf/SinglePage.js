import React, { useState } from "react";
import clsx from 'clsx';
import { Document, Page } from "react-pdf";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import RefreshIcon from '@material-ui/icons/Refresh';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';

const useStyles = makeStyles((theme) => ({
  pdfViewer: {
    background: '#F0F0F0',
    borderRadius: 3,
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  pdfPage: {
    minHeight: '500px',
    [theme.breakpoints.up('sm')]: {
      minHeight: '700px',
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '1000px',
    },
    '& .react-pdf__Page': {
      marginBottom: 87,
      height: '500px',
      [theme.breakpoints.up('sm')]: {
        height: '700px',
      },
      [theme.breakpoints.up('lg')]: {
        height: '1000px',
      },
      overflow: 'auto',
      '& .react-pdf__Page__canvas': {
        padding: '8px 16px',
        boxSizing: 'content-box',
        [theme.breakpoints.up('sm')]: {
          padding: '48px 66px',
        },
        margin: 'auto'
      }
    }
  },
  controlPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: '#0C0C0C',
    borderRadius: '0px 0px 3px 3px',
    minHeight: 87,
    padding: '3px 6px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: '18px 30px',
    },
  },
  zoomPanel: {
    order: 1,
    flex: '1 0 100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flex: 'initial',
    },
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
  rotatePanel: {
    order: 2,
    flex: '1 0 100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      flex: 'initial',
    },
    [theme.breakpoints.up('lg')]: {
      order: 3,
    },
  },
  pagination: {
    flex: '1 0 100%',
    order: 3,
    [theme.breakpoints.up('lg')]: {
      flex: 'initial',
      order: 2,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageCount: {
    padding: '8px 12px',
    backgroundColor: '#000000',
    color: '#ffffff',
    marginLeft: 8,
    marginRight: 8
  },
  controlPanelBtn: {
    color: '#ffffff',
    '&.Mui-disabled': {
      color: 'rgba(255, 255, 255, 0.5)'
    }
  }
}));

const initial = {
  pageNumber: 1,
  scale: 1.2,
  rotate: 0
};

const rotateValues = [0, 90, 180, 270];

export default function SinglePagePDFViewer(props) {
  const classes = useStyles();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(initial.pageNumber); //setting 1 to show fisrt page
  const [scale, setScale] = useState(initial.scale);
  const [rotate, setRotate] = useState(initial.rotate);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  const previousPage = () => {
    changePage(-1);
  }
  const nextPage = () => {
    changePage(1);
  }

  const changeScale = (offset) => {
    setScale(prevScale => prevScale + offset);
  }
  const zoomIn = () => {
    changeScale(0.2)
  }
  const zoomOut = () => {
    changeScale(-0.2)
  }

  const rotateLeft = () => {
    setRotate(prevRotate => (prevRotate - 1 + 4) % 4);
  }
  const rotateRight = () => {
    setRotate(prevRotate => (prevRotate + 1) % 4);
  }

  const { pdf, className } = props;

  return (
    <div className={clsx(classes.pdfViewer, className)}>
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
        className={classes.pdfPage}
        
      >
        <Page
          scale={scale}
          pageNumber={pageNumber}
          rotate={rotateValues[rotate]}
        />
      </Document>
      <div className={classes.controlPanel}>
        <div className={classes.zoomPanel}>
          <IconButton
            onClick={zoomIn}
            className={classes.controlPanelBtn}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton
            onClick={() => setScale(initial.scale)}
            className={classes.controlPanelBtn}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={zoomOut}
            className={classes.controlPanelBtn}
          >
            <ZoomOutIcon />
          </IconButton>
        </div>
        <div className={classes.pagination}>
          <IconButton
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className={classes.controlPanelBtn}
          >
            <ChevronLeftIcon />
          </IconButton>
          <div className={classes.pageCount}>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </div>
          <IconButton
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className={classes.controlPanelBtn}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <div className={classes.rotatePanel}>
          <IconButton
            onClick={rotateLeft}
            className={classes.controlPanelBtn}
          >
            <RotateLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => setRotate(initial.rotate)}
            className={classes.controlPanelBtn}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            onClick={rotateRight}
            className={classes.controlPanelBtn}
          >
            <RotateRightIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
