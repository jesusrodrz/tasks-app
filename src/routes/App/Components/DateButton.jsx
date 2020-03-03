import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DateRangeIcon from '@material-ui/icons/DateRange';
import moment from 'moment';
import { useCallback } from 'react';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function DateButton({ set }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  // const [, setDate] = useState(0);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleDayClick = useCallback(
    date => {
      setOpen(false);
      const parsedDate = moment(date).valueOf();
      set(parsedDate);
    },
    [set]
  );
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'date-select' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <DateRangeIcon />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                  <DayPicker format="YYYY-MM-DD" formatDate="YYYY-MM-DD" onDayClick={handleDayClick} />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
