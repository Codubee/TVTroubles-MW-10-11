import React, { useEffect } from 'react';
import Tools from '../components/Tools';
import Features from '../components/Features'
import Team from '../components/Team';
import Explanation from '../components/Explanation'

function LandingPage() 
{
    useEffect(() => // Same as ComponentDidMount
    {
        var UID;

        if(!sessionStorage.getItem('UID'))
        {
            UID = Math.floor(Math.random() * 100);
            sessionStorage.setItem('UID', UID);
        }
    }, [])

    return (
        <div>
            <Explanation/>
            <Features/>
            <Team/>
            <Tools/>
        </div>
    )
}

export default LandingPage;