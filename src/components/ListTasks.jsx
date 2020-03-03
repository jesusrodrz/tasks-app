import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TodayIcon from '@material-ui/icons/Today';
import TelegramIcon from '@material-ui/icons/Telegram';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import AllInboxIcon from '@material-ui/icons/AllInbox';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  active: {
    textDecoration: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

export default function ListTasks({ setFilter, active }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={() => setFilter('all')} className={active === 'all' ? classes.active : ''}>
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Todas" />
        </ListItem>
        <ListItem button onClick={() => setFilter('today')} className={active === 'today' ? classes.active : ''}>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Hoy" />
        </ListItem>
        <ListItem button onClick={() => setFilter('week')} className={active === 'week' ? classes.active : ''}>
          <ListItemIcon>
            <TelegramIcon />
          </ListItemIcon>
          <ListItemText primary="Siguiente semana" />
        </ListItem>
        <ListItem button onClick={() => setFilter('inbox')} className={active === 'inbox' ? classes.active : ''}>
          <ListItemIcon>
            <MoveToInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Completadas" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}
