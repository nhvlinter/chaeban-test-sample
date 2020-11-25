import { observable, action } from "mobx";
import { BaseStore } from "./BaseStore";

export class LeftNavStore {
    @observable selectedKey = "home";
    @observable collapsed = true;
    @observable isCollapsedPaper = true;
    constructor(private store: BaseStore) {
    }

    @action set_selectedKey        = (v: string)           => {this.selectedKey = v;}
    @action toggleLeftNavCollapsed = ()                   => {
        this.collapsed = !this.collapsed;
    }
    @action setLeftNavCollapsed    = (v: boolean)         => {
        this.collapsed = v;
    }

    @action togglePaperCollapsed = () => {
        this.isCollapsedPaper = !this.isCollapsedPaper;
    }
}
