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
        .post('https://crudcrud.com/api/52b6fb418fa54f1cac8ec4c344fa3f76/orders', { myObj })
        .then((res) => {
            showAll(myObj,res.data._id)
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went Wrong<h4>"
            console.log(err)
        })
    price1.value = '';
    detail.value = '';
    table.value = '';
}
window.addEventListener('DOMContentLoaded', (event) => {
    function getTodos() {
        axios
            .get('https://crudcrud.com/api/52b6fb418fa54f1cac8ec4c344fa3f76/orders')
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
    li.className = 'card mt-3'
    btn.className = 'form-control bg-info'
    btn.value = 'delete'
    li.id=res.id
    a=li.id
    btn.onclick = function () { 
        if(confirm('Are you sure?')){
        var e=document.getElementById(res.id)
        var ul=e.parentElement
        axios
                        .delete(`https://crudcrud.com/api/52b6fb418fa54f1cac8ec4c344fa3f76/orders/${id}`)
                        .then((res) => {
                            ul.removeChild(e)
                        })
                        .catch(err => alert('Not Found'))
    };
    }

    btn.appendChild(document.createTextNode(`Delete`))
    li.innerHTML=`<table class="table">
    
    <tbody>
      <tr>
        <th scope="row">Price</th>
        <td>${res.price}</td>
      </tr>
      <tr>
        <th scope="row">Product Name</th>
        <td>${res.detail}</td>
      </tr>
      <tr>
        <th scope="row">Category</th>
        <td>${res.table}</td>
      </tr>
    </tbody>
  </table>`
    li.appendChild(btn)
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