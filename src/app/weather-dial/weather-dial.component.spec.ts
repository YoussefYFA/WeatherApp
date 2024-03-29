import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDialComponent } from './weather-dial.component';

describe('WeatherDialComponent', () => {
  let component: WeatherDialComponent;
  let fixture: ComponentFixture<WeatherDialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherDialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
