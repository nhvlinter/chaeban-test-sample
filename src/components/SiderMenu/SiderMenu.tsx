import React, { FC, CSSProperties, useMemo, useCallback } from 'react';
import { observer, useComputed } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import { useStore } from '../../stores';

import { Drawer, ListItem, ListItemText,ListItemIcon, IconButton, Divider, MenuList, MenuItem, List, Collapse } from '@material-ui/core';

import {Contacts, Home, Receipt, Event, ExpandLess, ExpandMore, LibraryBooks, Description } from '@material-ui/icons';

import { Link } from '../router/Links';

import styles from "./Sider.module.scss";

import classNames from 'classnames';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

export const SiderMenu: FC<{collapsed:boolean}> = observer(({collapsed}) => {
    const {sLeftNav, routerStore} = useStore();
    const classes = useStyles();
    const open=true;
    const handleItemClick= useCallback((routeName: string) => {
      sLeftNav.set_selectedKey(routeName);
      routerStore.goTo(routeName);
      console.log(sLeftNav.selectedKey);
    },[sLeftNav]);
    return (
        <Drawer
          variant="permanent"
          className={classNames(styles.drawer,collapsed ? styles.drawerClose : styles.drawerOpen)}
          classes={{ paper: classNames(collapsed ? styles.drawerClose : styles.drawerOpen)}}
          open={!collapsed}
        >
        <div className={styles.toolbarIcon}>
            <IconButton onClick={() => handleItemClick("home")}>
            <Home />
            </IconButton>
          </div>
        <Divider />
        {/*<List>
            <ListItem button onClick={() => handleItemClick("events")} selected={sLeftNav.selectedKey == "events"}>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary="Sự kiện" />
            </ListItem>
            <ListItem button onClick={() => sLeftNav.togglePaperCollapsed()} selected={sLeftNav.selectedKey == "papers"}>
              <ListItemIcon>
                <Receipt />
              </ListItemIcon>
                <ListItemText primary="Văn bản" />
                {!sLeftNav.isCollapsedPaper ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={!sLeftNav.isCollapsedPaper} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested} onClick={() => handleItemClick("documentary")}>
                    <ListItemIcon>
                        <Description />
                    </ListItemIcon>
                    <ListItemText primary="Công văn" />
                  </ListItem>
                  <ListItem button className={classes.nested} onClick={() => handleItemClick("material")}>
                    <ListItemIcon>
                        <LibraryBooks />
                    </ListItemIcon>
                    <ListItemText primary="Tư liệu" />
                  </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={() => handleItemClick("contacts")} selected={sLeftNav.selectedKey == "contacts"}>
              <ListItemIcon>
                <Contacts />
              </ListItemIcon>
              <ListItemText primary="Danh bạ" />
            </ListItem>
        </List>*/}
        </Drawer>)
});

