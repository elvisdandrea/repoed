const BoxSpace: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <div className="container-fluid" style={ { padding: "2em", width: "100%"} }>
            {children}
        </div>
    )
}

export { BoxSpace }