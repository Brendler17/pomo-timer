import { Play } from 'phosphor-react';
import {
  StartCountdownButton, CountdownContainer, FormContainer, HomeContainer, Separator,
} from './styles';

export function Home() {
  return (
    <HomeContainer>
      <form action="submit">
        <FormContainer>
          <label htmlFor="task">
            Vou trabalhar em
            <input id="task" type="text" />
          </label>

          <label htmlFor="minutesAmount">
            durante
            <input id="minutesAmount" type="number" />
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
