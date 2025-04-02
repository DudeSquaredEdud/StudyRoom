import {
  Alert,
  Button,
  ButtonGroup,
  Center,
  Container,
  Paper,
  SemiCircleProgress,
  Text,
} from "@mantine/core";
import { useState, useEffect, useRef, MouseEvent } from "react";

enum TimerSteps {
  StartStep = 0,
  BreakStep = 1,
  LongBreakStep = 5,
}

/**
 * Creates a pomodoro timer
 * All times are in seconds.
 * @param startTime The initial time set for the timer
 * @param breakTime The short break timer
 * @param longBreakTime The long break timer
 */
function Pomodoro({ startTime = 1500, breakTime = 300, longBreakTime = 900 }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [paused, setPaused] = useState(true);
  const [timer, setTimer] = useState(startTime);
  const intervalRef = useRef<null | number>(null);
  const superClearInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const cycles: number = 0;

  // Get the current step's time
  const getCurrentStepTime = () => {
    switch (currentStep) {
      case TimerSteps.LongBreakStep:
        return longBreakTime;
      case TimerSteps.StartStep:
      case TimerSteps.StartStep + 2:
      case TimerSteps.StartStep + 4:
        return startTime;
      case TimerSteps.BreakStep:
      case TimerSteps.BreakStep + 2:
        return breakTime;
      default:
        return 1;
    }
  };

  // Set initial timer based on step whenever p="s"  step changes
  // Hardcoded as fuck
  useEffect(() => {
    switch (currentStep) {
      case TimerSteps.LongBreakStep:
        setTimer(longBreakTime);
        break;
      case TimerSteps.StartStep:
      case TimerSteps.StartStep + 2:
      case TimerSteps.StartStep + 4:
        setTimer(startTime);
        break;
      case TimerSteps.BreakStep:
      case TimerSteps.BreakStep + 2:
        setTimer(breakTime);
        break;
    }
  }, [currentStep, startTime, breakTime, longBreakTime]);

  // Clean up interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  /**
   * Rotates between steps.
   * @param e - event; only here to satisfy requirements
   * @param step Optional. The step to change to.
   * - 0 for start
   * - 1 for break
   * - 2 for long break
   */
  const rotateSteps = (e: MouseEvent | null, step: number | null | "next") => {
    if (step !== undefined && step !== null) {
      if (step == "next") {
        setCurrentStep((currentStep + 1) % 6);
      }
    }

    setPaused(true);

    // Clear any existing interval
    superClearInterval();
  };

  const runCountdown = () => {
    // Toggle pause state
    setPaused((prevPaused) => {
      const newPaused = !prevPaused;

      // Clear existing interval
      superClearInterval();

      // If unpausing, start a new interval
      if (!newPaused) {
        intervalRef.current = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer == 1) {
              alert();
              // Time's up - rotate steps and pause
              rotateSteps(null, "next");
              return 0;
            }
            return prevTimer - 1;
          });
        }, 1000);
      }

      return newPaused;
    });
  };

  const pomodoroTimer = (
    <>
      <Center>
        <SemiCircleProgress
          style={{ zIndex: "var(--mantine-z-index-overlay)" }}
          fillDirection="left-to-right"
          orientation="up"
          filledSegmentColor="teal"
          emptySegmentColor="rgba(221, 221, 221, 0.40)"
          p={"xl"}
          size={380}
          thickness={21}
          value={(currentStep / 5) * 100}
          label={
            <Center>
              <SemiCircleProgress
                fillDirection="left-to-right"
                orientation="up"
                filledSegmentColor={currentStep < 5 ? "blue" : "indigo"}
                p={"xl"}
                size={350}
                thickness={20}
                value={100 - (timer / getCurrentStepTime()) * 100}
                labelPosition="center"
                label={
                  <Text size="100px">
                    {Math.floor(timer / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(timer % 60).toString().padStart(2, "0")}
                  </Text>
                }
              />
            </Center>
          }
        />
      </Center>
    </>
  );

  return (
    <>
      <Paper p="xl" shadow="none" w={"25vw"}>
        {pomodoroTimer}
        <ButtonGroup w={"auto"}>
          <Button w={"50%"} onClick={runCountdown}>
            {paused ? "Start" : "Pause"}
          </Button>
          <Button w={"50%"} onClick={(e) => rotateSteps(e, "next")}>
            →
          </Button>
        </ButtonGroup>
      </Paper>
    </>
  );
}

export default Pomodoro;
