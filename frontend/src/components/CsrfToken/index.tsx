import React from 'react';

import {getCookie} from '../../helpers/api/api';

interface CsrfTokenProps {

}

const CsrfToken: React.FC<CsrfTokenProps> = ({}) => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={getCookie('csrftoken')} />
    );
};

export default CsrfToken;



