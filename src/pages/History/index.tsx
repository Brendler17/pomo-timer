import { useContext } from 'react';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CyclesContext } from '../../contexts/CyclesContext';
import { HistoryContainer, HistoryList, Status } from './styles';

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Área</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              cycles.map((cycle) => (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.ocupation}</td>
                  <td>{cycle.minutesAmount}</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      locale: ptBR,
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (<Status statusColor="green">Concluído</Status>)}
                    {cycle.interruptedDate && (<Status statusColor="red">Interrompido</Status>)}
                    {(!cycle.finishedDate && !cycle.interruptedDate) && (<Status statusColor="yellow">Andamento</Status>)}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
