import { HistoryContainer, HistoryList } from './styles';

export function History() {
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
            <tr>
              <td>PomoTimer</td>
              <td>Estudo</td>
              <td>30 minutos</td>
              <td>Há 2 horas</td>
              <td>Completo</td>
            </tr>
            <tr>
              <td>PomoTimer</td>
              <td>Estudo</td>
              <td>30 minutos</td>
              <td>Há 2 horas</td>
              <td>Completo</td>
            </tr>
            <tr>
              <td>PomoTimer</td>
              <td>Estudo</td>
              <td>30 minutos</td>
              <td>Há 2 horas</td>
              <td>Completo</td>
            </tr>
            <tr>
              <td>PomoTimer</td>
              <td>Estudo</td>
              <td>30 minutos</td>
              <td>Há 2 horas</td>
              <td>Completo</td>
            </tr>
            <tr>
              <td>PomoTimer</td>
              <td>Estudo</td>
              <td>30 minutos</td>
              <td>Há 2 horas</td>
              <td>Completo</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
