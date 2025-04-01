import "./App.css";
import Pomodoro from "./components/Pomodoro";
import "@mantine/core/styles.css";

import {
  useMantineColorScheme,
  AppShell,
  Burger,
  Button,
  Center,
  Group,
  MantineProvider,
  Paper,
  Overlay,
} from "@mantine/core";
import Notes from "./components/Notes";
import TitleBar from "./components/TitleBar";
import { useDisclosure } from "@mantine/hooks";
import FocusMode from "./components/FocusMode";
import LightDarkButton from "./components/LightDarkButton";
import MainShell from "./components/MainShell";

export default function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <MantineProvider>
      {
        <>
          <AppShell
            // w={"60vw"}
            header={{ height: 60 }}
            padding="md"
            navbar={{
              width: { base: 200, md: 300, lg: 400 },
              breakpoint: "sm",
              collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
          >
            <AppShell.Header>
              <Group h="100%" px="md">
                <Burger
                  opened={mobileOpened}
                  onClick={toggleMobile}
                  hiddenFrom="sm"
                  size="sm"
                />
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom="sm"
                  size="sm"
                />
                <LightDarkButton />
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
              <Notes />
            </AppShell.Navbar>
            <AppShell.Main>
              <MainShell />
            </AppShell.Main>
          </AppShell>
        </>
      }
    </MantineProvider>
  );
}
