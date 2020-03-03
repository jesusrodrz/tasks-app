import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { AuthButton } from '../../components/AuthButton';
import ListTasks from '../../components/ListTasks';
import * as gql from 'shared/graphql';
import { withAuth } from '@8base/react-sdk';
import { graphql, useQuery, useSubscription } from 'react-apollo';
import AddTask from './Components/AddTask';
import { useCallback } from 'react';
import moment from 'moment';
import Tasks from './Components/Tasks';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  logOut: {
    background: 'white',
    marginLeft: 'auto',
    '&:hover': {
      background: 'white',
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '65vh',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const nextMonth = moment(moment(moment().format('YYYY-MM-DD')).add(30, 'days')).valueOf();
const today = moment(moment().format('YYYY-MM-DD')).valueOf();
const tomorrow = moment(moment(moment().format('YYYY-MM-DD')).add(1, 'day')).valueOf();
const week = moment(moment(moment().format('YYYY-MM-DD')).add(7, 'days')).valueOf();
function App(props) {
  const classes = useStyles();
  const userQuery = useQuery(gql.CURRENT_USER_QUERY_ID);
  const userId = userQuery?.data?.user?.id;
  const [taskFilter, setTaskFilter] = useState('all');
  const [tasks, setTasks] = useState([]);
  const onCompleteQueryTasks = useCallback(({ tasksList }) => {
    // console.log(taskList);
    setTasks(tasksList.items);
  }, []);
  let QUERY;

  if (taskFilter === 'all') {
    QUERY = [
      gql.QUERY_TASKS_ALL,
      {
        variables: { user: userId },
        onCompleted: onCompleteQueryTasks,
      },
    ];
  } else if (taskFilter === 'inbox') {
    QUERY = [
      gql.QUERY_TASKS_COMPLITED,
      {
        variables: { user: userId },
        onCompleted: onCompleteQueryTasks,
      },
    ];
  } else if (taskFilter === 'today') {
    QUERY = [
      gql.QUERY_TASK_BY_RANGE,
      {
        variables: { user: userId, start: today, end: tomorrow },
        onCompleted: onCompleteQueryTasks,
      },
    ];
  } else if (taskFilter === 'week') {
    QUERY = [
      gql.QUERY_TASK_BY_RANGE,
      {
        variables: { user: userId, start: today, end: week },
        onCompleted: onCompleteQueryTasks,
      },
    ];
  }
  const { loading: loadingTasks, refetch: refetchTasks } = useQuery(...QUERY);
  console.log(loadingTasks);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            App de Tareas
          </Typography>
          <Button variant="outlined" color="primary" className={classes.logOut} component={AuthButton}>
            Cerrar Sesion
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <ListTasks setFilter={setTaskFilter} active={taskFilter} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Tareas
                  </Typography>
                  <Button variant="outlined" color="primary" className={classes.logOut} onClick={() => refetchTasks()}>
                    Refresh
                  </Button>
                  <Tasks
                    active={taskFilter}
                    data={tasks}
                    refetchTasks={() => {
                      console.log('refress');
                      refetchTasks();
                    }}
                    loanding={loadingTasks}
                  />
                  <AddTask active={taskFilter} userId={userId} refetchTasks={() => refetchTasks()} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
export default App;
