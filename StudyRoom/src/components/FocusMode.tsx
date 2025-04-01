import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Center,
  Text,
  Overlay,
  Transition,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

export default function FocusMode({ actionText }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  var changeSchemeBoolean = true;

  const focusClick = (scheme: "dark" | "light") => {
    if (changeSchemeBoolean) {
      // if its already the color it needs to be
      if (scheme === computedColorScheme) {
        // don't change it back next time
        changeSchemeBoolean = false;
      } else {
        setColorScheme(scheme);
      }
    } else changeSchemeBoolean = true;
  };

  return (
    <>
      <Transition
        mounted={opened}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Overlay
            style={styles}
            zIndex={opened ? 200 : -200}
            onClick={() => {
              focusClick("light");
              close();
            }}
            gradient={`linear-gradient(145deg, rgb(
        10, 
        20, 
        30) 0%, 
        rgb(
        40, 
        50, 
        60) 100%)`}
          >
            <Center>
              <Text pos={"absolute"} top={"59%"} size={"40px"}>
                {actionText}
              </Text>
            </Center>
          </Overlay>
        )}
      </Transition>

      <Button
        variant="default"
        onClick={() => {
          focusClick("dark");
          open();
        }}
      >
        Focus Mode
      </Button>
    </>
  );
}
