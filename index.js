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
        .post('https://crudcrud.com/api/836d68ad68574fe490fa21fb1e94d9dc/orders', { myObj })
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
function deleteItem(sm,a) {
        if (confirm('Are You Sure?')) {
            var e=document.getElementById(a)
            var ul = e.parentElement;
            var s = e.parentElement.parentElement
                    axios
                        .delete(`https://crudcrud.com/api/836d68ad68574fe490fa21fb1e94d9dc/orders/${sm}`)
                        .then((res) => {
                            s.removeChild(ul)
                        })
                        .catch(err => alert('Not Found'))
               
        }
    }
window.addEventListener('DOMContentLoaded', (event) => {
    function getTodos() {
        axios
            .get('https://crudcrud.com/api/836d68ad68574fe490fa21fb1e94d9dc/orders')
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
function showAll(res,id) {
    let li = document.createElement('li')
    let btn = document.createElement('button')
    li.className = 'list-group-item border-info'
    btn.className = 'form-control bg-info'
    btn.value = 'delete'
    li.id=res.id
    btn.appendChild(document.createTextNode(`Delete`))
    li.appendChild(document.createTextNode(`${res.id}-${res.price}-${res.detail}-${res.table}`))
    const childHTML = `<button type="button" class="btn btn-danger" id="deleteBtn"onClick= "deleteItem('${id}','${li.id}')">Delete Order</button></li>`;
    li.innerHTML+=childHTML
    // li.appendChild(btn)
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

