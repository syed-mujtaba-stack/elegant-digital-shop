import { SignIn } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirectUrl') || '/'; // Default redirect to home

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignIn 
        path="/login" 
        routing="path" 
        signUpUrl="/register" 
        afterSignInUrl={redirectUrl} 
        appearance={{
          elements: {
            card: "shadow-xl", // Example of customizing appearance
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

export default Login;
