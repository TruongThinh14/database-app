getAdminCategory()

async function getAdminCategory(){
    const res = await fetch("http://127.0.0.1:2222/category/", { mode: "cors" });
    const categorytList = await res.json();
    let categoryListHtml = categorytList.map(category => `
    <div class="category-item">
    <p>Name:<b>${category.name}</b></p>
    <p>Category id:<b>${category.categiory_id}</b></p>
    <p>Attribute:<b>${category.attributes}</b></p>
    <!-- reuse css class -->
    <div class="product-item-btn">
        <a href="#">edit</a>
        <button style="margin-top:5px;" onclick="adminDeleteCategory(${category.categiory_id})">delete</button>
    </div>
</div>
`)
    document.querySelector(".category-list-container").innerHTML = categoryListHtml.join("\n")
}

async function adminDeleteCategory(id){
    await fetch(`http://127.0.0.1:2222/category/${id}`, { mode: "cors",method:"DELETE" });
    getAdminCategory()
    alert(`Category id:${id} deleted`)
}