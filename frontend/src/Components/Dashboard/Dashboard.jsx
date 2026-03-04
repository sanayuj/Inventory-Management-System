import React from 'react'
import { useState,useEffect } from 'react';
import { addProduct, deleteProduct, editProduct, getProduct } from '../../Services/UserApi';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import "./Dashboard.css"
function Dashboard() {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
     const product=await getProduct()
      setProducts(product.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handleEdit=async(id)=>{
const res=await editProduct(id)
  }

  const handleDelete=async(id)=>{

    const confirmed = window.confirm("Are you sure you want to delete this product?");
  
  if (!confirmed) return; 

  try {
    const res = await deleteProduct(id);
    if(res.data.success){
        toast.success(res.data.message)
    }else{
        toast.error("Unable to delete!")
    }
    console.log(res);

    if (res.status === 200) {
      toast.success("Product deleted successfully");
      fetchProducts();
    }
  } catch (err) {
    toast.error("Failed to delete product");
    console.error(err);
  }
    

  }

  const ProductSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Product name is required"),

  category: Yup.string()
    .min(2, "Category must be at least 2 characters")
    .required("Category is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price cannot be negative"),

  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity cannot be negative"),
});

 const handleSubmit = async (values, { resetForm }) => {
    console.log(values,"######");
    
    const res=await addProduct(values)
    console.log(res,"!!!!");
    
    if(res.data.success){
        toast.success("Product add successfully")
    }else{
        toast.error("Unable to add Product")
    }
    
    fetchProducts();
    resetForm();
  };

  return (
    <div> 
    <div style={{ padding: "20px" }}>
      <h2>Product Dashboard</h2>

       <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#addProductModal"
      >
        ➕ Add Product
      </button>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹ {product.price}</td>
                <td>{product.quantity}</td>
               <td>
    <button 
      className="btn btn-sm btn-primary me-2 edit-btn" 
      onClick={() => handleEdit(product._id)}
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
    <button 
      className="btn btn-sm btn-danger delete-btn" 
      onClick={() => handleDelete(product._id)}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div
        className="modal fade"
        id="addProductModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Add Product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <Formik
              initialValues={{
                name: "",
                category: "",
                price: "",
                quantity: "",
              }}
              validationSchema={ProductSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="modal-body">

                    <div className="mb-3">
                      <Field
                        name="name"
                        className="form-control"
                        placeholder="Product Name"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="name" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <Field
                        name="category"
                        className="form-control"
                        placeholder="Category"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="category" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <Field
                        name="price"
                        type="number"
                        className="form-control"
                        placeholder="Price"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="price" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <Field
                        name="quantity"
                        type="number"
                        className="form-control"
                        placeholder="Quantity"
                      />
                      <div className="text-danger">
                        <ErrorMessage name="quantity" />
                      </div>
                    </div>

                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      disabled={isSubmitting}
                    >
                      Save Product
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

          </div>
        </div>
      </div>
  </div>
  )
}

export default Dashboard