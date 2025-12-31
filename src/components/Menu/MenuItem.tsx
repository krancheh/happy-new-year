import {Link} from 'react-router-dom';

interface IProps {
    text: string;
    success?: boolean;
}

export const MenuItem = ({text, success}: IProps) => {
    return (
        <div className={`menu-item ${success ? 'success' : ''}`}>
            {text}
            {/* <Link to={link}>{text}</Link> */}
        </div>
    );
};
