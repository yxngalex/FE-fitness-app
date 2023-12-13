import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog.tsx";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    label: string;
}

const ConfirmationDialog = ({isOpen, onClose, onConfirm, label}: ConfirmationDialogProps) => {

    return (
        <Dialog open={isOpen}>
            <DialogHeader className="p-4">
                <p className="text-gray-800">Are you sure you want to remove {label}?</p>
            </DialogHeader>
            <DialogContent className="flex justify-end p-4">
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2"
                    onClick={onClose}
                >
                    No
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    onClick={onConfirm}
                >
                    Yes
                </button>
            </DialogContent>
        </Dialog>
    )

}

export default ConfirmationDialog;