async function addProduct(){
    var tile = document.querySelector(".product-title").value
    var description = document.querySelector(".product-description").value
    var price = parseInt(document.querySelector(".product-price").value)
    var imgURL = document.querySelector(".product-imgURL").value
    var length = parseInt(document.querySelector(".product-lenght").value)
    var width = parseInt(document.querySelector(".product-width").value)
    var height = parseInt(document.querySelector(".product-height").value)
    var categoryId = parseInt(document.querySelector(".product-categoryId").value)

    const newProduct = {
        title : tile,
        description :description,
        price : price,
        imgURL :imgURL,
        length :length,
        width : width,
        height :height,
        categoryId :categoryId
    }
    console.log(newProduct)
 
     await fetch(`http://127.0.0.1:2222/seller/`, { mode: "cors",method:"POST" ,body: JSON.stringify(newProduct)});
 
     
     alert(`Product added`)
 }