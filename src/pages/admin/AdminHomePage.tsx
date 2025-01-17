import { Container, Grid, Paper } from "@mui/material";
// import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from "styled-components";
import CountUp from "react-countup";
import { useEffect } from "react";
// import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
// import { getAllStudents } from '../../redux/studentRelated/studentHandle';
// import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { RootState, useAppSelector } from "../../redux/store";
import { useGetCountUsersQuery } from "../../services/api";

const AdminHomePage = () => {
  const {data: userCount} = useGetCountUsersQuery()
  // const dispatch = useDispatch();
  // const { studentsList } = useSelector((state) => state.student);
  // const { sclassesList } = useSelector((state) => state.sclass);
  // const { teachersList } = useSelector((state) => state.teacher);

  // const currentUser = useAppSelector((state: RootState) => state.user.user)

  // const adminID = currentUser?._id

  // useEffect(() => {
  //     dispatch(getAllStudents(adminID));
  //     dispatch(getAllSclasses(adminID, "Sclass"));
  //     dispatch(getAllTeachers(adminID));
  // }, [adminID, dispatch]);

  // const numberOfStudents = studentsList && studentsList.length;
  // const numberOfClasses = sclassesList && sclassesList.length;
  // const numberOfTeachers = teachersList && teachersList.length;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper sx={{
              boxShadow: 'none',
              borderRadius: 2,
              justifyContent: 'center !important',
              gap: 2
            }}>
              <img src={Students} alt="Students" />
              <Title>Total Students</Title>
              <Data start={0} end={userCount?.data?.students} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper sx={{
              boxShadow: 'none',
              borderRadius: 2,
              justifyContent: 'center !important',
              gap: 2
            }}>
              <img src={Classes} alt="Classes" />
              <Title>Total Classes</Title>
              <Data start={0} end={userCount?.data?.classes} duration={5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper sx={{
              boxShadow: 'none',
              borderRadius: 2,
              justifyContent: 'center !important',
              gap: 2
            }}>
              <img src={Teachers} alt="Teachers" />
              <Title>Total Teachers</Title>
              <Data start={0} end={userCount?.data?.teachers} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper sx={{
              boxShadow: 'none',
              borderRadius: 2,
              justifyContent: 'center !important',
              gap: 2
            }}>
              <img src={Fees} alt="Fees" />
              <Title className="font-semibold">Fees Collection</Title>
              <Data start={0} end={23000} duration={2.5} prefix="$" />{" "}
            </StyledPaper>
          </Grid>
          {/* <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{
              p: 2, display: "flex", flexDirection: "column", boxShadow: 'none',
              borderRadius: 2,
            }}>
              <SeeNotice />
            </Paper>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default AdminHomePage;
