import React, {useEffect, useState} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';

import {validateUUID} from '../../helpers/validators';
import {activeUser} from '../../helpers/api/user';

interface ActivePageProps {

}

interface ActiveParams {
    key: string,
}

const ActivePage: React.FC<ActivePageProps> = ({}) => {
    const { key } = useParams<ActiveParams>();
    const [counter, setCounter] = useState(10);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(validateUUID(key)) {
            activeUser(key).then(() => {
                setRedirect(true);
            }, () => {
                setRedirect(true);
            });
        }else {
            setRedirect(true);
        }
    }, []);

    useEffect(() => {
        if(counter > 0) {
            let interval = setInterval(() => setCounter(counter - 1), 1000);
            setIntervalID(interval);

            return () => {
                clearInterval(interval);
            }
        }
    }, [counter]);

    return (
      <article className="content-container logout-container">
          {redirect && <Redirect to={{
              pathname: '/',
          }}/>}
          <h2>Konto zostało aktywowane</h2>
          <p>
              Zaraz nastąpi przekierowanie na stronę główną.
          </p>
          <p>
              Jeżeli nie nastąpi w ciągu {counter} sekund naciśnij ten guzik.
          </p>
          <Link to={'/'}>
              <div className="button short-button">
                  Powrót na stronę główną
              </div>
          </Link>
      </article>
  );
};

export default ActivePage;
