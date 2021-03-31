import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useSearchBoxStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    padding: '6px 8px',
    margin: 8,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: 350,
      padding: '12px 22px',
      margin: 0,
    },
    background: '#FBF8F8',
    borderRadius: 100,
  },
  searchIcon: {
    color: '#CACCCF'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    '& input::placeholder': {
      fontSize: '14px'
    }
  }
}));

function SearchBox() {
  const classes = useSearchBoxStyles();
  return (
    <div component="form" className={classes.root}>
      <SearchIcon className={classes.searchIcon} />
      <InputBase
        className={classes.input}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

export default SearchBox;