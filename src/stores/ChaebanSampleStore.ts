import { observable, action } from "mobx";
import { BaseStore } from "./BaseStore";
import { aFetch } from "../services/api/fetch";
import { createMuiTheme, ThemeProvider, Theme } from '@material-ui/core/styles';

export class ChaebanSampleStore{
    @observable date: Date|null = null;
    @observable message: string = "";
    @observable themeId: number = 1;
    @observable theme: Theme = createMuiTheme({
        palette: {
            type: 'light',
        },
    });
    @observable isSubmitted: boolean = false;
    @observable errMsg: string = "";
    constructor(private store: BaseStore) {
    }
    @action async init(){
        this.set_date(null);
        this.set_message("");
        this.set_themeId(1);
        this.set_errMsg("");
        this.set_theme(createMuiTheme({
            palette: {
                type: 'light',
            },
        }));
    }
    @action set_date    = (v: Date|null) => { this.date    = v;}
    @action set_message = (v: string) => { this.message = v;}
    @action set_themeId   = (v: number) => { this.themeId   = v;}
    @action set_isSubmitted   = (v: boolean) => { this.isSubmitted   = v;}
    @action set_errMsg = (v: string) => { this.errMsg = v;}
    @action set_theme   = (v: Theme) => { 
        this.theme   = v;
        document.body.style.backgroundColor = this.theme.palette.background.paper;
    }
}