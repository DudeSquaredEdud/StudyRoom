import { Input, Paper, Text, Textarea, TextInput } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Notes() {
  const [persistentTextContent, setPersistentTextContent] = useLocalStorage({
    key: "persistentTextContent",
    defaultValue: "Type here",
  });

  return (
    <>
      <Textarea
        autosize={true}
        minRows={47}
        ta={"left"}
        value={persistentTextContent}
        onInput={(event) => {
          setPersistentTextContent(event.currentTarget.value);
          console.log(event.currentTarget.value);
        }}
      ></Textarea>
    </>
  );
}
