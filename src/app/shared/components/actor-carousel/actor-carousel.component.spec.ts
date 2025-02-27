import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorCarouselComponent } from './actor-carousel.component';

describe('ActorCarouselComponent', () => {
  let component: ActorCarouselComponent;
  let fixture: ComponentFixture<ActorCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
