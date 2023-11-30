import {useEffect} from "react";

interface ErrorAlertProps {
    errorMessage: string | null;
    onClose: () => void;
}

const ErrorAlert = ({errorMessage, onClose}: ErrorAlertProps) => {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [onClose]);

    if (!errorMessage) {
        return null;
    }


    return (
        <div
            role="alert"
            className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 max-w-md rounded border-s-4 border-red-500 bg-red-50 p-4 transition-all duration-300 ease-in-out"
        >
            <button className="absolute top-0 right-0 p-2" onClick={onClose}>
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <strong className="block font-medium text-red-800">Something went wrong</strong>
            <p className="mt-2 text-sm text-red-700">
                {errorMessage}
            </p>
        </div>
    )
}

export default ErrorAlert;