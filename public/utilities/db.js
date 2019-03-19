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
                        "description": "(No description)",
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
    modify: (database, object) => {
        switch (database) {
            case 'cards':
                return axios({
                    method: 'put',
                    url: `${database}/${object.id}`,
                    data: {
                        "title": object.title,
                        "description": object.description,
                        "columnId": object.columnId
                    }
                })
            case 'columns':
                return axios({
                    method: 'put',
                    url: `${database}/${object.id}`,
                    data: {
                        "title": object.title
                    }
                })
        }
    },
    delete: (database, id) => {
        return axios({
            method: 'delete',
            url: `${database}/${id}`
        })
    },
}