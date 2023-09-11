getAdminWarehouse()

async function getAdminWarehouse(){
    const res = await fetch("http://127.0.0.1:2222/warehouseAdmin/", { mode: "cors" });
    const warehousetList = await res.json();
    let warehouseListHtml = warehousetList.map(warehouse => `
    <div class="category-item">
        <p>name:<b>${warehouse.name}</b></p>
        <p>id:<b>${warehouse.id}</b></p>
        <p>Address:<b>${warehouse.address}</b></p>
        <p>Avalable volume:<b>${warehouse.total_volume}</b></p>
        <!-- reuse css class -->
        <div class="product-item-btn">
            <a href="#">edit</a>
            <button style="margin-top:5px;" onclick="adminDeleteWarehouse(${warehouse.id})">delete</button>
        </div>
    </div>
`)
    document.querySelector(".warehouse-list-container").innerHTML = warehouseListHtml.join("\n")
}

async function adminDeleteWarehouse(id){
    await fetch(`http://127.0.0.1:2222/warehouseAdmin/${id}`, { mode: "cors",method:"DELETE" });
    getAdminWarehouse()
    alert(`Warehouse id:${id} deleted`)
}