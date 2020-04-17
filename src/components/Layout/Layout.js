import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import NavBar from './NavBar/NavBar'
const layout = (props) => (
    <Auxillary>
        <NavBar />
        <main>
            {props.children}
        </main>
    </Auxillary>
);
export default layout