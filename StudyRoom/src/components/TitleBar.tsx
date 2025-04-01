import {
  Center,
  getDefaultZIndex,
  Text,
  Input,
  Paper,
  Textarea,
} from "@mantine/core";
import { randomId } from "@mantine/hooks";
import { useState } from "react";

export default function TitleBar({ actionText, setActionText }) {
  const actionList = [
    "Mess stuff up",
    "Clean my room",
    "Kill two birds with zero stones",
    "Feed my cat",
    "Kill this project",
    "Cook a pancake",
    "Study Algebra",
    "Lofi and cram",
    "Pet my cat",
    "Draw a shark",
    "Fly a plane",
    "Fix my toaster",
    "Alphabetize my thoughts",
    "Teach myself to dance",
    "Throw spoooons at the moooon",
  ];
  const getAction = () => {
    return actionList[Math.floor(Math.random() * actionList.length)];
  };
  return (
    <>
      <Paper p="xl" shadow="none" w={"auto"}>
        <Input.Wrapper label="Aw yeah, it's time to:">
          <Textarea
            style={{ textAlignLast: "center" }}
            placeholder={getAction()}
            // value=
            onChange={(event) => setActionText(event.currentTarget.value)}
            rightSection={
              <Input.ClearButton onClick={() => setActionText("")} />
            }
            rightSectionPointerEvents="auto"
            p="xl"
            maxRows={3}
            autosize
            size={"40px"}
          >
            {actionText}
          </Textarea>
        </Input.Wrapper>
      </Paper>
    </>
  );
}
