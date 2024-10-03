import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  Auth,
} from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginWithGoogleMutation } from "../../services/api";
import { notifyError, notifySuccess } from "../../toast";
import { setToken } from "../../redux/reducer/authReducer";
import { setUser } from "../../redux/reducer/userReducer";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

interface OAuthProps {
  google: boolean;
}

const OAuth = (props: OAuthProps) => {
  const { google } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginWithGoogle, { isLoading }] = useLoginWithGoogleMutation();

  const banckendLogin = async (
    auth: Auth,
    provider: GoogleAuthProvider | FacebookAuthProvider
  ) => {
    const result = await signInWithPopup(auth, provider);
    if (result.user && result.user.displayName && result.user.email) {
      const res = await loginWithGoogle({
        name: result.user.displayName,
        email: result.user.email,
      });
      try {
        if (res?.data?.success) {
          notifySuccess(res?.data?.message!);
          // dispatch(setToken({ token: res?.data?.data?.accessToken }));
          dispatch(setUser({ user: res?.data?.data?.user }));
          navigate("/");
        } else {
          notifyError("Unable to login");
        }
      } catch (error) {
        notifyError("Unable to login");
      }
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      banckendLogin(auth, provider);
    } catch (error) {
      notifyError("Google login unsuccessfull");
    }
  };

  const handleFacebookClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);
      banckendLogin(auth, provider);
    } catch (error) {
      notifyError("Facebook login unsuccessfull");
    }
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={google ? handleGoogleClick : handleFacebookClick}
      className={`${
        google ? `bg-red-700` : `bg-blue-500`
      } text-white rounded-lg p-3 uppercase hover:opacity-95 text-sm`}
    >
      {google ? (
        isLoading ? (
          "Loading..."
        ) : (
          <div className="flex items-center justify-center ">
            <FcGoogle className="mx-2 text-xl" /> Continue with google
          </div>
        )
      ) : isLoading ? (
        "Loading..."
      ) : (
        <div className="flex items-center justify-center ">
          <FaFacebookF className="mx-2 text-xl text-white" /> Continue with facebook
        </div>
      )}
    </button>
  );
};
export default OAuth;
