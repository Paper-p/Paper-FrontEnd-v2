import RequestForm from "../form/requestForm";
import { SignupModel } from "../model/signup";
import { getAuth } from "data/url/getUrl";

class Auth {
  confirmName(name: string) {
    try {
      return RequestForm({
        method: "HEAD",
        url: `${getAuth.checkName()}?nickname=${name}`,
        withCredentials: true,
      });
    } catch (error) {
      return error;
    }
  }

  confirmId(userId: string) {
    try {
      return RequestForm({
        method: "HEAD",
        url: `${getAuth.checkId()}?userId=${userId}`,
        withCredentials: true,
      });
    } catch {}
  }

  signin(id: string, password: string) {
    try {
      return RequestForm({
        method: "POST",
        url: getAuth.signin(),
        withCredentials: true,
        data: {
          userId: id,
          password: password,
        },
      });
    } catch (error) {
      return error;
    }
  }

  signup(data: SignupModel) {
    try {
      return RequestForm({
        method: "POST",
        url: getAuth.signup(),
        withCredentials: true,
        data: {
          nickname: data.nickname,
          userId: data.userId,
          password: data.password,
        },
      });
    } catch (error) {
      return error;
    }
  }
}

export default new Auth();
