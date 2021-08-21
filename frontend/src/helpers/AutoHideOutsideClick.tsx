import React, {useEffect} from 'react';

const AutoHideOutsideClick = (
    wrapperRef: React.RefObject<HTMLDivElement>,
    openMenu: boolean,
    setOpenMenu: (arg0: boolean) => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            const target = event.target as HTMLElement;
            if (wrapperRef.current && !wrapperRef.current.contains(target)) {
                setOpenMenu(false);
            }
        };
        if (openMenu) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [openMenu, wrapperRef]);
};

export default AutoHideOutsideClick;
