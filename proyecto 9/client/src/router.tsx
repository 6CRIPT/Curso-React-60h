import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import NewProduct from "./views/NewProduct";
import { action as newProductAction } from "./components/FormComponent";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [ //LOS HIJOS HEREDAN LO DEL LAYOUT
            {
                index: true,
                element: <Products/>
            },
            {
                path: 'producto/nuevo',
                element: <NewProduct/>,
                action: newProductAction
            }
        ]
    }
])