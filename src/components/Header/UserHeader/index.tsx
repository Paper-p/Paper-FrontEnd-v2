import React, { useEffect, useState } from "react";
import * as S from "./style";
import axios from "axios";
import { getAuth, getUser } from "../../../Utils/getEndPoints";

type User = {
  name: string;
  url: string;
};

const UserHeader: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: "",
    url: "",
  });

  const reissuingTokens = async () => {
    try {
      const refreshToken = String(localStorage.getItem("refresh-token"));
      const res: any = await axios({
        method: "patch",
        headers: {
          RefreshToken: refreshToken,
        },
        url: getAuth.reissuingTokens(),
      });

      if (res.status === 200) {
        localStorage.setItem("refresh-token", res.data.refreshToken);
        localStorage.setItem("login-token", res.data.accessToken);
      }
    } catch (e: any) {
      console.log(e);

      localStorage.removeItem("login-token");
      localStorage.removeItem("refresh-token");
    }
  };

  useEffect(() => {
    const getMiniProfile = async () => {
      try {
        const token = String(localStorage.getItem("login-token"));
        const res: any = await axios({
          method: "get",
          headers: {
            Authorization: "Bearer " + token,
          },
          url: getUser.getminiprofile(),
        });

        if (res.status === 200) {
          setUser({ name: res.data.nickname, url: res.data.profileImageUrl });
        }
      } catch (e: any) {
        console.log(e);

        if (localStorage.getItem("refresh-token")) {
          reissuingTokens();
        } else {
          localStorage.removeItem("login-token");
          localStorage.removeItem("refresh-token");
        }
      }
    };
    getMiniProfile();
  }, []);

  return (
    <>
      <S.Login>
        <ul>
          <li>
            <S.ProfileCircle />
          </li>
          <li>{user.name}님</li>
        </ul>
      </S.Login>
    </>
  );
};

export default React.memo(UserHeader);
