import * as React from "react";

import { Select } from "./components/Select";

const bgImage = require("./static/background.jpg");

export const App = () =>
    <div>
        <Select text="Hello World!" />
        <img src={bgImage} />
    </div>
