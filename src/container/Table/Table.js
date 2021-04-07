import React from 'react';
import ReactDom from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
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
    backgroundColor: 'white',
    border: '1px solid #EDEDED',
    display: 'flex',
    height: '68px',
    zIndex: 1111,
    cursor: 'pointer',
    alignItems: 'center',
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
  },
  treeItem: {
    cursor: 'pointer',
  }
}));

const schema = yup.object().shape({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
});

function Table(props) {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [draggable, setDraggable] = React.useState([
    {
      name: 'Account 1',
      id: 1,
    },
    {
      name: 'Account 2',
      id: 2,
    },
  ])
  const [treeItems, setTreeItems] = React.useState([
    {
      name: 'Group 0',
      id: 0,
      visible: true,
      subgroups: []
    },
    {
      name: 'Group 2',
      id: 1,
      visible: true,
      subgroups: [
        {
          name: 'Subgroup 0',
          visible: true,
          subgroup2: [],
          id: 0,
        },
        {
          name: 'Subgroup 1',
          visible: true,
          id: 1,
          subgroup2: [
            {
              name: 'Subgroup 1a',
              visible: true,
              items: [],
              id: 0,
            },
            {
              name: 'Subgroup 1b',
              visible: true,
              items: [],
              id: 1,
            }
          ]
        },
      ]
    },
  ])
  const { control, register, trigger, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [minimized, setMinimized] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleShowGroup = (index) => {
    treeItems[index].visible = !treeItems[index].visible;
    setTreeItems([...treeItems]);
  };

  const toggleShowSubGroup = (index, subIndex) => {
    treeItems[index].subgroups[subIndex].visible = !treeItems[index].subgroups[subIndex].visible;
    setTreeItems([...treeItems]);
  };

  const toggleShowSubGroup2 = (index, subIndex, sub2Index) => {
    treeItems[index].subgroups[subIndex].subgroup2[sub2Index].visible = !treeItems[index].subgroups[subIndex].subgroup2[sub2Index].visible;
    setTreeItems([...treeItems]);
  };

  const moveItem = (from, to, array) =>  {
    array.splice(to, 0, array.splice(from, 1)[0]);
    return array;
  };

  const onDragEnd = (result) => {
    const { destination, draggableId, source } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === 'droppable') {
      const [name, itemId, subgroupId, subgroup2Id] = destination.droppableId.split('-');

      treeItems[itemId].subgroups[subgroupId].subgroup2[subgroup2Id].items = [
        ...treeItems[itemId].subgroups[subgroupId].subgroup2[subgroup2Id].items,
        {
          name: `Account ${source.index}`,
          id: source.index,
        }
      ];
      setTreeItems([...treeItems]);
      const [_, id] = draggableId.split('-');
      console.log('id', id);
      const filtered = draggable.filter(el => el.id !== +id);
      console.log(filtered);
      setDraggable([...filtered]);
    }
    if (source.droppableId.includes('droppableGroup')) {
      const [name, itemId, subgroupId, subgroup2Id] = destination.droppableId.split('-');
      const a = moveItem(source.index, destination.index, treeItems[itemId].subgroups[subgroupId].subgroup2);
      treeItems[itemId].subgroups[subgroupId].subgroup2 = [...a];
      setTreeItems([
        ...treeItems
      ]);
    }
    // setDraggable(draggable.splice(source.index, 1));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} >
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
                  <div className={classes.column}>
                    <div className={classes.headerTab}>
                      {
                        [...Array(3).keys()].map(k => (
                          <div onClick={() => setSelectedTab(k)} style={{opacity: k === selectedTab ? '0.5' : '1'}} className={classes.tab}>
                            <span className={classes.headerTitle}>Tab {k + 1}</span>
                          </div>
                        ))
                      }
                    </div>

                    <Droppable isDropDisabled droppableId="droppable">
                      {(provide, snapshot) => (
                        <div  {...provide.droppableProps} ref={provide.innerRef}>
                        {
                            draggable.map(k => (                             
                            <div className={classes.row} style={{paddingLeft: 17}}>
                              <Draggable index={k.id} draggableId={`account-${k.id}`}>
                                {(provided, snapshot) => (
                                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classes.accountItem}>{k.name}</div>
                                )}
                              </Draggable>
                            </div>
                            ))
                        }
                        </div>
                      )}
                    </Droppable>
                  </div>
                    <div>
                      <div style={{borderRadius: '4px 0 0 0'}} className={classes.headerItem}>
                        <span className={classes.headerTitle}>List</span>
                      </div>
                      <div onClick={() => setVisible(!visible)} className={classes.row}>
                        {visible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                        <div className={classes.treeItem}>Group 1st level</div>
                      </div>
                      {visible && treeItems.map((group, index) => (
                        <>
                        <div onClick={() => toggleShowGroup(index)} style={{paddingLeft: 15}} className={classes.row}>
                          <div style={{transform: !group.visible ? 'rotate(270deg)' : 'rotate(0deg)', height: 24, width: 24}}>
                            <ArrowDropDownIcon />
                          </div>
                          <div className={classes.treeItem}>{group.name}</div>
                        </div>
                        {group.visible && group.subgroups.map((subgroup, subGroupIndex) =>
                        <>
                          <div onClick={() => toggleShowSubGroup(index, subGroupIndex)} style={{paddingLeft: 30}} className={classes.row}>
                            {subgroup.visible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                          <div className={classes.treeItem}>{subgroup.name}</div>
                          </div>

                                {subgroup.visible && subgroup.subgroup2.map((subgroup2, key) =>
                                  <Droppable droppableId={`droppableGroup-${group.id}-${subgroup.id}-${subgroup2.id}`}>
                                    {(provided, snapshot) => (
                                      <div style={{border: snapshot.isDraggingOver ?  '2px solid #F480B7' : 0}} {...provided.droppableProps} ref={provided.innerRef}>
                                        <Draggable index={key} draggableId={key.toString()}>
                                            {(provided, snapshot) => (
                                              <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div onClick={() => toggleShowSubGroup2(index, subGroupIndex, key)} style={{paddingLeft: 45}} className={classes.row}>
                                                  
                                                    {subgroup2.visible ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
                                                  
                                                  <div className={classes.treeItem}>{subgroup2.name}</div>
                                                </div>
                                                  {subgroup2.visible && subgroup2.items.map(item => (
                                                    <div style={{paddingLeft: '50px'}} className={classes.row}>
                                                      <div className={classes.accountItem}>{item.name}</div>
                                                    </div>
                                                  ))}
                                              </div>
                                            )}
                                        </Draggable>
                                      </div>
                                    )}
                                  </Droppable>
                                )}
                        </>
                        )}
                        </>
                      ))}
                    </div>
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