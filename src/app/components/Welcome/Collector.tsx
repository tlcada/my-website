import Presentation from "./Presentation";
import React from "react";
import Contact from "./Contact";

export default function Collector(): React.ReactElement {
    return(
        <main>
            <Presentation />
            <Contact />
        </main>
    );
}
