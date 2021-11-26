import {
  Tooltip,
  Chip,
  Stack,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import { GameStageEnum, useGameState } from "../contexts/GameState";

const getPhaseState = (gameTime) => {
  const minutesIntoGame = secondsToFlooredMinutes(gameTime);

  if (minutesIntoGame < 3) {
    return { name: "Start up", progress: (gameTime / 180) * 100 };
  }

  if (minutesIntoGame < 7) {
    return { name: "IPO", progress: ((gameTime - 180) / 240) * 100 };
  }

  if (minutesIntoGame < 12) {
    return { name: "International", progress: ((gameTime - 420) / 300) * 100 };
  }

  return { name: "Intergalactic", progress: 100 };
};

const secondsToFlooredMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

export const Toolbar = () => {
  const {
    state: { currency, gameTime, gameStage, employeeHappiness },
    dispatch,
  } = useGameState();

  const { name, progress } = getPhaseState(gameTime);

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: "1rem",
        justifyContent: "space-between",
        marginBottom: "2rem",
      }}
    >
      <Stack direction="row" spacing={1}>
        <CircularProgress
          variant="determinate"
          color="secondary"
          value={progress}
        />
        <Tooltip title="Game phase">
          <Chip
            color="secondary"
            label={name}
            icon={<HistoryToggleOffIcon />}
          />
        </Tooltip>
        <Tooltip title="Cash on hand">
          <Chip
            color="primary"
            label={`$${currency.toLocaleString()}`}
            icon={<AttachMoneyIcon />}
          />
        </Tooltip>
        <Tooltip title="Employee happiness">
          <Chip
            color="warning"
            label={`${
              employeeHappiness > 0 ? "+" : ""
            }${employeeHappiness.toFixed(1)}`}
            icon={<SentimentVerySatisfiedIcon />}
          />
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Button
          onClick={() =>
            dispatch({
              type:
                gameStage === GameStageEnum.RUNNING ? "pauseGame" : "startGame",
            })
          }
        >
          {gameStage === GameStageEnum.RUNNING ? "Pause" : "Resume"}
        </Button>
      </Stack>
    </Paper>
  );
};
