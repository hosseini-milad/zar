import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
export default function IdSlide(props) {
  const{Pic}=props
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {Pic.map((img,i)=>(<div key={i} className="embla__slide"><img src={img} alt={img} /></div>))}
        
      </div>
    </div>
  );
}
