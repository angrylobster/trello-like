const db = {
    card: {
        all: async () => {
            const response = await axios.get('http://localhost:3000/cards')
                .then(result => {
                    return result;
                });
            return response;

            // return axios('http://localhost:3000/cards')
            //     .then(response => {
            //         return response;
            //     })
            //     .error
        },
        // create: axios({
        //     method: 'post',
        //     url: '/user/12345',
        //     data: {
        //         firstName: 'Fred',
        //         lastName: 'Flintstone'
        //     }
        // }),

        modify: '',
        delete: '',
    },

    column: {
        all: '',
        create: '',
        modify: '',
        delete: '',
    }
}
let a = db.card.all();
// .then(result => {
//     console.log(result)
// });