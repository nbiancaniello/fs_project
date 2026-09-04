import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { api } from '../api/api';

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        api.get('/products')
            .then(res => {
                if (isMounted) {
                    setProducts(res.data);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });
        return () => { isMounted = false; };
    }, []);

    const newArrivals = useMemo(() => products.filter(p => p.isNewArrival), [products]);
    const promotions = useMemo(() => products.filter(p => p.isPromotion), [products]);

    return (
        <ProductContext.Provider value={{ products, newArrivals, promotions, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
}

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useProducts = () => useContext(ProductContext);

