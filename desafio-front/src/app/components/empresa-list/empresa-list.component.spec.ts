import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaListComponent } from './empresa-list.component';

describe('EmpresaListComponent', () => {
  let component: EmpresaListComponent;
  let fixture: ComponentFixture<EmpresaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaListComponent]
    });
    fixture = TestBed.createComponent(EmpresaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
