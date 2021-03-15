import React from 'react';

import { Container, FileInfo } from './styles';

// Definindo a tipagem para as propriedades do arquivo
interface FileProps {
  name: string;
  readableSize: string;
}

// Definindo a tipagem para a lista de propriedades dos arquivos
interface FileListProps {
  files: FileProps[];
}

// Componente para listar os arquivos a serem carregados pela página de importação
const FileList: React.FC<FileListProps> = ({ files }: FileListProps) => {
  return (
    <Container>
      {files.map((uploadedFile) => (
        <li key={uploadedFile.name}>
          <FileInfo>
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}</span>
            </div>
          </FileInfo>
        </li>
      ))}
    </Container>
  );
};

export default FileList;
