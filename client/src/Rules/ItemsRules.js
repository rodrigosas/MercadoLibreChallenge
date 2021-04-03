const methods = {
    getItemsByQuery: async (query) => {
        try {
            const response = await fetch('/api/items?q=' + query);
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);

            return body;
        } catch (ex) {
            // let mensaje = typeof ex === "object" ? ex.message : ex;
            throw Error("Hubo un error procesando la solicitud");
        }
    },
    getItemDetail: async (id) => {
        try {
            const response = await fetch('/api/items/' + id);
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);

            return body;
        } catch (ex) {
            // let mensaje = typeof ex === "object" ? ex.message : ex;
            throw Error("Hubo un error procesando la solicitud");
        }
    }

}

export default methods;