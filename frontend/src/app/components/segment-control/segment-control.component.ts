import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-segment-control',
  templateUrl: './segment-control.component.html',
  styleUrls: ['./segment-control.component.scss'],
})
export class SegmentControlComponent {
  @Output() segmentChange = new EventEmitter<string>();
  activeSegment: string = 'found';
  constructor() { }

  onSegmentChange(event: any) {
    this.segmentChange.emit(event.detail.value);
  }

}
