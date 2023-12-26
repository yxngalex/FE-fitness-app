import {FC} from "react";

interface ImageDecoderProps {
    base64String: string | null | undefined;
    maxWidth: string;
    maxHeight: string;
}

const ImageDecoder: FC<ImageDecoderProps> = ({base64String, maxWidth, maxHeight}) => {
    if (!base64String) return null;

    const imageData = `data:image/png;base64,${base64String}`;

    return <img src={imageData} alt="Exercise" className={`max-w-[${maxWidth}px] max-h-[${maxHeight}px]`}/>;
};

export default ImageDecoder;
