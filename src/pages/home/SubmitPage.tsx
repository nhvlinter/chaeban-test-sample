import React, { FC, ReactNode, ReactElement, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, FormControl } from '@material-ui/core';
import { BasicLayout } from '../../layouts/BasicLayout';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  header:{
    display: 'block',
    fontSize: '1.17em',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    fontWeight: 'bold'
  },
  ckeditor: {
            '& h2': {
                display: 'block',
                fontSize: '1.5em',
                marginBlockStart: '0.83em',
                marginBlockEnd: '0.83em',
                marginInlineStart: '0px',
                marginInlineEnd: '0px',
                fontWeight: 'bold'
            },
            '& h3': {
                display: 'block',
                fontSize: '1.17em',
                marginBlockStart: '1em',
                marginBlockEnd: '1em',
                marginInlineStart: '0px',
                marginInlineEnd: '0px',
                fontWeight: 'bold'
            },
            '& h4': {
                display: 'block',
                marginBlockStart: '1.33em',
                marginBlockEnd: '1.33em',
                marginInlineStart: '0px',
                marginInlineEnd: '0px',
                fontWeight: 'bold'
            }
        },
}));
export const SubmitPage: FC<{}> = observer(({}) => {
    const classes = useStyles();
    const { routerStore, sChaeban } = useStore();
    const onBack = useCallback(() => {
        routerStore.goTo('home');
    }, []);
    return (<BasicLayout>
        <div className="header">
            <h3 className={classes.header}>{`Output Page`}</h3>
        </div>
        <FormControl className={classes.formControl}>
            <Button variant="contained" color="primary" onClick={onBack}>Back</Button>
          </FormControl>
    </BasicLayout>);
})