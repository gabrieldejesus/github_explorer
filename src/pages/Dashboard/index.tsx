import React from 'react';

import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form action="">
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/59370348?s=460&u=537bfc780f4589978bc73072258df819eab52623&v=4"
            alt="Gabriel de Jesus"
          />
          <div>
            <strong>devgabrieldejesus/gb</strong>
            <p>A bot that helps me day in and day out</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/59370348?s=460&u=537bfc780f4589978bc73072258df819eab52623&v=4"
            alt="Gabriel de Jesus"
          />
          <div>
            <strong>devgabrieldejesus/gb</strong>
            <p>A bot that helps me day in and day out</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
            src="https://avatars0.githubusercontent.com/u/59370348?s=460&u=537bfc780f4589978bc73072258df819eab52623&v=4"
            alt="Gabriel de Jesus"
          />
          <div>
            <strong>devgabrieldejesus/gb</strong>
            <p>A bot that helps me day in and day out</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
