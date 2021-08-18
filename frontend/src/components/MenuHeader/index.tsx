import React, {useState} from 'react';

import './style.css';

interface MenuHeaderProps {
    headerTitle: string,
    subMenuChildren: {id: number, element: string}[],
}

const MenuHeader: React.FC<MenuHeaderProps> = ({headerTitle, subMenuChildren}) => {
    const [showSubMenu, setShowSubMenu] = useState(false);

    return (
        <div onClick={() => setShowSubMenu(!showSubMenu)}>
            <div className="menu-option-header">
                <div>{headerTitle}</div>
                {subMenuChildren.length > 0 ?
                    <>
                        <input type="checkbox" className="hidden-checkbox" defaultChecked={showSubMenu}/>
                        <div className="arrow arrow-down expend-button"/>
                    </>
                    : ''
                }
            </div>
            {showSubMenu &&  subMenuChildren.length > 0 ?
                <ul className="submenu">
                    {subMenuChildren.map(x => <li key={x.id}>{x.element}</li>)}
                </ul>
                : ''
            }
        </div>
    );
};

export default MenuHeader
