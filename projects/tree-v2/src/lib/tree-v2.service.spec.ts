import { TestBed } from '@angular/core/testing';

import { TreeV2Service } from './tree-v2.service';

describe('TreeV2Service', () => {
  let service: TreeV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
