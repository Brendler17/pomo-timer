import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../..';
import {
  FormContainer, MinutesAmountInput, OcupationInput, TaskInput,
} from './styles';

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
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
          min={1}
          max={60}
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
        />
      </label>

      <span>minutos.</span>
    </FormContainer>
  );
}
