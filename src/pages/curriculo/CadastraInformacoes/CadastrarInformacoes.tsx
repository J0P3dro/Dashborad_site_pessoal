// ** Imports do React
import React, { useEffect, useState } from "react";

// ** Imports de pacotes
import * as Yup from "yup";
import { AxiosError } from "axios";

// ** Imports de componentes
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";
import InformacoesCard from "./CardInformacoes/InformacoesCard";
import Textarea from "../../../components/forms/Textarea";

// ** Imports de serviços
import {
  Informacoes,
  getInformacoes,
  deleteInformacoes,
  createOrUpdateInformacoes,
} from "../../../services/informacoesService";

// ** Imports de estilos
import styles from "./CadastrarInformacoes.module.css";

const CadastrarInformacoes: React.FC = () => {
  const [informacoes, setInformacoes] = useState<Informacoes>();

  const initialValues: Informacoes = {
    foto: "",
    nome: "",
    cargo: "",
    resumo: "",
  };

  const validationSchema = Yup.object().shape({
    foto: Yup.string().required("Campo obrigatório"),
    nome: Yup.string().required("Campo obrigatório"),
    cargo: Yup.string().required("Campo obrigatório"),
    resumo: Yup.string().required("Campo obrigatório"),
  });

  const fetchInformacao = async () => {
    try {
      const informacaoList = await getInformacoes();
      if (informacaoList && informacaoList.length > 0) {
        setInformacoes(informacaoList[0]); // Assumindo que você quer pegar a primeira informação
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 404) {
          console.error("Erro ao buscar informações:", error);
        }
      } else {
        console.error("Ocorreu um erro desconhecido ao buscar informações:", error);
      }
    }
  };

  useEffect(() => {
    fetchInformacao();
  }, []);

  const onSubmit = async (values: Informacoes) => {
    try {
      await createOrUpdateInformacoes(values);
      setInformacoes(values);
      alert("Formulário enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Ocorreu um erro ao enviar o formulário. Tente novamente.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteInformacoes();
      setInformacoes(undefined);
      alert("Informações deletadas com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar informações:", error);
      alert("Ocorreu um erro ao deletar as informações. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <Form
        initialValues={informacoes || initialValues}
        enableReinitialization={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <>
            <Title>Informações</Title>
            <Input
              label="Foto"
              name="foto"
              errors={errors.foto}
              touched={touched.foto}
            />
            <Input
              label="Nome"
              name="nome"
              errors={errors.nome}
              touched={touched.nome}
            />
            <Input
              label="Cargo"
              name="cargo"
              errors={errors.cargo}
              touched={touched.cargo}
            />
            <Textarea
              label="Resumo"
              name="resumo"
              errors={errors.resumo}
              touched={touched.resumo}
            />
            <Button type="submit">Salvar</Button>
          </>
        )}
      </Form>
      {informacoes && (
        <div className={styles.cardContainer}>
          <InformacoesCard informacoes={informacoes} />
          <Button onClick={handleDelete} red>
            Deletar
          </Button>
        </div>
      )}
    </div>
  );
};

export default CadastrarInformacoes;
