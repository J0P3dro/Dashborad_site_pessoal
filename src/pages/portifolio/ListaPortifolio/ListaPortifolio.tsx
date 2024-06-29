import React, { useEffect, useState } from "react";
import styles from './ListaPortifolio.module.css';
import { Portifolio, getPortfolio, deletePortifolio } from "../../../services/portifolioService";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/common/Table";
import { Column } from "../../../components/common/Table/Table";

const ListaPortifolio: React.FC = () => {
    const navigate = useNavigate();
    const [portifolios, setPortifolios] = useState<Portifolio[]>([]);

    const fetchPortifolios = async () => {
        try {
            const portifolio = await getPortfolio();
            setPortifolios(portifolios);
        } catch (error) {
            console.error('Ocorreu um erro ao buscar os portfólios', error);
            alert('Ocorreu um erro ao buscar os portfólios. Tente novamente mais tarde.');
        }
    };

    useEffect(() => {
        fetchPortifolios();
    }, []);

    const handleEdit = (portifolio: Portifolio) => {
        navigate("/portifolio/cadastro", { state: { portifolio } });
    };

    const handleDelete = async (portifolio: Portifolio) => {
        try {
            await deletePortifolio(portifolio.id);
            alert('Portfólio deletado com sucesso!');
            fetchPortifolios(); 
        } catch (error) {
            console.error('Ocorreu um erro ao deletar o portfólio', error);
            alert('Ocorreu um erro ao deletar o portfólio. Tente novamente mais tarde.');
        }
    };
    const columns: Column<Portifolio>[] = [
        { header: "Título", accessor: "title"},
        { header: "Imagem", accessor: "image"},
        { header: "Link", accessor: "link"},
    ];

    return (
        <Table
        columns={columns}
        data={portifolios}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        />
    )
}

export default ListaPortifolio;
