const methods= {
    addDots: (amount) => {
    return amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
},

 getDecimals: (decimals) => {
    decimals = decimals.toString();
    decimals = decimals.length === 2 ? decimals : decimals + "0";
    return decimals === "00" ? "" : decimals;
},
 getBreadCrumb:(categories) => {
    let breadcrumb = "";
    console.log("categories");
    console.log(categories);
    if(categories===undefined || Object.keys(categories).length===0 ) return "";

    (categories.forEach((c, i) => {
            if (i > 0)
                    breadcrumb += " > "

            breadcrumb += c
    }))
    return breadcrumb;
}
}

export default methods;

