// console.log(axios);
function getComments() {
    fetch('http://localhost:3000/comments')
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error);
        })
        .then(json => {
            console.log(json[0]);
        })
}