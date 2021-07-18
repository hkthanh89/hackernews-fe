import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
}));

const Loading = ({ isLoading }) => {
  const classes = useStyles();

  if (isLoading) {
    return <div className={classes.loading}><CircularProgress /></div>
  }

  return null;
}

export default Loading;