import React, {useEffect, useRef, useState} from 'react';

import './style.css';
import error from '../../images/error.svg';
import {convertRemToPx} from '../../helpers/calc'
import useWindowsDimensions from '../../hooks/useWindowsDimensions';
import Alert from '../../components/Alert';

interface CarouselTilesProps {
    children: React.ReactNode[],
    header: string,
    sizeTileInRem: number,
    infiniteLoop: boolean,
    isError: boolean,
}

const CarouselTiles: React.FC<CarouselTilesProps> = ({children,  header, sizeTileInRem, infiniteLoop, isError}) => {
    const contentDiv = useRef<HTMLDivElement>(null);

    const [countShowElements, setCountShowElements] = useState(0);
    const [currentIndexChildren, setCurrentIndexChildren] = useState(0);
    const [lengthChildren, setLengthChildren] = useState(children.length);
    const [isRepeating, setIsRepeating] = useState(false);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    const { heightWindow, widthWindow } = useWindowsDimensions();

    useEffect(() => {
        if (contentDiv.current) {
            setCountShowElements(Math.floor(contentDiv.current.offsetWidth / convertRemToPx(sizeTileInRem + 1)))
        }
    }, [widthWindow, lengthChildren]);

    useEffect(() => {
        setLengthChildren(children.length);
        if (infiniteLoop) {
            setCurrentIndexChildren(countShowElements);
            setIsRepeating(children.length > countShowElements);
        }
    }, [countShowElements, children, infiniteLoop]);

    useEffect(() => {
        if (isRepeating && (currentIndexChildren === countShowElements || currentIndexChildren === lengthChildren)) {
            setTransitionEnabled(true);
        }
    }, [isRepeating, currentIndexChildren, countShowElements, lengthChildren]);

    const next = () => {
        if (isRepeating || currentIndexChildren < (lengthChildren - countShowElements)) {
            if (currentIndexChildren >= lengthChildren) {
                setCurrentIndexChildren(countShowElements);
            } else if (currentIndexChildren + countShowElements > lengthChildren) {
                setCurrentIndexChildren(x => 2 * x + countShowElements - lengthChildren);
            }else {
                setCurrentIndexChildren(x => x + countShowElements);
            }
        }
    };

    const prev = () => {
        if (isRepeating || currentIndexChildren > 0) {
            if (currentIndexChildren <= countShowElements) {
                setCurrentIndexChildren(lengthChildren);
            } else if (countShowElements > currentIndexChildren - countShowElements) {
                setCurrentIndexChildren(countShowElements);
            }else {
                setCurrentIndexChildren(x => x - countShowElements);
            }
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchPosition(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchPosition === null) {
            return;
        }

        const diff = touchPosition - e.touches[0].clientX;
        if (diff > 5) {
            next();
        }
        if (diff < 5) {
            prev();
        }
        setTouchPosition(null);
    };

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndexChildren === 0) {
                setTransitionEnabled(false);
                setCurrentIndexChildren(lengthChildren);
            }else if (currentIndexChildren === lengthChildren + countShowElements) {
                setTransitionEnabled(false);
                setCurrentIndexChildren(countShowElements);
            }
        }
    };

    const renderExtraPrev = () => {
        let out = [];
        for (let i = 0; i < countShowElements; i++) {
            out.push(children[lengthChildren - 1 - i]);
        }
        out.reverse();

        return out;
    };

    const renderExtraNext = () => {
        let out = [];
        for (let i = 0; i < countShowElements; i++) {
            out.push(children[i]);
        }
        return out;
    };

    return (
        <div className="carousel-container">
            <h2>{header}</h2>
            {children.length > 0 ?
                <div className="carousel-wrapper">
                    {(isRepeating || currentIndexChildren > 0) &&
                    <div className="arrow expend-button arrow-left arrow-carousel" onClick={prev}/>
                    }
                    <div
                        className="carousel-content-wrapper"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <div
                            className="carousel-content"
                            ref={contentDiv}
                            onTransitionEnd={handleTransitionEnd}
                            style={{
                                transform: `translateX(-${(currentIndexChildren) * (100 / (contentDiv.current ? contentDiv.current.offsetWidth / convertRemToPx(sizeTileInRem + 1) : countShowElements))}%)`,
                                transition: !transitionEnabled ? 'none' : undefined,
                            }}>
                            {(lengthChildren > countShowElements && isRepeating) && renderExtraPrev()}
                            {children}
                            {(lengthChildren > countShowElements && isRepeating) && renderExtraNext()}
                        </div>
                    </div>
                    {(isRepeating || currentIndexChildren < (lengthChildren - countShowElements)) &&
                    <div className="arrow expend-button arrow-right arrow-carousel" onClick={next}/>
                    }
                </div>
                : isError ? <Alert message='Brak filmów' icon={error} /> : <h3>...</h3>
            }
        </div>
    );
};

export default CarouselTiles;
