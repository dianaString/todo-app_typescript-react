
import PropTypes from 'prop-types';

import { useLocation, Outlet, NavLink } from 'react-router-dom';

const Items = ({ bodyParts }) => {

    const location = useLocation();
    const currentPath = location.pathname.substring(1);
    const pathComponents = currentPath.split('/');
    const category = pathComponents[0];

    let currentBodyParts = bodyParts.filter((bodyPart) => bodyPart.category === category);

    if (!currentBodyParts.length) {
        return <p>Body part not found</p>;
    }

    return (
        <>
            <ul className="container_subPages" >
                {currentBodyParts.map((bodyPart) => (
                    <li key={bodyPart.idNo} >
                        <NavLink to={`${bodyPart.name}`} className="subPages">{`${bodyPart.name}`}</NavLink>
                    </li>
                ))}
            </ul>
            <Outlet />
        </>
    );
}

Items.propTypes = {
    bodyParts: PropTypes.array.isRequired
};

export default Items