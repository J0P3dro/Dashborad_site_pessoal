import React, { useEffect, useState } from "react";
import styles from './ListaExperiencia.module.css';
import Table from "../../../components/common/Table";
import { Column } from "../../../components/common/Table/Table"; 
import { useNavigate } from "react-router-dom";
import { Experiencia, deleteExperiencia, getExperiencia } from "../../../services/experienciaService";

const ListaExperiencia: React.FC = () => {
    const navigate = useNavigate();
    const [experiencias, setExperiencias] = useState<Experiencia[]>([]);

    const fetchExperiencias = async () => {
        try {
            const experiencias = await getExperiencia();
            setExperiencias(experiencias);
        } catch (error) {
            console.error('Ocorreu um erro ao buscar as experiências', error);
            alert('Ocorreu um erro ao buscar as experiências. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchExperiencias();
    }, []);

    const handleDelete = async (experiencia: Experiencia) => {
        try {
            await deleteExperiencia(experiencia.id);
            alert('Experiência deletada com sucesso!');
            fetchExperiencias(); 
        } catch (error) {
            console.error('Ocorreu um erro ao deletar a experiência', error);
            alert('Ocorreu um erro ao deletar a experiência. Tente novamente mais tarde.');
        }
    };

    const handleEdit = (experiencia: Experiencia) => {
        navigate("/curriculo/experiencia/cadastro", { state: { experiencia } });
    };
    
    const columns: Column<Experiencia>[] = [
        { header: "Titulo", accessor: "titulo" },
        { header: "Descrição", accessor: "descricao" },
        { header: "Tipo", accessor: "tipo" },
        { header: "Ano de Início", accessor: "anoInicio" },
        { header: "Ano de Fim", accessor: "anoFim" },
    ];

    return (
        <Table 
            columns={columns}
            data={experiencias}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    );
};

export default ListaExperiencia;
