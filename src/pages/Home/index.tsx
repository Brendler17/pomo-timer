import { FormProvider, useForm } from 'react-hook-form';
import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';
import {
  HomeContainer,
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
    .min(1, 'O intervalo precisa ser de no mínimo 5 minutos')
    .max(60, 'O intervalo precisa ser de no máximo 60 minutos'),
});

export type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>;

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      ocupation: '',
      task: '',
      minutesAmount: 5,
    },
  });

  const { handleSubmit, watch /* reset */ } = newCycleForm;

  const hasOcupation = watch('ocupation');
  const hasTask = watch('task');
  const isSubmitDisabled = !hasOcupation || !hasTask;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="submit">

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {
          activeCycle ? (
            <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
