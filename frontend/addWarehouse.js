async function addWarehouse(){
    var name = document.querySelector(".warehouse-name").value
    var address = document.querySelector(".warehouse-address").value
    var total_volume = parseInt(document.querySelector(".warehouse-totalvolume").value)

    const newWarehouse = {
        name:name,
        address:address,
        total_volume:total_volume
    }

     await fetch(`http://127.0.0.1:2222/warehouseAdmin/`, { mode: "cors",method:"POST",headers: {
        "Content-Type": "application/json; charset=utf-8",
      }, body: JSON.stringify(newWarehouse) });
 
     
     alert(`Warehouse added`)
 }