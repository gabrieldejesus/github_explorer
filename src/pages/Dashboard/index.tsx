import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  // não preciso colocar a tipagem de tudo que eu preciso da api | colocar só as tipagens que a interface vai usar
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories); // conversão ao contraria transformando em array
    }
    return [];
  });

  // sempre que eu tiver uma mudança na variavel eu salvo no localStorage
  useEffect(() => {
    // JSON.stringify: transforma variavel em formato de JSON
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    ); // sempre utilizar o @... para não conflitar com outros localStorage da minha porta 3000
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault(); // prevenir comportamento padrão do forms

    // se o usuário não digitar nenhum valor
    if (!newRepo) {
      setInputError('Digite o autor/name do repositório');
      return; // evitar com que o restante do código rode
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`); // Consumir API do GitHub

      const repository = response.data; // Adição de um novo repositorório

      setRepositories([...repositories, repository]); // Salvar novo repositório no estado
      setNewRepo(''); // limpando input
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      {/* !: converte valor do input error em valor ao contrato !! converte de volta */}
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {/* condicional sem else */}
      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
