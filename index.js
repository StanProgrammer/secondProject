var price1 = document.getElementById('price')
var detail = document.getElementById('detail')
var table = document.getElementById('table')
var tab = document.getElementById('details')
var t1 = document.getElementById('table1')
var t2 = document.getElementById('table2')
var t3 = document.getElementById('table3')
var myform = document.getElementById('my-form')

myform.addEventListener('submit', OnSubmit)
function OnSubmit(e) {
    a = Math.floor(Math.random() * 1000000)
    let myObj = {
        id: a,
        price: price1.value,
        detail: detail.value,
        table: table.value,

    }
    e.preventDefault();
    axios
        .post('https://crudcrud.com/api/53dcf97159c04dbebebc26d3406b84f5/orders', { myObj })
        .then((res) => {
            showAll(myObj)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went Wrong<h4>"
            console.log(err)
        })
    price1.value = '';
    detail.value = '';
    table.value = '';
}
tab.addEventListener('click', deleteItem)
function deleteItem(e) {
    if (e.target.value == 'delete') {
        if (confirm('Are You Sure?')) {
            var ul = e.target.parentElement;
            var s = e.target.parentElement.parentElement

            a = ul.textContent
            const myarr = a.split('-')
            b = myarr[0]
            axios
                .get('https://crudcrud.com/api/53dcf97159c04dbebebc26d3406b84f5/orders')
                .then((res) => {
                    // email id is chosen to fetch _id because email id is unique
                    for (i = 0; i < res.data.length; i++) {
                        if (b == res.data[i].myObj.id) {
                            res.data[i].myObj
                            a = res.data[i]._id
                            break
                        }
                    }
                    axios
                        .delete(`https://crudcrud.com/api/53dcf97159c04dbebebc26d3406b84f5/orders/${a}`)
                        .then((res) => {
                            s.removeChild(ul)
                        })
                        .catch(err => alert('Not Found'))
                })
                .catch(err => console.log(err))
        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    function getTodos() {
        axios
            .get('https://crudcrud.com/api/53dcf97159c04dbebebc26d3406b84f5/orders')
            .then(res => show(res))
            .catch(err => console.log(err))
    }
    getTodos()
})
function show(res) {
    for (i = 0; i < res.data.length; i++) {
        showAll(res.data[i].myObj, res.data[i]._id)

    }
}
function showAll(res) {
    let li = document.createElement('li')
    let btn = document.createElement('button')
    li.className = 'list-group-item border-info'
    btn.className = 'form-control bg-info'
    btn.value = 'delete'
    btn.appendChild(document.createTextNode(`Delete`))
    li.appendChild(document.createTextNode(`${res.id}-${res.price}-${res.detail}-${res.table}`))
    li.appendChild(btn)
    tab.appendChild(li)
    if (res.table == 'Electronic Items') {
        t1.appendChild(li)
    }
    else if (res.table == 'Food Items') {
        t2.appendChild(li)
    }
    else {
        t3.appendChild(li)
    }
}

