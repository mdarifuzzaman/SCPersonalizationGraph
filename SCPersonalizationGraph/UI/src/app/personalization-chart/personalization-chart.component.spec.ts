import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizationChartComponent } from './personalization-chart.component';

describe('PersonalizationChartComponent', () => {
  let component: PersonalizationChartComponent;
  let fixture: ComponentFixture<PersonalizationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
