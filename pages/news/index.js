import React from 'react';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Loading from '../../src/Loading';
import { fetcher } from '../../lib/fetcher';

const useStyles = makeStyles((theme) => ({
  image: {
    width: "100%",
    height: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  }
}));

export default function News() {
  const classes = useStyles()
  const router = useRouter()
  const { url } = router.query

  const { data, error } = useSWR(url ? `${process.env.NEXT_PUBLIC_API_URL}?url=${url}` : null, fetcher)

  const isLoading = !data;

  const news = !isLoading ? data.data : {}

  return (
    <React.Fragment>
      <main>
        <Loading isLoading={isLoading} />
        <Container maxWidth="md">
          <img src={news.cover_image_url} alt={news.title} className={classes.image} />
          <Typography gutterBottom variant="h4" component="h2" align="center">
            {news.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </Container>
        <Container maxWidth="md" className={classes.buttonContainer}>
          <Link href="/">
            <Button variant="outlined" color="primary">
              Back
            </Button>
          </Link>
        </Container>
      </main>
    </React.Fragment>
  )
}