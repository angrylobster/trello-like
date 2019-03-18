const db = {
    all: database => {
        return axios(database);
    },
    get: (database, id) => {
        return axios(`${database}/${id}`);
    },
    create: (database, object) => {
        switch (database) {
            case 'cards':
                return axios({
                    method: 'post',
                    url: database,
                    data: {
                        "title": object.title,
                        "description": "",
                        "columnId": object.columnId
                    }
                })
            case 'columns':
                return axios({
                    method: 'post',
                    url: database,
                    data: {
                        "title": object.title
                    }
                })
        }
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