function getAuthor() {
    return {
        "name": "Sasia",
        "lastname": "Rodrigo"
    }
}

function getDecimals(number) {
    var decimal = Number((number + "").split(".")[1]);
    if (decimal) return decimal;
    return 0;
}

function getJsonItems(data) {
    var json = {
        author: getAuthor(),
        items: getElements(data)
    };
    console.log(json);
    return json;
}

function getElement(element) {
    return {
        "id": element.id,
        "title": element.title,
        "price": {
            "currency": element.currency_id,
            "amount": Math.floor(element.price),
            "decimals": getDecimals(element.price)
        },
        "picture": element.thumbnail,
        "condition": element.condition,
        "free_shipping": element.shipping.free_shipping
    }
}

function getElements(data) {
    var n = 0;
    var jsonElements = [];

    while (n < 4) {
        jsonElements[n] = getElement(data.results[n]);
        n++;
    }

    return jsonElements;
}

function getCategorie(data) {
    var filterCategories = (data.available_filters).find(function (element) { return element.id == "category"; });
    if (!filterCategories) return;

    var maxVal = Math.max.apply(Math, filterCategories.values.map(function (o) { return o.results; }));
    var categorie = filterCategories.values.find(element => element.results === maxVal);

    console.log("Maxima cat" + categorie)
    return categorie;
}

function getCategoriePath(data) {
    var categories = [];
    data.path_from_root.forEach(element => {
        categories.push(element.name);
    });

    return categories;
}

function getJsonItemDetail(element) {
    return {
        "author": getAuthor(),
        "item": {
            "id": element.id,

            "title": element.title,
            "price": {
                "currency": element.currency_id,
                "amount": Math.floor(element.price),
                "decimals": getDecimals(element.price)
            },
            "picture": element.thumbnail,
            "condition": element.condition,
            "free_shipping": element.shipping.free_shipping,
            "sold_quantity": element.sold_quantity,
            "description": ""
        }
    }
}

module.exports = {
    getJsonItems: (data) => {
        return getJsonItems(data);
    },
    getJsonItemDetail: (data) => {
        return getJsonItemDetail(data);
    },
    getCategorie: (data) => {
        return getCategorie(data);
    },
    getCategoriePath: (data) => {
        return getCategoriePath(data);
    }
};