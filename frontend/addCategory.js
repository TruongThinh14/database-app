async function addCategory(){
    var name = document.querySelector(".category-name").value
    var parentId = document.querySelector(".category-parentId").value
    var categoryId = parseInt(document.querySelector(".category-id").value)

    const newCategory = {
        name:name,
        parentCategoryId:parentId,
        categiory_id:categoryId
    }
    console.log(JSON.stringify(newCategory)) 

     await fetch(`http://127.0.0.1:2222/category/`, { mode: "cors",method:"POST", body: JSON.stringify(newCategory) });
     
    
    //  ,headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //   }
     alert(`Category added`)
 }