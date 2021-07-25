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
import Link from 'next/link';
import Copyright from '../src/Copyright';
import Loading from '../src/Loading';
import { fetcher } from '../lib/fetcher';

import News from './news';

const useStyles = makeStyles((theme) => ({
  heroButtons: {
    marginTop: theme.spacing(1),
  },
  title: {
    fontWeight: 'bold',
  },
  newsLink: {
    textDecoration: 'none',
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
  error: {
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: 'red',
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function HomePage() {
  return (
    <React.Fragment>
      <News />
    </React.Fragment>
  );
}