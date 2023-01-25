import React, { useState, useEffect } from "react";
import './styles.css';
//importação de um componete React
import { Card } from '../../components/Card';

//minha Home com a exportaçã da função Home para o App React do meu app. Usei a Div para estilizar também.
function Home() {
//Criação de um estado para captura e armazenar o valor digitado no impput
  const [studentName, setStudentName] = useState("");
//Criação de um estado para armazenar os meus estudante da lita de presença
  const [students, setStudents] = useState([]);
//Criação de um estado para armazenar o conteúdo da API do Git
  const [user, setUser] = useState({ name: "", avatar: "" });

  //função que criamos um objeto para pegar o nome e o time que está sendo digitado no imput. NOVO ESTUDANTE
  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
//usando a funçao que atualiza o estado para armazenar os alunos com o prevStae e spredoperation (...)que já foram digitado e os novos
//como é estado estou substituindo o conteúdo que era o novo aluno, por aluno antigo com novo aluno.
    setStudents((prevState) => [...prevState, newStudent]);
  }
//Usando um Hook do React useEffect para consumir um API do github e pegar meu nome e avatar
//no reponse já transofrme em resposta json para pegar os dados e jogar dentro do meu estado User

useEffect(() => {
  fetch("https://api.github.com/users/gutemberg-miranda")
    .then((response) => response.json())
    .then((data) => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    });
    /* Aqui é para rodar como async dentro de useEffect pois ele não aceita ser async assim como fazemos em uma função
    async function fetchData() {
      const response = await fetch("https://api.github.com/users/birobirobiro");
      const data = await response.json();
      console.log("DADOS =>", data);

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();*/
}, []);

  return (
    <div className="container">
       <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {students.map((student) => (
        <Card 
        key={student.time}
        name={student.name} 
        time={student.time} 
        />
      ))}
    </div>
  );
}

export default Home 