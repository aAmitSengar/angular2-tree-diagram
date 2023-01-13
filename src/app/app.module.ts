import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeDiagramModule } from '../../projects/ng-tree-diagram/src/ng-tree-diagram';
import { TreeV2Module } from 'projects/tree-v2/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TreeDiagramModule, TreeV2Module],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
