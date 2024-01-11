import React from "react";
import { Link } from 'react-router-dom'

const OtherPage = () => {
    return (<div>
        I am other page!
        <Link to="/">Go to home page</Link>
    </div>)
}

export default OtherPage;