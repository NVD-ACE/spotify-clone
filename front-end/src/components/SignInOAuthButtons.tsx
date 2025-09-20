import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
	const signInWithGoogle = () => {
		// window.location.href = "/api/auth/google";
		console.log("Sign in with Google");
	}

	return (
		<Button onClick={signInWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
			<img src='/google.png' alt='Google' className='size-5' />
			Continue with Google
		</Button>
	);
};
export default SignInOAuthButtons;
