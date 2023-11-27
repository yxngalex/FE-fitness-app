import {useEffect} from "react";
import {CheckCircle} from "lucide-react";


interface SuccessAlertProps {
    alertMessage: string | null;
    onClose: () => void;
}

const SuccessAlert = ({alertMessage, onClose}: SuccessAlertProps) => {

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timeoutId);
    }, [onClose]);

    if (!alertMessage) {
        return null;
    }


    return (
        <div
            role="alert"
            className="fixed top-1 left-1/2 transform -translate-x-1/2 z-50 max-w-md rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 ease-in-out"
        >
            <button className="absolute top-0 right-0 p-2" onClick={onClose}>
                <svg className="h-6 w-6 text-blue-600 transition hover:text-gray-600" fill="none" stroke="currentColor"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
            <div className="flex items-start gap-4">
                <span className="text-blue-600">
                    <CheckCircle className="h-6 w-6" />
                </span>
                <div className="flex-1">
                    <strong className="block font-medium text-gray-900">
                        Success
                    </strong>

                    <p className="mt-1 text-sm text-gray-700">
                        {alertMessage}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SuccessAlert;