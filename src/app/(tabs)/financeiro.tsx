import { CalculatorIcon, CheckCircleIcon, WarningIcon } from '@/components/icons';
import { View } from 'react-native';

import { IconBubble } from '@/components/icon-bubble';
import { Dog } from '@/components/illustrations/dog';
import { Screen } from '@/components/screen';
import { Tag } from '@/components/tag';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { brl, cobrancasPendentes, pagamentosRecentes, resumoMes } from '@/data/mock';
import { useTheme } from '@/hooks/use-theme';

export default function FinanceiroScreen() {
  const { colors } = useTheme();
  const nomeDoMes = new Date().toLocaleDateString('pt-BR', { month: 'long' });
  const maiorServico = Math.max(...resumoMes.porServico.map((s) => s.valor));

  return (
    <Screen title="Financeiro" subtitle={`Resumo de ${nomeDoMes}`}>
      <Card className="flex-row items-end overflow-hidden rounded-3xl border-0 bg-mint-soft">
        <View className="flex-1 gap-1 pb-1">
          <Text className="font-nunito-extrabold text-xs tracking-wider text-mint">RECEBIDO NO MÊS</Text>
          <Heading size="3xl" className="font-heading font-normal">
            {brl(resumoMes.recebido)}
          </Heading>
          <Text className="text-muted-foreground">
            Falta receber <Text className="font-nunito-bold text-foreground">{brl(resumoMes.aReceber)}</Text>
          </Text>
        </View>
        <View className="-mb-4 -mr-2">
          <Dog size={96} coat="creme" />
        </View>
      </Card>

      <View className="flex-row gap-4">
        <Card className="flex-1 gap-2 rounded-3xl">
          <Text size="sm" className="font-nunito-bold text-muted-foreground">
            Ocupação média
          </Text>
          <Heading size="2xl" className="font-heading font-normal">
            {Math.round(resumoMes.ocupacaoMedia * 100)}%
          </Heading>
          <Progress value={resumoMes.ocupacaoMedia * 100} className="h-2 bg-muted">
            <ProgressFilledTrack className="rounded-full" />
          </Progress>
        </Card>
        <Card className="flex-1 gap-2 rounded-3xl">
          <Text size="sm" className="font-nunito-bold text-muted-foreground">
            Pendências
          </Text>
          <Heading size="2xl" className="font-heading font-normal">
            {cobrancasPendentes.length}
          </Heading>
          <Text size="sm" className="text-destructive">
            {cobrancasPendentes.filter((c) => c.atrasada).length} atrasada
          </Text>
        </Card>
      </View>

      <Button size="lg" variant="secondary" className="h-14 rounded-full bg-accent" onPress={() => {}}>
        <CalculatorIcon size={20} weight="duotone" color={colors.primary} />
        <ButtonText className="font-nunito-bold text-base text-primary">Calcular orçamento</ButtonText>
      </Button>

      <Card className="gap-3 rounded-3xl">
        <Heading size="md" className="font-nunito-bold font-normal">
          A receber
        </Heading>
        {cobrancasPendentes.map((cobranca) => (
          <View key={cobranca.id} className="flex-row items-center gap-3">
            <IconBubble icon={WarningIcon} tone={cobranca.atrasada ? 'danger' : 'sun'} size={36} />
            <View className="flex-1 gap-0.5">
              <Text className="font-nunito-bold">{cobranca.descricao}</Text>
              <Text size="sm" className="text-muted-foreground">
                {cobranca.tutor}
              </Text>
            </View>
            <View className="items-end gap-1">
              <Text className="font-nunito-bold">{brl(cobranca.valor)}</Text>
              <Tag label={cobranca.vencimento} tone={cobranca.atrasada ? 'danger' : 'neutral'} />
            </View>
          </View>
        ))}
      </Card>

      <Card className="gap-3 rounded-3xl">
        <Heading size="md" className="font-nunito-bold font-normal">
          Faturamento por serviço
        </Heading>
        {resumoMes.porServico.map((item) => (
          <View key={item.servico} className="gap-1.5">
            <View className="flex-row justify-between">
              <Text className="font-nunito-semibold">{item.servico}</Text>
              <Text className="font-nunito-bold">{brl(item.valor)}</Text>
            </View>
            <Progress value={(item.valor / maiorServico) * 100} className="h-2 bg-muted">
              <ProgressFilledTrack className="rounded-full bg-lilac" />
            </Progress>
          </View>
        ))}
      </Card>

      <Card className="gap-3 rounded-3xl">
        <Heading size="md" className="font-nunito-bold font-normal">
          Últimos pagamentos
        </Heading>
        {pagamentosRecentes.map((pagamento) => (
          <View key={pagamento.id} className="flex-row items-center gap-3">
            <IconBubble icon={CheckCircleIcon} tone="mint" size={36} />
            <View className="flex-1 gap-0.5">
              <Text className="font-nunito-bold">{pagamento.descricao}</Text>
              <Text size="sm" className="text-muted-foreground">
                {pagamento.tutor} · {pagamento.quando}
              </Text>
            </View>
            <View className="items-end gap-1">
              <Text className="font-nunito-bold text-mint">+ {brl(pagamento.valor)}</Text>
              <Tag label={pagamento.forma} tone="mint" />
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
