import { TestBed } from '@angular/core/testing';

import { DatavizService } from './dataviz.service';

describe('DatavizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatavizService = TestBed.get(DatavizService);
    expect(service).toBeTruthy();
  });
});
