import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import YardIcon from "@mui/icons-material/Yard";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BusinessIcon from "@mui/icons-material/Business";
import { useGameState } from "../contexts/GameState";

const shopItems = [
  {
    name: "Office plants",
    price: 100,
    recurringPrice: 0,
    description:
      "A bunch of office plants that'll make your human staff a little happier",
    icon: <YardIcon />,
    isActive: () => true,
    action: (state) => {
      return {
        ...state,
        employeeHappiness: state.employeeHappiness + 0.05,
        currency: state.currency - 100,
      };
    },
  },
  {
    name: "Fancy coffee machine",
    price: 500,
    recurringPrice: 0,
    description:
      "Look it's just a coffee machine but a little fancy, your employees seem to care deeply and it makes them happier",
    icon: <CoffeeMakerIcon />,
    isActive: () => true,
    action: (state) => {
      return {
        ...state,
        employeeHappiness: state.employeeHappiness + 0.1,
        currency: state.currency - 500,
      };
    },
  },
  {
    name: "New employee",
    price: 3000,
    recurringPrice: 50,
    description: "Woah, a new team member! I wonder if they'll be nice?",
    icon: <PersonAddIcon />,
    isActive: (state) => state.employees < 5,
    action: (state) => {
      return {
        ...state,
        employees: state.employees + 1,
        currency: state.currency - 3000,
        currencyChange: state.currencyChange - 50,
      };
    },
  },
  {
    name: "New office building",
    price: 15000,
    recurringPrice: 0,
    description:
      "Look at you go, some new bricks and mortar will surely help you grow... right?",
    icon: <BusinessIcon />,
    isActive: () => true,
    action: (state) => {
      return {
        ...state,
        maximumEmployees: state.maximumEmployees + 15,
        currency: state.currency - 15000,
      };
    },
  },
];

export const Shop = () => {
  const { state, dispatch } = useGameState();

  const { currency } = state;

  return (
    <>
      <List>
        {shopItems.map((item, index) => (
          <ListItem disablePadding key={index}>
            <Tooltip title={item.description}>
              <ListItemButton
                disabled={!item.isActive(state) || currency < item.price}
                onClick={() =>
                  dispatch({ type: "purchaseItem", payload: item })
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={`${item.name} – $${item.price}${
                    item.recurringPrice > 0
                      ? ` (-$${item.recurringPrice.toLocaleString()} per second)`
                      : ""
                  }`}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );
};
