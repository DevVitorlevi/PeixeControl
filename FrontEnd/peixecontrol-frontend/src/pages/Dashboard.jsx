import { DashboardContainer, Card, Title, Value } from "../styles/Dashboard";
import Layout from "../Layouts/Layouts";

export default function Dashboard() {
    return (
        <Layout>
            <div>
                <DashboardContainer>
                    <Card>
                        <Title>Total em Estoque</Title>
                        <Value>150 kg</Value>
                    </Card>
                    <Card>
                        <Title>Vendas do Dia</Title>
                        <Value>R$ 1.200,00</Value>
                    </Card>
                    <Card>
                        <Title>Produtos com Estoque Baixo</Title>
                        <Value>3</Value>
                    </Card>
                </DashboardContainer>
            </div>
        </Layout>
    );
}
