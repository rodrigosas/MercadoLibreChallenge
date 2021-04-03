import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem.js'
import _Utils from '../../Rules/_Utils'

const ProductList = (props) => {
        const param = new URLSearchParams(props.location.search).get("search");

        useEffect(() => {
                props.onSearchChange(param);
        }, []);


        return ((props.items === {} ||
                props.items === undefined) || props.isFetching ? <div className="content" /> : (<div className="content">
                        <div className="breadcrumb">{_Utils.getBreadCrumb(props.categories)}</div>
                        {props.items.map((item, i) => {
                                return <ProductItem key={item.id} item={item}></ProductItem>
                        })
                        }</div>)
        )
}

export default ProductList