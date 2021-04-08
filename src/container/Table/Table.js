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
    width: '100%',
    display: 'flex',
    marginBottom: '47px',
  },
  leftsidePart: {
    // flex: 3,
    height: '613px',
    display: 'grid',
    gridTemplateColumns: '210px 177px 156px 155px',
  },
  rightsidePart: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 200px)',
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
    // background: 'linear-gradient(90deg, #F480B7 0%, rgba(255, 255, 255, 0) 306.66%)',
    background: 'transparent',
    zIndex: 111,
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
  },
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
      tabId: 0,
    },
    {
      name: 'Account 2',
      id: 2,
      tabId: 0,
    },
    {
      name: 'Account 3',
      id: 3,
      tabId: 0,
    },
    {
      name: 'Account 4',
      id: 4,
      tabId: 1,
    },
    {
      name: 'Account 5',
      id: 5,
      tabId: 1,
    },
    {
      name: 'Account 6',
      id: 6,
      tabId: 1,
    },
    {
      name: 'Account 7',
      id: 7,
      tabId: 2,
    },
    {
      name: 'Account 8',
      id: 8,
      tabId: 2,
    },
    {
      name: 'Account 9',
      id: 9,
      tabId: 2,
    },
    {
      name: 'Account 10',
      id: 10,
      tabId: 2,
    },
  ])
  const [treeItems, setTreeItems] = React.useState([
    {
      name: 'Group 0',
      id: 0,
      visible: false,
      subgroups: []
    },
    {
      name: 'Group 2',
      id: 1,
      visible: false,
      subgroups: [
        {
          name: 'Subgroup 0',
          visible: false,
          subgroup2: [],
          id: 0,
        },
        {
          name: 'Subgroup 1',
          visible: false,
          id: 1,
          subgroup2: [
            {
              name: 'Subgroup 1a',
              visible: false,
              items: [],
              id: 0,
            },
            {
              name: 'Subgroup 1b',
              visible: false,
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

    if (destination.droppableId === 'droppable') {
      const [sourcename, sourceItemId, sourceSubgroupId, sourceSubgroup2Id] = source.droppableId.split('-');
      setDraggable([...draggable,
      {
        name: `Account ${draggableId.split('-')[1]}`,
        id: parseInt(draggableId.split('-')[1]),
        tabId: selectedTab,
      }
    ]);
    treeItems[sourceItemId].subgroups[sourceSubgroupId].subgroup2[sourceSubgroup2Id].items = [
      ...treeItems[sourceItemId].subgroups[sourceSubgroupId].subgroup2[sourceSubgroup2Id].items.filter(i => i.id !== +draggableId.split('-')[1])
    ]

    setTreeItems([...treeItems]);
    return;
    }
    if (draggableId.includes('account') && source.droppableId.includes('droppableGroup')) {

      const [destname, destItemId, destSubgroupId, destSubgroup2Id] = destination.droppableId.split('-');
      const [sourcename, sourceItemId, sourceSubgroupId, sourceSubgroup2Id] = source.droppableId.split('-');
      treeItems[destItemId].subgroups[destSubgroupId].subgroup2[destSubgroup2Id].items = [
        ...treeItems[destItemId].subgroups[destSubgroupId].subgroup2[destSubgroup2Id].items,
        {
          name: `Account ${draggableId.split('-')[1]}`,
          id: parseInt(draggableId.split('-')[1]),
          tabId: selectedTab,
        }
      ];
      // const ind = treeItems[sourceItemId].subgroups[sourceSubgroupId].subgroup2[sourceSubgroup2Id].items.findIndex(i => i.id === +draggableId.split('-')[1])
      treeItems[sourceItemId].subgroups[sourceSubgroupId].subgroup2[sourceSubgroup2Id].items = [
        ...treeItems[sourceItemId].subgroups[sourceSubgroupId].subgroup2[sourceSubgroup2Id].items.filter(i => i.id !== +draggableId.split('-')[1])
      ]
      console.log(treeItems);
      setTreeItems([...treeItems]);
      return;

    } 
    if (source.droppableId === 'droppable') {
      console.log('result', result);
      const [name, itemId, subgroupId, subgroup2Id] = destination.droppableId.split('-');

      treeItems[itemId].subgroups[subgroupId].subgroup2[subgroup2Id].items = [
        ...treeItems[itemId].subgroups[subgroupId].subgroup2[subgroup2Id].items,
        {
          name: `Account ${source.index}`,
          id: source.index,
          tabId: selectedTab,
        }
      ];
      setTreeItems([...treeItems]);
      const [_, id] = draggableId.split('-');
      const filtered = draggable.filter(el => el.id !== +id);
      console.log(filtered);
      setDraggable([...filtered]);
      return;
    }
    if (source.droppableId.includes('droppableGroup')) {
      const [name, itemId, subgroupId, subgroup2Id] = destination.droppableId.split('-');
      const a = moveItem(source.index, destination.index, treeItems[itemId].subgroups[subgroupId].subgroup2);
      treeItems[itemId].subgroups[subgroupId].subgroup2 = [...a];
      setTreeItems([
        ...treeItems
      ]);
    }
  };

  
  const renderRow = (component) => {
    return (
      <>
        {component}
        {
          visible && [...Array(treeItems.length).keys()].map(k => component)
        }
        {
          treeItems.map(item => {
            if (item.visible) {
              return (
                <>
                  {
                    [...Array(item.subgroups.length).keys()].map(k1 => component)
                  }
                  {
                    item.subgroups.map(sub => {
                      if (sub.visible) {
                        return (
                          <>
                            {
                              [...Array(sub.subgroup2.length).keys()].map(k2 => component)
                            }
                            {
                              sub.subgroup2.map(sub2 => {
                                if (sub2.visible) {
                                  return (
                                    <>
                                      {
                                        [...Array(sub2.items.length).keys()].map(k3 => component)
                                      }
                                    </>
                                  )
                                }
                                return null;
                              })
                            }
                          </>
                        )
                      }
                      return null
                    })
                  }
                </>
              )
            }
            return null;
          })
        }
      </>
    )
  }

  console.log('draggable', draggable);
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
          <Container style={{maxWidth: 'none'}} maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              <span className={classes.heading}>HEADING</span>
              <div style={{width: 443, marginBottom: 21}}>
              <Dropdown
                name="dropdown1"
                label="Dropdown 1"
                control={control}
                register={register}
                error={errors.fieldFirst?.message}
                onChange={() => trigger("fieldFirst")}
              />
              </div>
              <div style={{position: 'relative'}} className={classes.tableContainer}>
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

                    <Droppable droppableId="droppable">
                      {(provide, snapshot) => (
                        <div  {...provide.droppableProps} ref={provide.innerRef}>
                        {
                            draggable.filter(d => d.tabId === selectedTab).map(k => (                             
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
                    <div style={{zIndex: 1111}}>
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
                                                    <Draggable index={item.id} draggableId={`account-${item.id}`}>
                                                      {(provided, snapshot) => (
                                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={classes.accountItem}>{item.name}</div>
                                                      )}
                                                    </Draggable>
                                                    </div>
                                                    //   <div className={classes.accountItem}>{item.name}</div>
                                                    
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
                    {renderRow(<div style={{ paddingLeft: '17px', display: 'flex', alignItems: 'center'}} className={classes.row}>
                          <span className={classes.amount}>₪123</span>
                        </div>
                    )}
                  </div>
                  <div className={classes.column}>
                    <div className={classes.headerItem}>
                      <span className={classes.headerTitle}>Amounts (USD)</span>
                    </div>
                    {renderRow(<div style={{ paddingLeft: '17px', display: 'flex', alignItems: 'center'}} className={classes.row}>
                      <span className={classes.amount}>$123</span>
                    </div>)}
                  </div>
                </div>
                <div className={classes.rightsidePart}>
                <div className={classes.column}>
                  <div className={classes.headerItem}>
                    <span className={classes.headerTitle}>1</span>
                  </div>
                  {
                    renderRow(<div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>)
                  }
                </div>
                <div className={classes.column}>
                  <div className={classes.headerItem}>
                    <span className={classes.headerTitle}>2</span>
                  </div>
                  {
                    renderRow(<div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>)
                  }
                </div>
                <div className={classes.column}>
                  <div className={classes.headerItem}>
                    <span className={classes.headerTitle}>3</span>
                  </div>
                    {
                    renderRow(<div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>)
                  }
                </div>
                <div className={classes.column}>
                  <div style={{borderRadius: '0 4px 0 0'}} className={classes.headerItem}>
                    <span className={classes.headerTitle}>4</span>
                  </div>
                    {
                    renderRow(<div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>)
                  }
                </div>
                <div className={classes.column}>
                  <div className={classes.headerItem}>
                    <span className={classes.headerTitle}>5</span>
                  </div>
                    {
                    renderRow(<div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>)
                  }
                </div>
                <div className={classes.column}>
                  <div className={classes.headerItem}>
                    <span className={classes.headerTitle}>6</span>
                  </div>
                    {
                    renderRow(<div className={classes.rowWithDropdown}>
                      <Dropdown
                        name="dropdown1"
                        label="Dropdown 1"
                        control={control}
                        register={register}
                        error={errors.fieldFirst?.message}
                        onChange={() => trigger("fieldFirst")}
                      />
                    </div>)
                  }
                </div>
                </div>
                <div style={{position: 'absolute', top: 0, height: 54.98, left: 210, right:0, background: 'linear-gradient(90deg, #F480B7 0%, rgba(255, 255, 255, 0) 306.66%)', zIndex: 1}}></div>
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