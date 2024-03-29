import React from 'react'
import '../../CSS/Center.css'
import call from '../../API/API'
import { useState, useEffect } from 'react'
import PRODUCT_OPTIONS from '../../DATA/ProductOptions'
import { NavLink } from 'react-router-dom'
import URL from '../../DATA/URL.jsx';
// const LoadingImageWithPosition = (images,position) =>{
//     images.map((image,index) => {
//         if(image.position===position) return (<img className="image" key={index} src={`${URL}/${image.name}`} alt={image.nameImage}/>);
//         // return (image.position === position) ? (<img className="image" key={index} src={`${URL}/${image.name}`} alt={image.nameImage}/>) : <div></div>
//     })
// }
const LoadingImageWithPosition = (image, index, position) => {
    if (image.position === position) {
        if (position !== 'bottom') return (<NavLink className={'image' + image.position} key={index} to={image.path}>
            <img className={'image' + image.position + '-item'}
                src={`${URL}/Images/Panels/${image.nameImage}`}
                alt={image.nameImage} /></NavLink>);
        else return (<NavLink className="image-item" key={index} to={image.path}>
            <img className={'image' + image.position}
                src={`${URL}/Images/Panels/${image.nameImage}`}
                alt={image.nameImage} />
        </NavLink>)
    }
    //return (<img className="image" key={index} src={`${URL}/Images/Panels/slideshow3.png`} alt={image.nameImage} />)
}
const LoadingProductOptions = (item, index) => {
    return (<NavLink className="pro-list-item" key={index} to={item.path}>
        {item.icon()}
        <p className="pro-list-item-text">{item.optionName}</p>
    </NavLink>)
}
export default function Center() {
    const [images, setImages] = useState([])
    useEffect(() => {
        call('GET', 'lappee/image', null).then(res => setImages(res.data)).catch(err => console.log("Errol when try to get Image API"));
    }, [])
    return (
        <div className="center">
            <div className="center-panel">
                <div className="pro-list">
                    {PRODUCT_OPTIONS.map((PRODUCT_OPTION, index) => LoadingProductOptions(PRODUCT_OPTION, index))}
                </div>
                <div className="center-image">
                    <div className="center-image-top">
                        <div className="center-image-top-center">
                            <div className="center-image-top-center-slider">
                                {
                                    //  LoadingImageWithPosition(images,'center')
                                    images.map((image, index) => LoadingImageWithPosition(image, index, 'center'))
                                }
                            </div>
                        </div>
                        <div className="center-image-top-right">
                            {
                                images.map((image, index) => LoadingImageWithPosition(image, index, 'right'))
                            }
                        </div>
                    </div>
                    <div className="center-image-bottom">

                    </div>
                </div>
            </div>
            <div className="bottom-panel">
                {
                    images.map((image, index) => LoadingImageWithPosition(image, index, 'bottom'))
                }
            </div>
        </div>
    )
}
