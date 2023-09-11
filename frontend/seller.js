getSellerProduct()

async function getSellerProduct(){
    const res = await fetch("http://127.0.0.1:2222/seller/", { mode: "cors" });
    const productList = await res.json();
    let productListHtml = productList.map(product => `<div class="product-item">
    <div class="product-item-left">
        <img src="${product.imgString}">
    </div>
    <div class="product-item-middle">
        <p>Product name:<b>${product.title}</b></p>
        <p>Description:<b>${product.description}</b></p>
    </div>
    <div class="product-item-right">
        <p>Price:<b>${product.price}</b></p>
        <p>Dimension:<b>l:${product.length}, w:${product.width}, h:${product.height}</b></p>
    </div>
    <div class="product-item-btn">
        <a href="sellerEditProduct.html">edit</a>
        <button onclick="deleteProduct(${product.id})">delete</button>
    </div>
</div>`)
    document.querySelector(".product-list").innerHTML = productListHtml.join("\n")
}

async function deleteProduct(id){
    await fetch(`http://127.0.0.1:2222/seller/${id}`, { mode: "cors",method:"DELETE" });
    getSellerProduct()
    alert(`Product id:${id} deleted`)
}

