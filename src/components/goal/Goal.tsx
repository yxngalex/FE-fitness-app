import {DialogFooter} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UserDTO} from "@/model/UserDTO.ts";

interface Goal {
    userToSave: UserDTO,
    setDialogOpen: (value: boolean) => void
}

const Goal = ({userToSave, setDialogOpen}: Goal) => {

    const saveUserWithGoal = () => {
        console.log("Goal component", userToSave)

        setDialogOpen(false)
    }

    return (
        <>
            <h2>Goal Dialog</h2>
            <DialogFooter>
                <Button onClick={saveUserWithGoal}>Save</Button>
            </DialogFooter>
        </>
    );
}

export default Goal;