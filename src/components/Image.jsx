import { useRef, useState } from 'react';

function Image({ src, alt }) {
    const [source, setSource] = useState(src);
    const imgRef = useRef(undefined);
    const uploadRef = useRef(undefined);

    const handleClick = e => uploadRef.current.click();
    const handleChange = e => {
        const fileUploaded = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(fileUploaded);
        reader.onload = () => setSource(reader.result);
    };

    return (
        <>
            <img src={source} alt={alt} ref={imgRef} onClick={handleClick} />
            <input type="file" ref={uploadRef} onChange={handleChange} />
        </>
    );
}

export default Image;