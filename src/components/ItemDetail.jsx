import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';
import Images from '../data/imageData';
import React from 'react';

const ItemDetail = ({ bodyParts, handleItemClick, handlePaintClick, paletteVisible, handleColorClick }) => {

    const location = useLocation();
    const currentPath = location.pathname.substring(1);
    const currentBodyParts = bodyParts.filter((bodyPart) => `${bodyPart.category}/${bodyPart.name}` === currentPath);

    return (
        <>
            <ul className='container-items'>
                {currentBodyParts.map((currentBodyPart) => (
                    <React.Fragment key={currentBodyPart.idNo}>
                        {currentBodyPart.items.map((item, itemIndex) => (
                        <li key={item.itemId} 
                            onClick={() => handleItemClick(currentBodyPart.idNo, itemIndex, item.itemName)}>

                            <figure className={`item ${item.bool ? 'selected' : ''}`}>
                                <img src={Images[item.itemName]} alt={item.itemName} />
                                <span className={`paint-icon ${item.bool && item.itemName !== 'nothing' ? '' : 'hidden'}`}
                                    onClick={(event) => handlePaintClick(event)}>
                                </span>
                            </figure>

                            <div className={`paletteContainer ${paletteVisible && item.bool ? '' : 'hidden'}`}
                                style={{ opacity: item.itemName === 'nothing' ? '0' : '1'}}>
                                <div className="colorPalette">
                                    {item.colors.map((color, colorIndex) => (
                                        <span 
                                            key={colorIndex} 
                                            className="color" 
                                            style={{ backgroundColor: color, cursor: color === undefined ? 'auto' : 'pointer' }}
                                            onClick={() => handleColorClick(color, item.itemName)}
                                        >   
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </li>
                    ))}
                    </React.Fragment>
                ))}
            </ul>
        </>
    );
}

ItemDetail.propTypes = {
    bodyParts: PropTypes.array.isRequired,
    handleItemClick: PropTypes.func.isRequired,
    handlePaintClick: PropTypes.func.isRequired,
    paletteVisible: PropTypes.bool.isRequired,
    handleColorClick: PropTypes.func.isRequired,
};

export default ItemDetail