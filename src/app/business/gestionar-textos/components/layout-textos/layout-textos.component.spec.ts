import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTextosComponent } from './layout-textos.component';

describe('LayoutTextosComponent', () => {
  let component: LayoutTextosComponent;
  let fixture: ComponentFixture<LayoutTextosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutTextosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutTextosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
