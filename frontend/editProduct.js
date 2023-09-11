async function editProduct(){
    var id = parseInt(document.querySelector(".product-id").value)
    var tile = document.querySelector(".product-title").value
    var description = document.querySelector(".product-description").value
    var price = parseInt(document.querySelector(".product-price").value)
    var imgURL = document.querySelector(".product-imgURL").value
    var length = parseInt(document.querySelector(".product-lenght").value)
    var width = parseInt(document.querySelector(".product-width").value)
    var height = parseInt(document.querySelector(".product-height").value)
    var categoryId = parseInt(document.querySelector(".product-categoryId").value)

    const newProduct = {
        id: id,
        title : tile,
        description :description,
        price : price,
        imgString :imgURL,
        length :length,
        width : width,
        height :height,
        category_id :categoryId
    }
    console.log(JSON.stringify(newProduct))
 
     await fetch(`http://127.0.0.1:2222/seller/`, { mode: "cors",method:"put" ,headers: {
        "Content-Type": "application/json; charset=utf-8",
      }, body: JSON.stringify(newProduct)});
 
     
     alert(`Product edited`)
 }