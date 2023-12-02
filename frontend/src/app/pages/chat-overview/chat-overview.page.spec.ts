import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatOverviewPage } from './chat-overview.page';

describe('ChatOverviewPage', () => {
  let component: ChatOverviewPage;
  let fixture: ComponentFixture<ChatOverviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
