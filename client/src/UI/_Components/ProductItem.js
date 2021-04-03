import React from 'react'
import { useHistory } from 'react-router-dom'
import Utils from '../../Rules/_Utils'


const ProductItem = (props) => {
    const history = useHistory();

    //hacer un hook propio para navegar
    const openDetail = () => {
        history.push(`/items/` + props.item.id);
    };
    

    return (<div className="item">
        <img id="picture" onClick={openDetail} src={props.item.picture} alt=""></img>
        <div className="header">
            <div className="price">
                <span className="amount" >${Utils.addDots(props.item.price.amount)}</span>
                <span className="cents" >{Utils.getDecimals(props.item.price.decimals)}</span>
            </div>
            <label className="title" onClick={openDetail}>{props.item.title}</label>
        </div></div>
    )
}

export default ProductItem