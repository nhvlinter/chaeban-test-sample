import React, { FC, ReactNode, ReactElement, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { BasicLayout } from '../../layouts/BasicLayout';
import styles from "./HomePage.module.scss";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const CKEditor = require('@ckeditor/ckeditor5-react');
//const ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
//import '@ckeditor/ckeditor5-build-classic/build/translations/vi';
import ChaebanCKEditor from './ChaebanCKEditor';
import { Paper, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createMuiTheme, ThemeProvider, Theme, useTheme  } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function Alert(props:any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    '& div.MuiFormControl-marginNormal': {
      marginTop: 0,
    }
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

export const HomePage: FC<{}> = observer(({}) => {
    const classes = useStyles();
    const theme = useTheme();
    const { routerStore, sChaeban } = useStore();
    useEffect(() => {
        sChaeban.init();
    }, []);
    const onReset = useCallback(() => {
        sChaeban.init();
    }, []);
    const onSubmit = useCallback(() => {
      if(sChaeban.date==null) {
        sChaeban.set_errMsg("Date is required!");
        return;
      }
      if(sChaeban.message=="") {
        sChaeban.set_errMsg("Message is required!");
        return;
      }
      if(sChaeban.themeId==1){
        sChaeban.set_theme(createMuiTheme({
                  palette: {
                    type: 'light',
                  },
                }));
      }
      if(sChaeban.themeId==2){
        sChaeban.set_theme(createMuiTheme({
                  palette: {
                    type: 'dark',
                  },
                }));
      }
      if(sChaeban.themeId==3){
        sChaeban.set_theme(createMuiTheme({
                  palette: {
                    type: 'light',
                    background:{
                      paper: '#FFCD33',
                    }
                  },
                }));
      }
      sChaeban.set_isSubmitted(true);
    }, []);
    const onBack = useCallback(() => {
        sChaeban.set_isSubmitted(false);
    }, []);
    const handleClose = useCallback(() => {
        sChaeban.set_errMsg("");
    }, []);
    const onThemeChange = useCallback((v: any) => {
        sChaeban.set_themeId(+v);
    }, []);
    return (<BasicLayout>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.header}>{sChaeban.isSubmitted ? `Output Page` : `Input Page`}</InputLabel>
        </FormControl>
        <div style={{ maxWidth: "100%", paddingTop:'50px' }}>
        <form className={classes.container} noValidate>
        <FormControl className={classes.formControl}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={sChaeban.date}
                onChange={(e) => sChaeban.set_date(e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                readOnly = {sChaeban.isSubmitted}
              /></Grid></MuiPickersUtilsProvider>
        </FormControl>
        {!sChaeban.isSubmitted && 
          (<FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Theme</InputLabel>
            <Select
              value={sChaeban.themeId} onChange={(event) => onThemeChange(event.target.value)}
              native
              inputProps={{
                name: 'age',
                id: 'age-native-simple',
              }}
            >
              <option value={1}>Light Theme</option>
              <option value={2}>Dark Theme</option>
              <option value={3}>Custom Theme</option>
            </Select>
          </FormControl>)}
          
        <FormControl className={classes.formControl} style={{width:'100%'}}>
          <InputLabel >Message</InputLabel>
        </FormControl>
          <Paper style={{width:'100%', minHeight: '200px', marginTop:'50px', marginRight:'20px'}}>
              <div className={classes.ckeditor}>
                  <CKEditor
                      disabled={sChaeban.isSubmitted}
                      id="editor"
                      config={{
                          language: 'en'
                      }}
                      editor={ChaebanCKEditor}
                      data={sChaeban.message}
                      onInit={editor => {
                          // You can store the "editor" and use when it is needed.
                              editor.setData(sChaeban.message);
                      }}
                      onChange={(event, editor) => {
                          const data = editor.getData();
                          sChaeban.set_message(data);
                          // console.log({ event, editor, data });
                      }}
                      onBlur={(event, editor) => {
                          // console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                          // console.log('Focus.', editor);
                      }}
                  />
              </div>
          </Paper>
          {!sChaeban.isSubmitted ? (<>
            <FormControl className={classes.formControl}>
              <Button variant="contained" onClick={onReset}>Reset</Button>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button variant="contained" color="primary" onClick={onSubmit}>Submit</Button>
            </FormControl>
            </>):(<FormControl className={classes.formControl}>
            <Button variant="contained" color="primary" onClick={onBack}>Back</Button>
          </FormControl>)}          
    </form>
        </div>
        <Snackbar open={sChaeban.errMsg!==""} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {sChaeban.errMsg}
          </Alert>
        </Snackbar>
    </BasicLayout>);
});




