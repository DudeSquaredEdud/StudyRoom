import { Paper, Center } from "@mantine/core";
import FocusMode from "./FocusMode";
import Pomodoro from "./Pomodoro";
import TitleBar from "./TitleBar";
import { useState } from "react";

export default function MainShell() {
  const [actionText, setActionText] = useState("");

  return (
    <>
      <FocusMode actionText={actionText} />
      <Paper shadow="xl">
        <Center>
          <Pomodoro />
        </Center>
        <TitleBar actionText={actionText} setActionText={setActionText} />
      </Paper>
    </>
  );
}
