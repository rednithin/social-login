// admin/pages/custom-page.tsx
import { useGoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export default function App() {
  const { signIn, loaded } = useGoogleLogin({
    clientId:
      "690539792704-4bjr1g1qvlm0t7oakrvacqr7mg5vp0qa.apps.googleusercontent.com",
    scope:
      "",
    onSuccess: (response) => {
      console.log("Success", { response, code: response.code });
    },
    onFailure: (response) => {
      console.log("Failure", { response });
    },
    responseType: "code",
  });

  return (
    <div className="flex space-x-5 container mx-auto mt-20">
      <button disabled={!loaded} className="disabled:bg-gray-400 w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"  onClick={signIn}>Google Login</button>
      <FacebookLogin
        appId="416373366689797"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email"
        callback={(response) => {
          const code = JSON.parse(atob(response.signedRequest.split(".")[1])).code;
          console.log({response, access_token: response.accessToken})
        }}
        render={renderProps => (
          <button disabled={renderProps.isDisabled || renderProps.isProcessing || !renderProps.isSdkLoaded} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 disabled:bg-gray-400" onClick={renderProps.onClick}>Facebook Login</button>
        )}
        responseType="code"
      />
    </div>
  );
}
