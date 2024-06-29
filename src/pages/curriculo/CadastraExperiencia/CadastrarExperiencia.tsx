import React, { useEffect } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';

import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input/Input";
import Textarea from "../../../components/forms/Textarea";
import Title from "../../../components/common/Title/Title";
import styles from './CadastrarExperiencia.module.css';
import { Experiencia, createOrUpdateExperiencia, deleteExperiencia } from "../../../services/experienciaService";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "../../../components/forms/Select";
import Button from "../../../components/common/Button";

const CadastrarExperiencia: React.FC = () => {
    const navigate = useNavigate();
    const experiencia = useLocation().state as Experiencia;

    const initialValues: Experiencia = {
        titulo: '',
        descricao: '',
        tipo: '',
        anoInicio: '',
        anoFim: '',
        id: 0
    };

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required('*Campo Obrigatório*'),
        descricao: Yup.string(),
        tipo: Yup.string().required('*Campo Obrigatório*'),
        anoInicio: Yup.string().required('*Campo Obrigatório*').typeError("Um número é obrigatório"),
        anoFim: Yup.string().required('*Campo Obrigatório*').typeError("Um número é obrigatório"),
    });

    const onSubmit = async (values: Experiencia, { resetForm }: { resetForm: () => void }) => {
        try {
            await createOrUpdateExperiencia(values);
            alert('Formulário enviado com sucesso!');
            navigate("/curriculo/experiencia/lista");
        } catch (error) {
            console.error('Ocorreu um erro ao enviar o formulário', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.');
        }
    };

    return (
        
            <Form
                initialValues={initialValues || experiencia}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched }) => (
                    <>
                        {
                            !experiencia ? 
                            <Title>Cadastrar Experiencia</Title>
                            :
                            <Title>Editar Experiencia</Title>
                        }

                        <Input 
                            label="Título"
                            name="titulo"
                            type="text"
                            errors={errors.titulo}
                            touched={touched.titulo}
                        />

                        <Input 
                            label="Ano de Início"
                            name="anoInicio"
                            type="number"
                            errors={errors.anoInicio}
                            touched={touched.anoInicio}
                        />

                        <Input 
                            label="Ano de Fim"
                            name="anoFim"
                            type="number"
                            errors={errors.anoFim}
                            touched={touched.anoFim}
                        />

                        <Select
                        label="Tipo de experiência"
                        name="tipo"
                        options={[
                            { value: 'Academico', label: 'Academico' },
                            { value: 'Profissional', label: 'Profissional' },
                        ]}
                        errors={errors.tipo}
                        touched={touched.tipo}
                        />

                        <Textarea 
                            label="Descrição"
                            name="descricao"
                            errors={errors.descricao}
                            touched={touched.descricao}
                        />

                        <Button type="submit">Cadastrar</Button>
                    </>
                )}
            </Form>

    );
};

export default CadastrarExperiencia;


