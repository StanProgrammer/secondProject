var price1 = document.getElementById('price')
var detail = document.getElementById('detail')
var category = document.getElementById('category')
var c1 = document.getElementById('category1')
var c2 = document.getElementById('category2')
var c3 = document.getElementById('category3')
var myform = document.getElementById('my-form')
myform.addEventListener('submit', async () => {
    try {
        let myObj = {
            price: price1.value,
            detail: detail.value,
            category1: category.value,

        }
        const post1 = await axios.post('https://crudcrud.com/api/1460c58b99fb400188403fc7df8dd06a/orders', { myObj })
        showAll(myObj, post1.data._id)
        price1.value = '';
        detail.value = '';
        category.value = '';
    }
    catch (err) {
        alert('Cannot Submit data please check backend')
        console.log(err)
        throw new Error()
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get('https://crudcrud.com/api/1460c58b99fb400188403fc7df8dd06a/orders')
        for (i = 0; i < res.data.length; i++) {
            showAll(res.data[i].myObj, res.data[i]._id)
        }
    }
    catch (err) {
        alert('Error occured please check')
        console.log(err)
        throw new Error()
    }
})

async function showAll(res, id) {
    try {
        let li = document.createElement('li')
        let btn = document.createElement('button')
        li.className = 'card mt-3'
        btn.className = 'form-control bg-info'
        btn.value = 'delete'
        li.id = id
        btn.onclick = async () => {
            try {
                if (confirm('Are you sure?')) {
                    var e = document.getElementById(li.id)
                    var ul = e.parentElement
                    const delete1 = await axios.delete(`https://crudcrud.com/api/1460c58b99fb400188403fc7df8dd06a/orders/${id}`)
                    ul.removeChild(e)
                };
            }
            catch (err) {
                alert('Error: User Doesnt exists')
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
                            <td>${res.category1}</td>
                        </tr>
                        </tbody>
                    </table>`
        li.appendChild(btn)
        if (res.category1 == 'Electronic Items') {
            c1.appendChild(li)
        }
        else if (res.category1 == 'Food Items') {
            c2.appendChild(li)
        }
        else {
            c3.appendChild(li)
        }
    }
    catch (err) {
        alert('Error occured')
        console.log(err)
        throw new Error()
    }
}