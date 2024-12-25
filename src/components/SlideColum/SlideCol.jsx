import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Slide1 from "../../assets/Hero/Slide-1.webp";
import Slide2 from "../../assets/Hero/Slide-2.webp";
import "./SlideCol.css";
export default function SlideCol() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <img src={Slide1} alt="Slide1" />
        </div>
        
        
        <div className="embla__slide">
          <img src={Slide2} alt="Slide2" />
        </div>
        
      </div>
    </div>
  );
}
