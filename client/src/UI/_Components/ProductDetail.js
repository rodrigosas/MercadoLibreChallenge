import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemsRules from '../../Rules/ItemsRules'
import Utils from '../../Rules/_Utils'

const ProductDetail = () => {
    const { id } = useParams()
    const [product, updateProduct] = useState({});
    const [categories, updateCategories] = useState({});

    useEffect(() => {
        ItemsRules.getItemDetail(id).then((res) => {
            updateProduct(res.item)
            updateCategories(res.categories)
        })
    }, [])

    return Object.keys(product).length === 0 ?
        <div className="content">
            <div className="breadcrumb">|</div>
            <div className="detail empty">  </div></div> : ((<div className="content">
            <div className="breadcrumb">{Utils.getBreadCrumb(categories)}</div>
                <div className="detail">
                    <div className="productInfo">
                        <img id="picture" src={product.picture} alt=""></img>
                        <div className="info">
                            <div className="infoExtra">
                                <label className="condition" >{product.condition === "new" ? "Nuevo" : "Usado"}</label>
                                <label className="quantity" >{product.sold_quantity === 0 ? "" : " | " + product.sold_quantity + " vendidos"}</label>
                            </div>
                            <label className="title" >{product.title}</label>
                            <div className="price">
                                <span className="amount" >${Utils.addDots(product.price.amount)}</span>
                                <span className="cents" >{Utils.getDecimals(product.price.decimals)}</span>
                            </div>
                            <button>
                                Comprar
                </button>
                        </div>
                    </div>
                    {product.description != "" ?
                        (<div className="productDescription">
                            <label className="titleDescription">Descripción del producto</label>
                            <p className="description">{product.description}</p>
                        </div>) : ""
                    }
                </div>

            </div>)
        )
}

export default ProductDetail