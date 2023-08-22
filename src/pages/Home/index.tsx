import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { differenceInSeconds } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { HandPalm, Play } from 'phosphor-react';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  TaskInput,
  MinutesAmountInput,
  OcupationInput,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';

const newCycleValidationSchema = zod.object({
  ocupation: zod
    .string()
    .min(1, 'Informe uma ocupação'),
  task: zod
    .string()
    .min(1, 'Informe uma tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalo precisa ser de no mínimo 5 minutos')
    .max(60, 'O intervalo precisa ser de no máximo 60 minutos'),
});

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>;

interface Cycle {
  id: string;
  ocupation: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      ocupation: '',
      task: '',
      minutesAmount: 5,
    },
  });

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      ocupation: data.ocupation,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupDate: new Date() };
        }
        return cycle;
      }),
    );
    setActiveCycleId(null);
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  const hasOcupation = watch('ocupation');
  const hasTask = watch('task');
  const isSubmitDisabled = !hasOcupation || !hasTask;

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} | PomoTimer`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="submit">
        <FormContainer>
          <label htmlFor="ocupation">
            Vou
            <OcupationInput
              id="ocupation"
              type="text"
              placeholder="tarefa"
              list="ocupation-suggestions"
              disabled={!!activeCycle}
              {...register('ocupation')}
            />
            <datalist id="ocupation-suggestions">
              <option value="estudar">Estudar</option>
              <option value="trabalhar">Trabalhar</option>
            </datalist>
          </label>
          <label htmlFor="task">
            em
            <TaskInput
              id="task"
              type="text"
              placeholder="dê um nome para sua tarefa"
              list="task-suggestions"
              disabled={!!activeCycle}
              {...register('task')}
            />
            <datalist id="task-suggestions">
              <option value="projeto 1">Projeto 1</option>
            </datalist>
          </label>

          <label htmlFor="minutesAmount">
            durante
            <MinutesAmountInput
              id="minutesAmount"
              type="number"
              placeholder="00"
              step={5}
              min={5}
              max={60}
              disabled={!!activeCycle}
              {...register('minutesAmount', { valueAsNumber: true })}
            />
          </label>

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {
          activeCycle ? (
            <StopCountdownButton onClick={handleInterruptCycle} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )
        }
      </form>
    </HomeContainer>
  );
}
