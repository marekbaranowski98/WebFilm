import React from 'react';

import './style.css';

interface PhotoTileProps {
    poster: string,
}

const PhotoTile: React.FC<PhotoTileProps> = ({poster}) => {
    return (
        <div className="photo-tile">
            <img src={poster}  alt="Zdjęcie "/>
        </div>
    );
};

export default PhotoTile;
