import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default function Profile() 
{
    const [user, setUser] = useState(null)
    useEffect(() => { Auth.currentAuthenticatedUser().then(user => setUser(user)); }, []);
    if (!user) return null
    return (
        <div>
            <h2>Username: { user.username }</h2>
            <p>Email: {user.attributes.email}</p>
            <p>Phone number: {user.attributes.phone_number}</p>
            {/* <AmplifySignOut /> */}
        </div>
           )
}