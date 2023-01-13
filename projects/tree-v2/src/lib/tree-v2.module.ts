import { NgModule } from '@angular/core';
import { TreeV2Component } from './tree-v2.component';
import { NodesV2ListService } from './services/nodes-v2-list.service';
import { NodeV2Component } from './node-v2';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [TreeV2Component, NodeV2Component],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    TreeV2Component,
    NodeV2Component
  ],
  providers: [NodesV2ListService]
})
export class TreeV2Module { }
