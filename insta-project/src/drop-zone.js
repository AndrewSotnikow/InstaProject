import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

function MyDropzone(props) {
    const onDrop = useCallback(acceptedFiles => {
        const urls = acceptedFiles.map(file => window.URL.createObjectURL(file));
        props.onFile(urls);
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    return (

        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default MyDropzone;