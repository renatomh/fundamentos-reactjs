import React, { ReactNode } from 'react';

import Dropzone from 'react-dropzone';

// Importando os estilos personalizados criados
import { DropContainer, UploadMessage } from './styles';

// Definindo a tipagem para as propriedades do uplod
interface UploadProps {
  onUpload: Function;
}

// Criando o componente para a área de upload
const Upload: React.FC<UploadProps> = ({ onUpload }: UploadProps) => {
  // Função para renderizar as mensagens do campo
  function renderDragMessage(
    isDragActive: boolean,
    isDragRejest: boolean,
  ): ReactNode {
    // Caso o mouse com o arquivo ainda não esteja na caixa de arquivo
    if (!isDragActive) {
      return (
        <UploadMessage>Selecione ou arraste o arquivo aqui.</UploadMessage>
      );
    }

    // Caso o arquivo não seja suportado
    if (isDragRejest) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>;
    }

    // Caso o arquivo seja suportado
    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }

  return (
    <>
      {/* Aqui verificamos se o arquivos que se está tentando enviar é válido */}
      <Dropzone accept=".csv, application/vnd.ms-excel, text/csv," onDropAccepted={(files) => onUpload(files)}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }): any => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} data-testid="upload" />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    </>
  );
};

export default Upload;
