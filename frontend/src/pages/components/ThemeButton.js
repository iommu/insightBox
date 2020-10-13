/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui";
import theme from "../../styles/theme";

const modes = ["default", "dark"];

export default (props) => {
  const [mode, setMode] = useColorMode();
  return (
    <button
      id="themeButton"
      {...props}
      onClick={(e) => {
        const index = modes.indexOf(mode);
        let next = modes[(index + 1) % modes.length];
        setMode(next);
      }}
    >
      {modes[(modes.indexOf(mode) + 1) % modes.length]} theme
    </button>
  );
};
