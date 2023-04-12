import { Text } from "@nextui-org/react";
import AuthForm from '@/components/AuthForm';

export default function Login() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="m-auto">
                <Text h2 className="text-center" css={{
                    textGradient: "45deg, $yellow600 40%, $red600 100%",
                }} weight="bold">Login / Register</Text>
                <AuthForm />
            </div>
        </div>
    );
}
