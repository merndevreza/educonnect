import { doSocialLogin } from "@/app/actions";
import { Button } from "./ui/button";

const SocialLogin = () => {
  return (
    <div className="my-3">
      <h2 className="text-center mb-2">Or sign up with</h2>
      <form action={doSocialLogin} className="text-center space-x-2">
        <Button type="submit" name="action" value="google"  >
          Google
        </Button>
        <Button type="submit" name="action" value="fb"  >
          Facebook
        </Button>
      </form>
    </div>
  );
};

export default SocialLogin;
