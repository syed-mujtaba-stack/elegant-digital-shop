import { SignUp } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';

const Register = () => {
  const [searchParams] = useSearchParams();
  // Clerk's SignUp component can also take an afterSignUpUrl and afterSignInUrl
  // For simplicity, we'll let it redirect based on Clerk dashboard settings or default behavior.
  // Or, you can pass redirectUrl from query params if needed for specific flows.
  const redirectUrl = searchParams.get('redirectUrl') || '/';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignUp 
        path="/register" 
        routing="path" 
        signInUrl="/login" 
        afterSignUpUrl={redirectUrl} // Redirect after successful sign-up
        // afterSignInUrl={redirectUrl} // Redirect after sign-in (if sign-up leads to auto sign-in)
        appearance={{
          elements: {
            card: "shadow-xl",
            headerTitle: "text-3xl font-bold text-gray-900",
            headerSubtitle: "text-gray-600",
            socialButtonsBlockButton: "border-gray-300 hover:bg-gray-100",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
            footerActionLink: "text-blue-600 hover:text-blue-500"
          }
        }}
      />
    </div>
  );
};

export default Register;
