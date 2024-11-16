import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTextosComponent } from './body-textos.component';

describe('BodyTextosComponent', () => {
  let component: BodyTextosComponent;
  let fixture: ComponentFixture<BodyTextosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTextosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyTextosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
