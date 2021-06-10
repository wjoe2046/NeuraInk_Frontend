import React from 'react';
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

export default function Header() 
{
    return (
        <div className={headerContainer}>
        <h1 className={headerStyle}>Photo Snap</h1>
        <Link to="/" className={linkStyle}>Posts</Link>
        <Link to="/profile" className={linkStyle}>Profile</Link>
        </div>
    )
}

const headerContainer = css`
    padding-top: 20px;
`
const headerStyle = css`
    font-size: 40px;
    margin-top: 0px;
`
const linkStyle = css`
    color: green;
    font-weight: bold;
    text-decoration: none;
    margin-right: 10px;
    :hover 
    {
        color: #058aff;
    }`
