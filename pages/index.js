import React, { useState } from 'react';
import useSWR from 'swr'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Copyright from '../src/Copyright';
import fetch from 'unfetch';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  loading: {
    textAlign: 'center',
    margin: theme.spacing(2)
  },
  heroButtons: {
    marginTop: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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

const fetcher = url => fetch(url).then(r => r.json())

export default function ListNews() {
  const classes = useStyles();

  const [page, setPage] = useState(7);

  const { data, error } = useSWR(`http://localhost:3000/news?page=${page}`, fetcher)

  const isLoading = !data;

  const listNews = !isLoading ? data.data : []

  console.log(listNews)

  const handleNext = () => setPage(page => page + 1);
  const handleBack = () => setPage(page => page - 1);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Best Hacker News
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {error && <div>Failed to load</div>}
        {isLoading && <div className={classes.loading}><CircularProgress /></div>}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {listNews.map((news) => (
              <Grid item key={news.url} xs={12} sm={6} md={3}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={news.cover_image_url}
                    isMediaComponent
                    src={news.cover_image_url}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {news.title}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="h2">
                      {news.sub_title}
                    </Typography>
                    <Typography variant="body2" component="h2">
                      {news.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className={classes.heroButtons}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item>
                {page > 1 && (
                  <Button variant="outlined" color="primary" onClick={handleBack}>
                    Back
                  </Button>
                )}
              </Grid>
              {listNews.length > 0 && (
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    Next
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Best News from Hacker News
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}