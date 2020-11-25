import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from "../../stores";

import { Toolbar, IconButton, Typography, Badge, InputBase } from "@material-ui/core";
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles';
import {Menu, GitHub, AccountCircle, Brightness4, Search} from "@material-ui/icons";

import styles from "./GlobalHeader.module.scss";

import classNames from 'classnames';

export const GlobalHeader = observer(() => {
    const {sLeftNav} = useStore();
    return (
    	<Toolbar className={styles.toolbar}>
          <IconButton className={classNames(styles.menuButton,!sLeftNav.collapsed && styles.menuButtonHidden)} color="inherit" aria-label="Menu" onClick={()=>sLeftNav.toggleLeftNavCollapsed()}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" className={styles.title}>
            Chaeban Test Sample
          </Typography>
          <IconButton title="GitHub Repository" color="inherit" onClick={()=>{window.open('https://github.com/nhvlinter/chaeban-test-sample', '_blank')}}>
              <GitHub />
          </IconButton>
        </Toolbar>
    );
});




