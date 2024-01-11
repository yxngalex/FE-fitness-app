import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

interface ConfirmationDialogProps {
    showDialog: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
                                                                   showDialog,
                                                                   onClose,
                                                                   onConfirm,
                                                                   title,
                                                                   description
                                                               }) => {
    const handleConfirmedDeleteDay = () => {
        onConfirm();
        onClose();
    };

    return (
        <Dialog open={showDialog} >
            <DialogTrigger asChild>
                <div></div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-4 mt-6">
                    <Button
                        onClick={onClose}
                        variant="outline"
                        size="sm"
                        className="rounded-3xl border-slate-400 bg-slate-600 hover:bg-slate-400 text-white hover:text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmedDeleteDay}
                        variant="outline"
                        size="sm"
                        className="rounded-3xl border-slate-400 bg-red-600 hover:bg-red-400 text-white hover:text-white"
                    >
                        Confirm
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationDialog;