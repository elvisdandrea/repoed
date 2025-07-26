const Container: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <div className="container-fluid">
            {children}
        </div>
    )
}

export { Container }