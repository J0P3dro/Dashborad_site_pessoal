import React from "react";
import * as Yup from "yup";
import styles from "./CadastrarPortifolio.module.css";
import { Formik, Form } from "formik";
import Input from "../../../components/forms/Input";
import {
  Portifolio,
  createOrUpdatePortifolio,
} from "../../../services/portifolioService";
import { useLocation, useNavigate } from "react-router-dom";
import Title from "../../../components/common/Title";
import Button from "../../../components/common/Button";

const CadastrarPortifolio: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation().state as Portifolio;

  const initialValues: Portifolio = location || {
    id: 0,
    titulo: "",
    link: "",
    imagem: "",
  };

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("*Campo Obrigatório*"),
    link: Yup.string().required("*Campo Obrigatório*"),
    imagem: Yup.string().required("*Campo Obrigatório*"),
  });

  const onSubmit = async (
    values: Portifolio,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await createOrUpdatePortifolio(values);
      alert("Formulário enviado com sucesso!");
      navigate("/portifolio/lista");
    } catch (error) {
      console.error("Ocorreu um erro ao enviar o formulário", error);
      alert(
        "Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde."
      );
    }
  };

  return (
    <div className={styles.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Title>
              {location ? "Atualizar Portifolio" : "Cadastrar Portifolio"}
            </Title>
            <Input
              label="Título"
              name="titulo"
              errors={errors.title}
              touched={touched.title}
            />
            <Input
              label="Link"
              name="link"
              errors={errors.link}
              touched={touched.link}
            />
            <Input
              label="Imagem"
              name="imagem"
              errors={errors.image}
              touched={touched.image}
            />
            <Button type="submit">Salvar</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CadastrarPortifolio;
