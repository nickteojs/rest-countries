import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>Page not found!</div>
            <button onClick={() => navigate(-1)}>Go back</button>
        </>
    )
}

export default NotFound