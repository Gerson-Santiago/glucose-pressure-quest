# Glucose Pressure Quest

Um aplicativo moderno para monitoramento de Glicemia e Pressão Arterial.

## Sobre o Projeto

Este projeto foi desenvolvido para auxiliar no controle e acompanhamento de medições de saúde, especificamente glicose e pressão arterial. O aplicativo permite o registro fácil de dados, visualização de histórico e análise através de gráficos e métricas.

## Funcionalidades

-   **Dashboard**: Visão geral com as últimas medições e médias.
-   **Registro de Medições**: Formulário intuitivo para adicionar dados de Pressão Arterial (Sistólica/Diastólica), Pulso e Glicemia.
-   **Histórico**: Tabela completa com todas as medições registradas, com opção de exclusão.
-   **Gráficos e Análise**: Visualização de tendências ao longo do tempo, com filtros por período (Manhã/Noite).
-   **Relatórios**: Geração de relatórios em PDF do histórico de medições.
-   **Design Responsivo**: Interface adaptável para dispositivos móveis e desktop.

## Tecnologias Utilizadas

-   [React](https://react.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [shadcn/ui](https://ui.shadcn.com/)
-   [Recharts](https://recharts.org/) (para gráficos)
-   [Sonner](https://sonner.emilkowal.ski/) (para notificações)

## Como Executar

Pré-requisitos: Node.js e npm instalados.

1.  Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd glucose-pressure-quest
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

4.  Acesse o aplicativo no navegador (geralmente em `http://localhost:8080` ou `http://localhost:5173`).

## Estrutura do Projeto

-   `src/components`: Componentes reutilizáveis (Formulários, Tabelas, Gráficos, UI).
-   `src/pages`: Páginas principais da aplicação (Dashboard, Histórico, Gráficos).
-   `src/contexts`: Gerenciamento de estado global (Medições, Configurações).
-   `src/lib`: Utilitários e funções auxiliares.

## Licença

Este projeto está sob a licença MIT.
