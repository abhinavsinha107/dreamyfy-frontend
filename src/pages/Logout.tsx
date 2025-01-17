import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { resetToken } from "../redux/reducer/authReducer";
import { resetUser } from "../redux/reducer/userReducer";

const Logout = () => {
  const currentUser = useAppSelector((state: RootState) => state.user.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(resetToken());
    dispatch(resetUser());
    navigate("/login");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <LogoutContainer>
      <h1>{currentUser?.name || ""}</h1>
      <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
      <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
      <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
    </LogoutContainer>
  );
};

export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #85769f66;
  color: black;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: rgb(99, 60, 99);
`;
