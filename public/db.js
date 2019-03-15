const db = {
    all: database => {
        return axios(database);
    },
    get: (database, id) => {
        return axios(`${database}/${id}`);
    },
    create: database => {
        return axios({
            method: 'post',
            url: database,
            data: {
                "title": "hohohuehuehue",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "columnId": 1
            }
        })
    },        
    modify: (database, id) => {
        return axios({
            method: 'put',
            url: `${database}/${id}`,
            data: {
                "title": "vuvuvueueve",
                "description": "No nothing no",
                "columnId": 1
            }
        })
    },
    delete: (database, id) => {
        return axios({
            method: 'delete',
            url: `${database}/${id}`
        })
    },
}