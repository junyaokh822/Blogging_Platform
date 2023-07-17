import { Link ,useMatch, useResolvedPath } from "react-router-dom"
import {ImHome3} from "react-icons/im"
import {FcAbout} from "react-icons/fc"

export default function navbar(){
    return <nav className="nav">
        <Link to="/" className="site-title">
            <ImHome3 />
            Home Page
        </Link>
        <ul >
            <FcAbout className="about-icon"/>
            <CustomLink to="/about">About</CustomLink>
        </ul>
    </nav>
}

function CustomLink({to, children,...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive === to ? "active": ""}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
    )
}