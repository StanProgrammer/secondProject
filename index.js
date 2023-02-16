var price1 = document.getElementById('price')
var detail = document.getElementById('detail')
var table = document.getElementById('table')
var tab = document.getElementById('details')
var t1 = document.getElementById('table1')
var t2 = document.getElementById('table2')
var t3 = document.getElementById('table3')
var myform = document.getElementById('my-form')
myform.addEventListener('submit', async()=>{
    try{
        a = Math.floor(Math.random() * 1000000)
    let myObj = {
        id: a,
        price: price1.value,
        detail: detail.value,
        table: table.value,

    }
    const post1=await axios
        .post('https://crudcrud.com/api/e3b90910bc1b4a899f82da32008f4156/orders', { myObj })
        showAll(myObj, post1.data._id)
    price1.value = '';
    detail.value = '';
    table.value = '';
    }
    catch(err){
        console.log(err)
        throw new Error()
    }
})

window.addEventListener('DOMContentLoaded', async (event) => {
    try{
    const res=await axios.get('https://crudcrud.com/api/e3b90910bc1b4a899f82da32008f4156/orders')
    for (i = 0; i < res.data.length; i++) {
        showAll(res.data[i].myObj, res.data[i]._id)
    }
    }
    catch(err){
        console.log(err)
        throw new Error()
    }           
})

async function showAll(res, id) {
    try{
    let li = document.createElement('li')
    let btn = document.createElement('button')
    li.className = 'card mt-3'
    btn.className = 'form-control bg-info'
    btn.value = 'delete'
    li.id = res.id
    a = li.id
    btn.onclick = async ()=> {
        try{
            if (confirm('Are you sure?')) {
                var e = document.getElementById(res.id)
                var ul = e.parentElement
                const delete1=await axios
                    .delete(`https://crudcrud.com/api/e3b90910bc1b4a899f82da32008f4156/orders/${id}`)
                    ul.removeChild(e)
            };
        }
        catch(err){
            console.log(err)
            throw new Error()
        }
        };
    btn.appendChild(document.createTextNode(`Delete`))
    li.innerHTML = `<table class="table">
    
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
    catch(err){
        console.log(err)
        throw new Error()
    }
}