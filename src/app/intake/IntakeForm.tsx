'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { QUESTIONS } from '@/lib/questions';
import type { IntakeAnswers } from '@/lib/types';
import { getDemoProfileById } from '@/lib/demo-profiles';
import { encodeIntakeAnswersCompact } from '@/lib/encode-answers';
import * as styles from './page.css';

const defaultAnswers: Partial<IntakeAnswers> = {
  activeChannels: [],
};

export default function IntakeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [validationError, setValidationError] = useState(false);

  const { setValue, watch, reset } = useForm<IntakeAnswers>({
    defaultValues: defaultAnswers as IntakeAnswers,
  });

  const allValues = watch();

  useEffect(() => {
    const demoId = searchParams.get('demo');
    if (!demoId) return;
    const profile = getDemoProfileById(demoId);
    if (profile) {
      reset(profile.answers);
      setCurrentStep(0);
      setValidationError(false);
    }
  }, [searchParams, reset]);

  const currentQuestion = QUESTIONS[currentStep];

  function getCurrentValue() {
    if (currentQuestion.id === 'activeChannels') {
      return allValues.activeChannels ?? [];
    }
    return allValues[currentQuestion.id as keyof Omit<IntakeAnswers, 'activeChannels'>];
  }

  function isCurrentStepValid() {
    if (currentQuestion.id === 'activeChannels') {
      return (allValues.activeChannels ?? []).length > 0;
    }
    return !!allValues[currentQuestion.id as keyof Omit<IntakeAnswers, 'activeChannels'>];
  }

  function handleOptionSelect(value: string) {
    setValidationError(false);

    if (currentQuestion.id === 'activeChannels') {
      const current = allValues.activeChannels ?? [];
      let next: string[];
      if (value === 'none') {
        next = current.includes('none') ? [] : ['none'];
      } else if (current.includes(value as never)) {
        next = current.filter((v) => v !== value);
      } else {
        next = [...current.filter((v) => v !== 'none'), value];
      }
      setValue('activeChannels', next as IntakeAnswers['activeChannels']);
    } else {
      const qId = currentQuestion.id;
      if (qId === 'businessType') setValue('businessType', value as IntakeAnswers['businessType']);
      else if (qId === 'businessStage')
        setValue('businessStage', value as IntakeAnswers['businessStage']);
      else if (qId === 'primaryGoal')
        setValue('primaryGoal', value as IntakeAnswers['primaryGoal']);
      else if (qId === 'bottleneck') setValue('bottleneck', value as IntakeAnswers['bottleneck']);
      else if (qId === 'stackMaturity')
        setValue('stackMaturity', value as IntakeAnswers['stackMaturity']);
      else if (qId === 'teamCapacity')
        setValue('teamCapacity', value as IntakeAnswers['teamCapacity']);
    }
  }

  function handleNext() {
    if (!isCurrentStepValid()) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    if (currentStep === QUESTIONS.length - 1) {
      submitForm();
    } else {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  }

  function handleBack() {
    setValidationError(false);
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  }

  function submitForm() {
    const compact = encodeIntakeAnswersCompact(allValues as IntakeAnswers);
    router.push(`/results?q=${encodeURIComponent(compact)}`);
  }

  const currentValue = getCurrentValue();
  const isLast = currentStep === QUESTIONS.length - 1;
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <span className={styles.headerBrand}>CMO Roadmap Generator</span>
        <span className={styles.headerStep}>
          {currentStep + 1} / {QUESTIONS.length}
        </span>
      </header>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <main className={styles.main}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentStep}
            className={styles.questionWrapper}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.28, ease: 'easeInOut' as const }}
          >
            <div className={styles.stepLabel}>
              Question {currentStep + 1} of {QUESTIONS.length}
            </div>

            <h1 className={styles.questionLabel}>{currentQuestion.label}</h1>
            <p className={styles.questionDesc}>{currentQuestion.description}</p>

            {currentQuestion.type === 'multi' && (
              <div className={styles.multiHint}>
                <span>✓</span> Select all that apply
              </div>
            )}

            <div className={styles.optionsGrid}>
              {currentQuestion.options.map((option) => {
                const isSelected =
                  currentQuestion.type === 'multi'
                    ? (currentValue as string[]).includes(option.value)
                    : currentValue === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={
                      isSelected
                        ? `${styles.optionCard} ${styles.optionCardSelected}`
                        : styles.optionCard
                    }
                    onClick={() => handleOptionSelect(option.value)}
                    aria-pressed={isSelected}
                  >
                    {currentQuestion.type === 'multi' && (
                      <div className={styles.optionHeaderRow}>
                        <span
                          className={
                            isSelected
                              ? `${styles.optionCheck} ${styles.optionCheckSelected}`
                              : styles.optionCheck
                          }
                        >
                          {isSelected ? '✓' : ''}
                        </span>
                        <span className={styles.optionLabel}>{option.label}</span>
                      </div>
                    )}
                    {currentQuestion.type === 'single' && (
                      <div className={styles.optionLabel}>{option.label}</div>
                    )}
                    {option.description && (
                      <div className={styles.optionDescription}>{option.description}</div>
                    )}
                  </button>
                );
              })}
            </div>

            {validationError && (
              <div className={styles.validationError} role="alert">
                Please make a selection before continuing.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className={styles.navigation}>
          {currentStep > 0 && (
            <button type="button" onClick={handleBack} className={styles.backButton}>
              ← Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className={isLast ? styles.submitButton : styles.nextButton}
          >
            {isLast ? 'Generate My Roadmap →' : 'Next →'}
          </button>
        </div>
      </main>
    </div>
  );
}
