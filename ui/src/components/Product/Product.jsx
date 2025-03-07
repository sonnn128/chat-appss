import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../stores/middlewares/productMiddleware";

function Product() {
    // just dispatch not call api
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch to middleware -> middleware dispatch to api
        //  or dispatch an action
        dispatch(getProducts());
    }, []);
    return (<>
        <h1>Product component</h1>
    </>)
}

export default Product;