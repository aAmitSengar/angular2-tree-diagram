import { Component, OnInit, Input } from '@angular/core';
import { NodesV2ListService } from './services/nodes-v2-list.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'lib-tree-v2',
  templateUrl: './tree-v2.component.html',
  styleUrls: ['./tree-v2.component.scss']
})
export class TreeV2Component implements OnInit {
  public nodes;
  private config = {
    nodeWidth: 200,
    nodeHeight: 100
  };
  // private paneDragging = false;
  // private paneTransformState;
  // private zoom = 1;
  // private paneX = 0;
  // private paneY = 0;
  // private rotationAngleState;
  // private rotateAngle = 270
  keysState=1
  public rotating = false
  @Input() set data(data: { config: any; json: any[] }) {
    if (!data || !Array.isArray(data.json)) {
      return;
    }

    if (typeof data.config === 'object') {
      this.config = Object.assign(this.config, data.config);
    }

    this.nodes = this.nodesSrv.loadNodes(data.json, this.config);
  }
  constructor(
    private nodesSrv: NodesV2ListService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }
  public get nodeMaker() {
    return this.nodesSrv.makerNode();
  }

  public newNode() {
    this.nodesSrv.newNode();
  }
  public preventMouse(event) {
    event.stopPropagation();
  }
}
