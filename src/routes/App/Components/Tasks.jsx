import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { useCallback } from 'react';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useRef } from 'react';
import { useEffect } from 'react';
import { TextField, Input } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import ClearIcon from '@material-ui/icons/Clear';
import * as gql from 'shared/graphql';
import { useMutation } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: '5px 4px',
  },
  listItem: {
    paddingRight: '18px',
  },
}));

export default function Tasks({ data, refetchTasks, loading }) {
  const classes = useStyles();
  const [taskName, setTaskName] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const inputRef = useRef();

  const handleTaskNameChange = useCallback(({ target }) => {
    const { value } = target;
    setTaskName(value);
  }, []);
  const handleEdit = useCallback((id, name) => {
    setSelectedTask(id);
    setTaskName(name);
  }, []);
  const handleUnSelectTask = useCallback(e => {
    if (e) e.stopPropagation();
    setSelectedTask('');
    setTaskName('');
  }, []);
  const [upDateTaskComplited] = useMutation(gql.UPDATE_TASK_COMPLITED, {
    onError: error => {
      console.log(error);
    },
    onCompleted: () => {
      console.log('task updated');
      // (() => refetchTasks())();
    },
  });

  const handleToggle = useCallback(id => {
    // const data = { ...task, timeStamp, date: date.toString(), user: { connect: { id: userId } } };
    upDateTaskComplited({ variables: { id } });
  }, []);
  const [upDateTaskName, { loading: updateLoading }] = useMutation(gql.UPDATE_TASK_NAME, {
    onError: error => {
      console.log(error);
    },
    onCompleted: () => {
      console.log('task name supdated');
      handleUnSelectTask();
      // (() => refetchTasks())();
      // console.log(refetchTasks);
    },
  });
  const saveTaskName = useCallback(
    id => {
      // const data = { ...task, timeStamp, date: date.toString(), user: { connect: { id: userId } } };
      upDateTaskName({ variables: { id, name: taskName } });
    },
    [taskName]
  );
  const [deleteTask] = useMutation(gql.TASK_DELETE, {
    onError: error => {
      console.log(error);
    },
    onCompleted: () => {
      console.log('task delete');
      // (() => refetchTasks())();
      // console.log(refetchTasks);
    },
  });
  const handleDeleteTask = useCallback(
    id => {
      // const data = { ...task, timeStamp, date: date.toString(), user: { connect: { id: userId } } };
      deleteTask({ variables: { id } });
    },
    [taskName]
  );
  useEffect(() => {
    // inputRef
    console.log(inputRef.current);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTask]);
  return loading ? (
    <CircularProgress />
  ) : (
    <List dense className={classes.root}>
      {data.map(({ id, task, complited }) => {
        const labelId = `checkbox-list-secondary-label-${id}`;
        const edit = selectedTask === id;
        return (
          <ListItem className={classes.listItem} key={id} button onClick={() => handleEdit(id, task)}>
            {edit ? (
              <Input
                id="standard-adornment-password"
                fullWidth
                type={'text'}
                value={taskName}
                onChange={handleTaskNameChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      variant="contained"
                      aria-label="toggle password visibility"
                      onClick={() => saveTaskName(id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="toggle password visibility" onClick={() => handleUnSelectTask(id)}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            ) : (
              <Tooltip title="Editar" placement="left">
                <ListItemText id={labelId} primary={task} />
              </Tooltip>
            )}
            {!edit && (
              <ListItemSecondaryAction>
                {!complited && (
                  <>
                    <Checkbox
                      color="primary"
                      edge="end"
                      onChange={() => handleToggle(id)}
                      // checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                      className={classes.margin}
                    />
                    <IconButton aria-label="delete" className={classes.margin} onClick={() => handleDeleteTask(id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </ListItemSecondaryAction>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
