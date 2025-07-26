import { useCallback } from "react"
import { Container } from "../composition/Container"
import { IconButton } from "../composition/IconButton"
import { PageHeader } from "../composition/PageHeader"
import { TopNav } from "../composition/TopNav"
import FileDropArea from "../home/filedrop/filedrop"
import { BoxSpace } from "../composition/BoxSpace"

const EditFile: React.FC = () => {

    const handleSaveFile = useCallback(() => {

    }, []);

    return (
        <Container>
            <BoxSpace>
            <PageHeader 
                title="Edit File"
                rightContent={
                    <IconButton 
                        href="#"
                        text="Save File"
                        icon="download"
                        onClick={() => handleSaveFile()}
                    />
                }
            />

            </BoxSpace>
            <TopNav leftItems={<FileDropArea />} />
        </Container>
        
    )
}

export { EditFile }