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

export function Home() {
  return (
    <HomeContainer>
      <form action="submit">
        <FormContainer>
          <label htmlFor="ocupation">
            Vou
            <OcupationInput
              id="ocupation"
              type="text"
              placeholder="estudar/trabalhar"
              list="ocupation-suggestions"
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

        <StartCountdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
