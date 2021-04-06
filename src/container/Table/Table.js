import React from 'react';
import ReactDom from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Container } from '@material-ui/core';
import Topbar from '../../components/Topbar';
import Sidebar from '../../components/Sidebar';
import Button from '../../components/Button';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dropdown from '../../components/Dropdown';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
    marginTop: 88,
    minHeight: 'calc(100vh - 88px)'
  },
  container: {
    padding: '20px 12px',
    [theme.breakpoints.up('sm')]: {
      padding: '35px 36px 25px 36px',
    },
  },
  connectButton: {
    width: '350.67px',
    height: '75.63px',
    alignSelf: 'center',
  },
  paper: {
    padding: '12px 24px',
    display: 'flex',
    flexDirection: 'column',
    border: 0,
    boxShadow: '0px 12px 76px rgba(226, 48, 142, 0.1)',
    [theme.breakpoints.up('sm')]: {
      padding: '27px 0 27px 45px',
    },
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '20px',
    marginBottom: '22.57px',
  },
  tableContainer: {
    // height: '613px',
    width: '100%',
    display: 'flex',
    marginBottom: '47px',
  },
  leftsidePart: {
    flex: 3,
    height: '613px',
    display: 'grid',
    gridTemplateColumns: '210px 177px 156px 155px',
  },
  rightsidePart: {
    // display: 'flex',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 200px)',
    flex: 2,
    overflow: 'auto',
  },
  column: {
    display: 'grid',
    gridTemplateRows: '54px repeat(9, 68px)',
  },
  row: {
    background: 'white',
    border: '1px solid #EDEDED',
  },
  rowWithDropdown: {
    padding: '6.5px 14.75px 8.33px 15.75px',
    background: 'white',
    border: '1px solid #EDEDED',
  },
  headerTab: {
    display: 'grid',
    backgroundColor: 'white',
    gap: '1px',
    gridTemplateColumns: 'repeat(3, 69px)',
  },
  tab: {
    background: 'linear-gradient(90deg, #F480B7 0%, rgba(255, 255, 255, 0) 713.32%)',
    borderRadius: '4px 4px 0px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  headerItem: {
    background: 'linear-gradient(90deg, #F480B7 0%, rgba(255, 255, 255, 0) 306.66%)',
    borderRight: '1px solid #FFDEEE',
    padding: '18.42px 0 16.59px 18.82px',
  },
  headerTitle: {
    fontSize: '14px',
    color: 'white',
    textTransform: 'uppercase',
  },
  amount: {
    fontSize: '12px',
    color: 'black',
  },
  accountItem: {
    width: '91.37px',
    height: '27px',
    background: '#C82974',
    borderRadius: '80px',
    textAlign: 'center',
    color: 'white',
    fontSize: '12px',
    textTransform: 'uppercase',
    paddingTop: '3px',
    lineHeight: '20px',
  }
}));

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

 const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
});

function Table(props) {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const { control, register, trigger, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <DragDropContext>
      <div className={classes.root}>
        <CssBaseline />
        <Topbar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          minimized={minimized}
        />
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          minimized={minimized}
          setMinimized={setMinimized}
        />
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              <span className={classes.heading}>HEADING</span>
              <div className={classes.tableContainer}>
                <div className={classes.leftsidePart}>
                <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className={classes.column}>
                    <div className={classes.headerTab}>
                      {
                        [...Array(3).keys()].map(k => (
                          <div onClick={() => setSelectedTab(k)} style={{opacity: k === selectedTab ? '0.5' : '1'}} className={classes.tab}>
                            <span className={classes.headerTitle}>Tab {k + 1}</span>
                          </div>
                        ))
                      }
                    </div>
                  
                    {
                       [...Array(9).keys()].map(k => (
                        <div style={{display: 'flex', paddingLeft: '17px', alignItems: 'center'}} className={classes.row}>
                          <Draggable index={k} draggableId={k.toString()}>
                            {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classes.accountItem}>Account {k}</div>
                            )}
                          </Draggable>
                        </div>
                       ))
                    }
                  </div>
                )}
                </Droppable>
                  <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className={classes.column}>
                      <div style={{borderRadius: '4px 0 0 0'}} className={classes.headerItem}>
                        <span className={classes.headerTitle}>List</span>
                      </div>
                      <div className={classes.row}></div>
                      <div className={classes.row}></div>
                      <div className={classes.row}></div>
                      <div className={classes.row}></div>
                      <div className={classes.row}></div>
                      <div className={classes.row}></div>
                      <div className={classes.row}></div>
                      <div className={classes.row}></div>
                    </div>
                  )}

                  </Droppable>
                  <div className={classes.column}>
                    <div className={classes.headerItem}>
                      <span className={classes.headerTitle}>Amounts (ILS)</span>
                    </div>
                    {
                      [...Array(9).keys()].map(k => (
                        <div style={{ paddingLeft: '17px', display: 'flex', alignItems: 'center'}} className={classes.row}>
                          <span className={classes.amount}>₪123</span>
                        </div>
                      ))
                    }
                  </div>
                  <div className={classes.column}>
                    <div className={classes.headerItem}>
                      <span className={classes.headerTitle}>Amounts (USD)</span>
                    </div>
                    {
                      [...Array(9).keys()].map(k => (
                        <div style={{ paddingLeft: '17px', display: 'flex', alignItems: 'center'}} className={classes.row}>
                          <span className={classes.amount}>$123</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={classes.rightsidePart}>
                <div className={classes.column}>
                  <div className={classes.headerItem}>
                    <span className={classes.headerTitle}>1</span>
                  </div>
                  {[...Array(9).keys()].map(k => (
                    <div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>
                  ))}
                </div>
                <div className={classes.column}>
                  <div className={classes.headerItem}>
                    <span className={classes.headerTitle}>2</span>
                  </div>
                  {[...Array(9).keys()].map(k => (
                    <div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>
                  ))}
                </div>
                <div className={classes.column}>
                  <div className={classes.headerItem}>
                    <span className={classes.headerTitle}>3</span>
                  </div>
                  {[...Array(9).keys()].map(k => (
                    <div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>
                  ))}
                </div>
                <div className={classes.column}>
                  <div style={{borderRadius: '0 4px 0 0'}} className={classes.headerItem}>
                    <span className={classes.headerTitle}>4</span>
                  </div>
                  {[...Array(9).keys()].map(k => (
                    <div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>
                  ))}
                </div>
                </div>
              </div>
              <Button className={classes.connectButton} text="Connect" />
            </Paper>
          </Container>
        </main>
      </div>
      </DragDropContext>
  );
}

export default Table;

ReactDom.render(<Table />, document.getElementById("root"));