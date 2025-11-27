import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
    PrevButton,
    NextButton,
    usePrevNextButtons
} from './CarouselArrowButton'
import useEmblaCarousel from 'embla-carousel-react'

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)


    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="embla relative w-6xl">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide mx-5" key={index}>
                            <div className="embla__slide__number">{index + 1}</div>
                        </div>
                    ))}
                </div>
            </div>

            <PrevButton className={'absolute left-0 transform -translate-y-1/2 top-1/2'} onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton className={' border absolute right-0 transform -translate-y-1/2 top-1/2'} onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </section>
    )
}

export default Carousel
export { Carousel }
