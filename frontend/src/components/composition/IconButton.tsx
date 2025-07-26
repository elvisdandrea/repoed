export enum ButtonStyle {
    primary = "primary",
    success = "success",
    danger = "danger"
}

interface IconButtonProps {
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    children?: React.ReactNode;
    href: string;
    icon: string;
    text: string;
    style?: string;
}

const IconButton: React.FC<IconButtonProps> = ({href, icon, text, style = "primary", onClick, children}) => {
    return (
        <a 
            href={href} 
            onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick(e);
            }}
            className={`d-none d-sm-inline-block btn btn-sm btn-${style} shadow-sm`}>
            <i className={`fas fa-${icon} fa-sm text-white-50`}></i>
            {text}
            {children}
        </a> 
    )
}

export { IconButton }