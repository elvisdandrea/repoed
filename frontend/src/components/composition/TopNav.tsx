interface TopNavProps {
    leftItems?: React.ReactNode;
    navItems?: React.ReactNode[];
}

const TopNav: React.FC<TopNavProps> = ({ leftItems, navItems }) => {


    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">                    
            {leftItems}
            <ul className="navbar-nav ml-auto">
                {navItems && (
                    <>
                    {navItems.map((navItem) => (
                        <>
                        {navItem}
                        </>
                    ))}
                    </>
                )}
            </ul>
        </nav>
    )
}

export { TopNav }