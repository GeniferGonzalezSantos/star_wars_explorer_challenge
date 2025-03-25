// Este arquivo define os tipos para os componentes

// Interface para as props de um Card
export interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
    onClick?: () => void; // Propriedade opcional para um evento de clique
}

// Tipo para representar um item de dados
export type DataItem = {
    id: number;
    name: string;
    details: string;
    
};