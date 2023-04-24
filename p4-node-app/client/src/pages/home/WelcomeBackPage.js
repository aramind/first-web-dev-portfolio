import { Box, Stack, Toolbar, Typography, styled } from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import muiTheme from "../../muiTheme";
import SideBar from "../../components/sidebar/SideBar";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns-tz";
import SummaryTable from "../../components/summary-table/SummaryTable";
import ChartDisplay from "../../components/charts/ChartDisplay";
import MiniRecord from "../../components/MiniRecord";
// import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";

const TextTypography = styled(Typography)({
  // textAlign: "center",
  fontFamily: "Prompt",
  padding: "0.1rem 0",
});
const WelcomeBackPage = () => {
  const {
    state: { currentUser },
  } = useValue();

  // date selected

  // const formattedDate = format(selectedDate, "E MMM d, yyyy");
  // date selected
  const {
    state: { selectedDate, recordForSelectedDate },
    dispatch,
  } = useValue();
  const formattedDate = format(selectedDate, "E MMM d, yyyy");

  // handlers
  const handleDatePickerChange = (date) => {
    dispatch({ type: "UPDATE_DATESELECTED", payload: date });
  };

  // console.log("from WBP", selectedDate);
  return (
    <Box
      alignItems={"center"}
      width="100%"
      display={"flex"}
      flexDirection={"column"}
    >
      <Toolbar sx={{ marginBottom: "10px" }} />

      <Stack direction={"column"}>
        <Box
          minHeight={"20vh"}
          height={{ md: "40vh" }}
          width={{ sx: "100vw", md: "80vw", lg: "60vw" }}
          backgroundColor="lightblue"
          sx={{ marginInline: "auto", my: "30px" }}
        >
          {/* TODO: put a hero image in this box */}
        </Box>
        <Box px={4}>
          <TextTypography
            // textAlign={"center"}
            fontSize="2rem"
          >
            Hi {currentUser.username}! 👋
          </TextTypography>
          <TextTypography>Hope you're having a good day so far!</TextTypography>
          <TextTypography>
            Take a moment to reflect on your goals and priorities each day.
          </TextTypography>
          <TextTypography>
            Remember, small steps can lead to big achievements!
          </TextTypography>
          <Typography
            fontFamily={"Prompt"}
            textAlign={"left"}
            my={2.5}
          >
            Here's a quote to inspire your for the day:
          </Typography>
          <Box
            px={4}
            py={2}
            margin="0 auto"
            width="80%"
          >
            <Typography
              textAlign={"center"}
              fontStyle="italic"
              paddingBottom={1}
              fontFamily="Prompt"
              fontSize="1.5rem"
              color={muiTheme.palette.primary.dark}
            >
              Never leave till tomorrow that which you can do today
            </Typography>
            <Typography
              fontStyle="italic"
              textAlign={"right"}
              paddingTop={1}
              fontFamily="Prompt"
            >
              -- Benjamin Franklin
            </Typography>
          </Box>
          <TextTypography>
            Let's make the most of our time ⏱️ and stay productive! 🚀💪💯
          </TextTypography>
        </Box>
        <MiniRecord />
        {/* TImepicker -- summary -- chart */}
        {/* <Stack
          direction={"column"}
          marginInline="auto"
        >
         

          <Box
            height={"300px"}
            width={"100%"}
            my={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box
              textAlign="center"
              minWidth="200px"
            >
              <Box
                my={"1rem"}
                width={"100%"}
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",

                  px: "5px",
                  color: muiTheme.palette.primary.main,
                }}
              >
                <Typography variant="h5">{formattedDate}</Typography>
              </Box>

              <DatePicker
                label={"Select Date"}
                value={selectedDate}
                onChange={handleDatePickerChange}
                format="MM/dd/yyyy"
                disableFuture={true}
                maxDate={new Date()}
                inputFormat="MM/dd/yyyy"
                timeZone="Asia/Manila"
              />
            </Box>
            <Box
              textAlign="center"
              minWidth="200px"
            >
              <SummaryTable />
            </Box>
            <Box
              textAlign="center"
              minWidth="200px"
            >
              {recordForSelectedDate && <ChartDisplay showSummary={false} />}
            </Box>
          </Box>
        </Stack> */}
        <Box
          px={4}
          py={1}
          mb={4}
        >
          <Typography mb={1}>What to do next?</Typography>
          <SideBar />
        </Box>
      </Stack>
    </Box>
  );
};

export default WelcomeBackPage;
