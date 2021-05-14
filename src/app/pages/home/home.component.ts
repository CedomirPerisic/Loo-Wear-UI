import { Component, OnDestroy, OnInit } from '@angular/core';
import { routeAnimation } from '@app/shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sliderImage: number = 1;

  constructor() {
    this.slideshowTimer();
  }

  ngOnInit(): void {}

  /**
  * It changes slides every 5 seconds.
  */
  slideshowTimer(){
    if (this.sliderImage < 4) {
      this.sliderImage = this.sliderImage + 1;
    } else {
      this.sliderImage = 1;
    }
    setTimeout(()=>{
      this.slideshowTimer()  
    }, 5000);
  }

  /**
  * It selects a slide in the slideshow.
  */
  selectSlideshowImage(img: number){
    this.sliderImage = img;
  }

  ngOnDestroy(): void {}
}
