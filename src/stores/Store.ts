import { observable, action, computed, reaction, runInAction } from "mobx";

import { uniqBy } from "lodash-es";
import { routes, notFound, homeRoute } from "../routes";
import { RouterStore, HistoryAdapter,  } from "mobx-state-router";
import {history} from "../services/history";
import {BaseStore} from "./BaseStore";
import {ChaebanSampleStore} from "./ChaebanSampleStore";
import { createMuiTheme, ThemeProvider, Theme } from '@material-ui/core/styles';
export class Store extends BaseStore {
    routerStore         : RouterStore;
    constructor() {
        super();
        this.routerStore = new RouterStore(this, routes, notFound);
        const historyAdapter = new HistoryAdapter(this.routerStore, history);
        historyAdapter.observeRouterStateChanges();
    }
    sChaeban = new ChaebanSampleStore(this);
}
