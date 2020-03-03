import React, { useState, useEffect, useRef } from 'react';
import { Button, TextField, IconButton, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useCallback } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DateButton from './DateButton';
import { useMutation, useQuery } from 'react-apollo';
import * as gql from 'shared/graphql';
import moment from 'moment';
import { useClient } from '../../../Context';
const useStyles = makeStyles(theme => ({
  timeAction: {
    display: 'inline-flex',
    marginLeft: 'auto',
    position: 'relative',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  inputTask: {
    margin: '0',
    marginBottom: '8px',
  },
  inputDate: {
    visibility: 'hidden',
    position: 'abosolute',
  },
}));
const nextMonth = moment(moment(moment().format('YYYY-MM-DD')).add(30, 'days')).valueOf();
export default function AddTask({ active, userId, refetchTasks }) {
  const classes = useStyles();
  const [showAddTask, setShowAddTask] = useState(false);
  const [task, setTask] = useState({
    task: '',
    timeStamp: 0,
    complited: false,
  });
  const inputRef = useRef();
  const [tasks, setTasks] = useState([]);
  const toggleShowTask = useCallback(() => {
    setShowAddTask(show => {
      if (show) {
        setTask({
          task: '',
          timeStamp: 0,
          complited: false,
        });
      }
      return !show;
    });
  }, []);
  const handleChangeTask = useCallback(({ target }) => {
    const { value } = target;
    setTask(item => ({ ...item, task: value }));
  }, []);
  const setTaskDate = useCallback(date => {
    setTask(item => ({ ...item, timeStamp: date }));
  }, []);
  useEffect(() => {
    const { current } = inputRef;
    if (current) current.focus();
  }, [inputRef, task]);
  // const { loading: loadingTasks } = useQuery(gql.QUERY_TASK_BY_RANGE, {
  //   variables: { user: userId, start: 0, end: nextMonth },
  //   onCompleted: (tasksList) => {},
  // });
  const [addTask, { loading: mutationLoading }] = useMutation(gql.ADD_TASK, {
    onCompleted: object => {
      toggleShowTask();
      // (() => refetchTasks())();
    },
  });
  const saveTask = useCallback(() => {
    const date =
      task.timeStamp && task.timeStamp !== 0 ? task.timeStamp : moment(moment().format('YYYY/MM/DD')).valueOf();
    const timeStamp = moment(date).format('YYYY-MM-DD');
    const data = { ...task, timeStamp, date: date.toString(), user: { connect: { id: userId } } };
    addTask({ variables: { data } });
  }, [task, userId]);
  if (active === 'inbox') {
    return null;
  }
  return (
    <>
      {showAddTask ? (
        <>
          <div>
            <TextField
              id="standard-full-width"
              placeholder="Tarea"
              fullWidth
              margin="normal"
              className={classes.inputTask}
              inputRef={inputRef}
              value={task.task}
              onChange={handleChangeTask}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={classes.actions}>
              <Button variant="contained" color="primary" onClick={saveTask}>
                {mutationLoading ? <CircularProgress color="inherit" size={24} /> : 'Agregar'}
              </Button>
              <Button onClick={toggleShowTask}>Cancelar</Button>
              <div className={classes.timeAction}>
                <DateButton set={setTaskDate} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={toggleShowTask}>
          Agregar tarea
        </Button>
      )}
    </>
  );
}
