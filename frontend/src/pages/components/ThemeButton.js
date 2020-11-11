/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui";


const modes = ["default", "dark"];
const  text = ["light", "dark "];

var index;

function updateColor(mode) {
    index = modes.indexOf(mode);
}

export default (props) => {
    const [mode, setMode] = useColorMode();
    return (
        <button
            id="themeButton"
            sx={{
                backgroundColor: "text",
                color: "background",
                borderRadius: "3px",
                border: "0px",
                height: "34px",
            }}
            onClick={(e) => {
                updateColor(mode);
                let next = modes[(index + 1) % modes.length];
                setMode(next);
            }}
        >
            {text[(modes.indexOf(mode) + 1) % modes.length]} theme
        </button>
    );
};
