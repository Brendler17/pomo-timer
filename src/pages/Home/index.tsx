import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Play } from 'phosphor-react';
import {
  StartCountdownButton,
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  TaskInput,
  MinutesAmountInput,
  OcupationInput,
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

export function Home() {
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
    console.log(data);
    reset();
  }

  const hasOcupation = watch('ocupation');
  const hasTask = watch('task');
  const isSubmitDisabled = !hasOcupation || !hasTask;

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
              {...register('minutesAmount', { valueAsNumber: true })}
            />
          </label>

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
