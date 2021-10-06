import React from 'react';

import './style.css';

interface SignInPerksProps {
}

const SignInPerks: React.FC<SignInPerksProps> = ({}) => {
    const perks: { id: number, title: string, description: string, }[] = [
        { id: 1, title: "Oceniaj filmy", description: "Będziemy ci podpowiadać kolejne filmy!", },
        { id: 2, title: "Do obejrzenia", description: "Zapisuj co chcesz obejrzeć", },
        { id: 3, title: "Za darmo", description: "Korzystanie z serwisu nie wymaga żadnej opłaty", },
    ];

    return (
        <div className="sign-in-perks">
            <h2>Dołącz do nas!!!</h2>
            {perks.map(x =>
                <div key={x.id} className="perk">
                    <h3>{x.title}</h3>
                    <div>{x.description}</div>
                </div>
            )}
        </div>
    );
};

export default SignInPerks;
