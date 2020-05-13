import React from 'react';
import { NavBar } from './NavBar';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Link } from 'react-router-dom';

//adapter is used so that jest and enzyme work together to test correctly.
configure({ adapter: new Adapter() })

//describe-collection of test cases
describe('for navigation component', () => {
    let wrapper;
    //executed before each 'it'
    beforeEach(() => {
        //wrapper of the component which should be looked for
        wrapper = shallow(<NavBar />);
    });

    //it - a single test case
    it('check nav links log out', () => {
        expect(wrapper.find(Link)).toHaveLength(2);
    });

    it('check nav links log in', () => {
        wrapper.setProps({ loggedIn: true });
        expect(wrapper.find(Link)).toHaveLength(4);
    });

    it('check orders link', () => {
        wrapper.setProps({ loggedIn: true });
        expect(wrapper.contains(<Link to="/orders" className="nav-link">Orders</Link>)).toEqual(true);
    })
});