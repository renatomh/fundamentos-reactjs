import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Biblioteca para formatação e apresentação de tamanhos de arquivos
import filesize from 'filesize';

// Importando os componentes
import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

// Importando os estilos personalizados criados
import { Container, Title, ImportFileContainer, Footer } from './styles';

// Imporntando os ícones para a página
import alert from '../../assets/alert.svg';
import api from '../../services/api';

// Definindo a tipagem das propriedades do arquivo a ser carregado
interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  // Criando os estados para os arquivos a serem carregados
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  // Função para lidar efetivamente com o upload dos arquivos
  async function handleUpload(): Promise<void> {
    // Somente um arquivo pode ser carregado por ver, conforme definido no backend
    // Documentação do FormData: https://developer.mozilla.org/pt-BR/docs/Web/API/FormData
    const data = new FormData();

    // Verificando se algum arquivo foi passado
    if (!uploadedFiles.length) return;

    // Anexando o arquivo aos dados sendo enviados à API
    const file = uploadedFiles[0];
    // Documentação do append() do FormData: https://developer.mozilla.org/pt-BR/docs/Web/API/FormData/append
    data.append('file', file.file, file.name);

    // Envinado o arquivo à rota da API definida
    try {
      await api.post('/transactions/import', data);
      history.push('/');
    } catch (err) {
      console.log(err.response.error);
    }
  }

  // Função para definir os arquivos selecionados a serem carregados
  function submitFile(files: File[]): void {
    // Carregando o arquivo selecionado
    const uploadFiles = files.map(file => ({
      file,
      name: file.name,
      readableSize: filesize(file.size),
    }))
    // Configurando o estado dos arquivos carregados
    setUploadedFiles(uploadFiles);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        {/* Container para a importação dos arquivos */}
        <ImportFileContainer>
          {/* Parte do upload */}
          <Upload onUpload={submitFile} />
          {/* Verificando se algum arquivo foi passado */}
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          {/* Rodapé */}
          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
