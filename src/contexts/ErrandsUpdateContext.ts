import { createContext } from 'react';

const ErrandsUpdateContext = createContext({
    updateFlag: false,
    toggleUpdateFlag: () => { }
});

export default ErrandsUpdateContext;
