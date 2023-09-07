// Create category
function create(name, parent_name, attributes) {
    parent_id = db.Category.find({Parent_ID: parent_name});
    attributes = [];
    db.Category.insertOne({
        "Name": name,
        "Parent_ID": parent,
        "Attributes": attributes
      })
}

// Read category
function read(name) {
    db.Category.find({Name: name})
}

// Update category
function update(name, up_name, up_parent, up_attributes) {
    product_id = db.Category.find({Name: name});
    parent_id = db.Category.find({Parent_ID: up_parent})
    up_attributes = [];
    const associatedProducts = db.products.find({category: product_id}).toArray();
    if (associatedProducts.length == 0) {
        db.Category.updateOne(
            {_id: product_id},
            {$set: 
                {Name: up_name, Parent_ID: parent_id, Attributes: parent_id}
            }
        );
    } else {
        throw new Error("Cannot update category. Products are associated with it.");
    }
}

// Delete category
function deleteCategory(name) {
    product_id = db.Category.find({Name: name});
    const associatedProducts = db.products.find({category: product_id}).toArray();
    if (associatedProducts.length == 0) {
        db.Category.deleteMany({Name: name});
    } else {
        throw new Error("Cannot delete category. Products are associated with it.");
    }
}