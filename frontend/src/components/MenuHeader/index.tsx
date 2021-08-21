import React, {useRef, useState} from 'react';

import './style.css';
import AutoHideOutsideClick from "../../helpers/AutoHideOutsideClick";

interface MenuHeaderProps {
    headerTitle: string,
    subMenuChildren: {id: number, element: string}[],
}

const MenuHeader: React.FC<MenuHeaderProps> = ({headerTitle, subMenuChildren}) => {
    const wrapperMenuOptionRef = useRef<HTMLDivElement>(null);
    const [showSubMenu, setShowSubMenu] = useState<boolean>(false);

    AutoHideOutsideClick(wrapperMenuOptionRef, showSubMenu, setShowSubMenu);

    return (
        <div onClick={() => setShowSubMenu(!showSubMenu)} ref={wrapperMenuOptionRef}>
            <div className="menu-option-header expend-container">
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