import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyTiposComponent } from './body-tipos.component';

describe('BodyTiposComponent', () => {
  let component: BodyTiposComponent;
  let fixture: ComponentFixture<BodyTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyTiposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
