const db = {
    all: database => {
        return axios(database);
    },
    get: (database, id) => {
        return axios(`${database}/${id}`);
    },
    create: (database, post) => {
        return axios({
            method: 'post',
            url: database,
            data: {
                "title": post.title,
                "description": "",
                "columnId": post.columnIdattri
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