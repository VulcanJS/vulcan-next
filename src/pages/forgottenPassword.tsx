import { PageLayout } from "~/components/layout";
import {
    FormControl,
    InputLabel,
    Input,
    Button,
    Typography
} from "@material-ui/core";

const ForgottenPassword = () => {
    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value.trim()
        };
        try {
            await fetch("/api/sendResetPasswordEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    }


    return (
        <PageLayout>
            <Typography variant='h1'>Forgot your password?</Typography>
            <Typography variant='body1'> Don't worry, it happens! <br />
                Enter your account's email and we will send you a password reset link. </Typography>
            <div className="updatePassword">
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <InputLabel>Email</InputLabel>
                        <Input type="email" name="email" required />
                    </FormControl>

                    <Button type="submit">Send password reset email</Button>
                </form>
                <style jsx>{`
                    .updatePassword {
                    max-width: 21rem;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin: 1rem 0 0;
                    }
                `}</style>
            </div>
        </PageLayout>
    );
};

export default ForgottenPassword;