import api from "./api";

export interface Portifolio {
  id?: number;
  link: string;
  image: string;
  title: string;
}

export const createPortifolio = async (portifolio: Portifolio): Promise<Portifolio> => {
  const response = await api.post<Portifolio>("/portfolio", portifolio);
  return response.data;
};

export const getPortfolio = async (): Promise<Portifolio[]> => {
  const response = await api.get<Portifolio[]>(`/portfolio$`);
  return response.data;
};

export const deletePortifolio = async (id: number | undefined): Promise<Portifolio> => {
  const response = await api.delete<Portifolio>(`/portfolio/${id}`);
  return response.data;
};

export const updatePortifolio = async (portifolio: Portifolio): Promise<Portifolio> => {
  const response = await api.put<Portifolio>(`/portfolio/${portifolio.id}`, portifolio);
  return response.data;
};

export const getPortifolio = async (id: number): Promise<Portifolio> => {
  const response = await api.get<Portifolio>(`/portfolio/${id}`);
  return response.data;
};

export const createOrUpdatePortifolio = async (portifolio: Portifolio): Promise<Portifolio> => {
  if (!portifolio.id) {
    return await createPortifolio(portifolio);
  } else {
    return await updatePortifolio(portifolio);
  }
};
