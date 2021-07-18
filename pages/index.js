import React, { useState } from 'react';
import useSWR from 'swr';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Copyright from '../src/Copyright';
import Loading from '../src/Loading';
import fetcher from '../lib/fetcher';

const useStyles = makeStyles((theme) => ({
  heroButtons: {
    marginTop: theme.spacing(1),
  },
  title: {
    fontWeight: 'bold',
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

export default function ListNews() {
  const classes = useStyles();

  const [page, setPage] = useState(1);

  const { data, error } = useSWR(`http://localhost:3000/news?page=${page}`, fetcher)

  const isLoading = !data;

  const listNews = !isLoading ? data.data : []

  const handleNext = () => setPage(page => page + 1);
  const handleBack = () => setPage(page => page - 1);

  return (
    <React.Fragment>
      <main>
        {error && <div>Failed to load</div>}
        <Loading isLoading={isLoading} />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {listNews.map((news) => (
              <Grid item key={news.url} xs={12} sm={6} md={3}>
                <Link href={`/news?url=${news.url}`} underline="none">
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={news.cover_image_url}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="body1" component="h2" className={classes.title}>
                        {news.title}
                      </Typography>
                      <Typography gutterBottom variant="caption" component="h2" align="right">
                        {news.sub_title}
                      </Typography>
                      <Typography variant="body2" component="h2">
                        {news.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
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