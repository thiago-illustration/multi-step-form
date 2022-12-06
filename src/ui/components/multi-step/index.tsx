import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";

type Step = {
  title: string;
  optional?: boolean;
  component: React.ReactElement;
};

type StepWithIndex = { index: number } & Step;

type MultiStepState = {
  steps: StepWithIndex[];
  currentStep: StepWithIndex;
  isFirstStep: boolean;
  isLastStep: boolean;
  isCurrentStep: (stepIndex: number) => boolean;
  visitedStepIndexes: number[];
  goNext: () => void;
  goPrev: () => void;
  goToStep: (stepIndex: number) => void;
};

export type MultiStepProps = {
  steps: Step[];
  initialStepIndex?: number;
  hideTimeline?: boolean;
};

const MultiStepContext = createContext<MultiStepState | undefined>(undefined);

const Timeline = () => {
  const { steps, visitedStepIndexes, isCurrentStep, goToStep } = useMultiStep();

  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
      {steps.map((step) => (
        <div key={step.index}>
          <button
            type="button"
            style={{
              color: isCurrentStep(step.index) ? "red" : "black",
            }}
            disabled={!visitedStepIndexes.includes(step.index)}
            onClick={() => goToStep(step.index)}
          >
            {step.title}
          </button>
        </div>
      ))}
    </div>
  );
};

export const MultiStep = ({
  steps,
  initialStepIndex = 0,
  hideTimeline,
}: MultiStepProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);
  const [visitedStepIndexes, setVisitedStepIndexes] = useState<number[]>([]);

  const stepsWithIndex = useMemo(() => {
    return steps.map((step, i) => ({ index: i, ...step }));
  }, [steps]);

  const currentStep = useMemo(() => {
    return stepsWithIndex[currentStepIndex];
  }, [currentStepIndex, stepsWithIndex]);

  const isFirstStep = useMemo(() => currentStepIndex === 0, [currentStepIndex]);

  const isLastStep = useMemo(
    () => currentStepIndex === steps.length - 1,
    [currentStepIndex, steps]
  );

  const isCurrentStep = useCallback(
    (stepIndex: number) => stepIndex === currentStepIndex,
    [currentStepIndex]
  );

  const goNext = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const nextStep = prev + 1;

      if (nextStep > steps.length) {
        return prev;
      }

      return nextStep;
    });
  }, []);

  const goPrev = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const prevStep = prev - 1;

      if (prevStep < 0) {
        return prev;
      }

      return prevStep;
    });
  }, []);

  const goToStep = useCallback((stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  }, []);

  useEffect(() => {
    setVisitedStepIndexes((prev) => {
      if (prev.includes(currentStepIndex)) return prev;
      return [...prev, currentStepIndex];
    });
  }, [currentStepIndex]);

  return (
    <MultiStepContext.Provider
      value={{
        steps: stepsWithIndex,
        currentStep,
        isFirstStep,
        isLastStep,
        isCurrentStep,
        visitedStepIndexes,
        goNext,
        goPrev,
        goToStep,
      }}
    >
      <>
        {!hideTimeline && <Timeline />}
        {steps[currentStepIndex]}
      </>
    </MultiStepContext.Provider>
  );
};

export const useMultiStep = () => {
  const ctx = useContext(MultiStepContext);
  if (!ctx) throw new Error("Missing MultiStepProvider");
  return ctx;
};
