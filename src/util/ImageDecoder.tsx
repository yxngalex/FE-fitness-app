import {FC} from "react";

interface ImageDecoderProps {
    base64String: string | null | undefined;
}

const ImageDecoder: FC<ImageDecoderProps> = ({base64String}) => {
    if (!base64String) return null;

    const imageData = `data:image/png;base64,${base64String}`;

    return <img src={imageData} alt="Exercise"/>;
};

export default ImageDecoder;
