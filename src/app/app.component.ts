import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import json from './mock-data.json';

@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './app.component.css'
    ],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    demoNo = 1
    public treeConfig = {
        nodeWidth: 150,
        nodeHeight: 150
    };

    public tree: any;


    public ngOnInit() {
        this.tree = {
            json,
            config: this.treeConfig
        };
    }
    get demo() {
        return this.demoNo
    }
    set demo(no: number) {
        this.demoNo = no
    }
    public setDemo(no: number) {
        this.demo = no
    }
}
