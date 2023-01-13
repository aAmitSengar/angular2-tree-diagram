import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NodesV2ListService } from '../services/nodes-v2-list.service';
import { TreeDiagramNode } from '../classes/node-v2.class';
import { TreeDiagramNodeMaker } from '../classes/nodev2-maker.class';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tree-diagram-node-v2',
  styleUrls: ['./node-v2.component.scss'],
  templateUrl: './node-v2.component.html'
})
export class NodeV2Component {
  public node: TreeDiagramNode | TreeDiagramNodeMaker;
  public childrenTransform;
  private readonly isRtl: boolean;

  constructor(
    private nodesSrv: NodesV2ListService,
    private sanitizer: DomSanitizer
  ) {
    this.isRtl = document.getElementsByTagName('html')[0].getAttribute('dir') === 'rtl';
  }
  @Input() keysState = 3
  @Input() set nodeId(guid) {
    this.node = this.nodesSrv.getNode(guid);

    // let aaa=document.getElementById(`tree-node-${guid}`)
    // let rect = aaa.getBoundingClientRect();
    // console.log(rect.top, rect.right, rect.bottom, rect.left);

    let calculation = `translate(calc(-30% + ${Math.round(
      this.node.width
    )}px), 0)`;

    if (this.isRtl) {
      calculation = `translate(calc(50% - ${Math.round(
        this.node.width / 2
      )}px), 45px)`;
    }

    this.childrenTransform = this.sanitizer.bypassSecurityTrustStyle(
      calculation
    );
  }

  onNodeBlur(event, nodeId) {
    const node = this.nodesSrv.getNode(nodeId);

    node.displayName = event.target.innerText;
  }
  get transformation() {
    return this.sanitizer.bypassSecurityTrustStyle(`rotate(${(4 - this.keysState) * 90}deg)`);
  }
}
