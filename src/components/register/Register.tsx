import {Button} from "@/components/ui/button.tsx";

interface RegisterProps {
    onToggleView: () => void;
}

const Register = ({onToggleView}: RegisterProps) => {

    const handleBackToLogin = () => {
        onToggleView();
    }

    return (
        <div>
            <p className="text-xl text-black">
                Register Page
            </p>
            <Button onClick={handleBackToLogin}>Back to Login</Button>
        </div>
    )
}

export default Register;