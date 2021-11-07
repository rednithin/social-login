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
    <div>
      {
        loaded && (

          <button onClick={signIn}>Google sign in</button>
        )
      }
      <FacebookLogin
        appId="416373366689797"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email"
        callback={(response) => {
          const code = JSON.parse(atob(response.signedRequest.split(".")[1])).code;
          console.log({response, code})
        }}
        render={renderProps => (
          <button onClick={renderProps.onClick}>This is my custom FB button</button>
        )}
        responseType="code"
      />
    </div>
  );
}
