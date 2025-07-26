import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    rightContent?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, rightContent }) => {

    return (    
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">{title}</h1>
            {rightContent}
        </div>
    )
}

export { PageHeader }