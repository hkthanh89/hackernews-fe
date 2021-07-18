import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Header() {
  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Link href="/" underline="none">
            <Typography variant="h6" noWrap style={{color: '#fff'}}>
              Best Hacker News
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}