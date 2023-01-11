import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreeComponent } from './tree.component';
import { NodeComponent } from './node';
import { NodesListService } from './services/nodes-list.service';
import { MatIconModule } from '@angular/material/icon'

@NgModule({
    declarations: [
        TreeComponent,
        NodeComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
    ],
    exports: [
        TreeComponent,
        NodeComponent
    ],
    providers: [
        NodesListService
    ]
})
export class TreeDiagramModule {

}
