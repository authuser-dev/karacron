export const terms = `
## Termos e condições

**Última atualização: 2 de maio de 2026**

Leia estes Termos e condições com atenção antes de usar o Kara. Ao aceder ou usar a aplicação, concordas em ficar vinculado por estes termos. Se não concordares com alguma parte, não deves usar o serviço.

## 1. Aceitação dos termos

Ao instalar, aceder ou usar o Kara ("a Aplicação", "o Serviço"), confirmas que tens pelo menos 16 anos, que leste e compreendeste estes Termos e que aceitas ficar legalmente vinculado por eles. Se utilizares o Kara em nome de uma organização, declares ter autoridade para vincular essa organização.

## 2. Descrição do serviço

O Kara é um **assistente de IA local-first** que funciona principalmente no teu dispositivo. As tuas conversas, o contexto aprendido e a tua configuração são armazenados localmente. O Kara pode ligar-se opcionalmente a fornecedores de IA de terceiros (como a Anthropic ou a OpenAI) apenas quando configurares explicitamente uma chave API para esses serviços.

## 3. Licença e uso permitido

Sujeito a estes Termos, concedemos-te uma licença limitada, não exclusiva, não transferível e revogável para usar o Kara para fins pessoais ou empresariais internos.

Concordas em **não**:

- Aplicar engenharia reversa, descompilar ou desmontar qualquer parte da Aplicação
- Usar o Serviço para qualquer fim ilegal, fraudulento ou malicioso
- Tentar obter acesso não autorizado a qualquer sistema ou rede
- Redistribuir, sublicenciar ou vender a Aplicação sem autorização escrita expressa
- Usar ferramentas automatizadas para extrair dados do Serviço

## 4. Contas de utilizador e segurança

És o único responsável pela confidencialidade das tuas credenciais e por toda a atividade efetuada na tua conta. Deves notificar-nos imediatamente sobre qualquer violação de segurança ou uso não autorizado.

O Kara armazena credenciais sensíveis (chaves API, tokens) exclusivamente no porta-chaves nativo do teu sistema operativo (macOS Keychain, Linux Secret Service, Windows Credential Manager). Nunca armazenamos segredos em texto simples.

## 5. Fornecedores de IA de terceiros

Quando configuras um fornecedor de IA cloud (Anthropic, OpenAI, Google, etc.), as tuas mensagens e contexto relevante são transmitidos a esse fornecedor para gerar respostas. Esta transmissão está sujeita à **política de privacidade e termos do fornecedor em causa**, não aos do Kara.

Reconheces que o Kara não é responsável pelas práticas de dados dos fornecedores de IA de terceiros. Se preferires que nenhum dado saia do teu dispositivo, podes configurar o Kara para usar exclusivamente um modelo de IA local.

## 6. Propriedade intelectual

Todos os direitos, títulos e interesses no Serviço (excluindo conteúdo gerado pelo utilizador) são e permanecerão propriedade exclusiva do Kara e dos seus licenciantes. Nada nestes Termos te concede o direito de usar qualquer marca registada, logótipo ou nome comercial.

## 7. Exclusão de garantias

O Serviço é fornecido **"tal como está"** e **"conforme disponibilidade"**, sem garantias de qualquer tipo, expressas ou implícitas, incluindo garantias implícitas de comercialização, adequação a um fim específico ou não infração.

Não garantimos que o Serviço será ininterrupto, sem erros ou livre de componentes prejudiciais.

## 8. Limitação de responsabilidade

Na máxima extensão permitida pela lei aplicável, o Kara e os seus afiliados não serão responsáveis por danos indiretos, incidentais, especiais, consequentes ou punitivos decorrentes do uso ou da impossibilidade de usar o Serviço.

Em caso algum a nossa responsabilidade total para contigo excederá o montante pago pelo Serviço nos doze (12) meses anteriores à reclamação.

## 9. Rescisão

Reservamo-nos o direito de suspender ou encerrar o teu acesso ao Serviço a qualquer momento, com ou sem aviso prévio, para comportamentos que consideremos violar estes Termos ou ser prejudiciais.

Após a rescisão, a licença concedida expirará automaticamente. As disposições que por natureza devam sobreviver à rescisão continuarão a aplicar-se.

## 10. Lei aplicável

Estes Termos são regidos e interpretados de acordo com a lei aplicável. Qualquer litígio será resolvido de boa fé antes de recorrer a processos judiciais formais.

## 11. Alterações aos termos

Podemos rever estes Termos a qualquer momento publicando uma versão atualizada na Aplicação. As alterações materiais serão notificadas através de notificação in-app. O uso continuado do Serviço após a entrada em vigor das alterações constitui aceitação dos Termos revistos.

## 12. Contacto

Para questões sobre estes Termos, contacta-nos através dos canais de suporte oficiais do Kara.
`;

export const privacy = `
## Política de utilização de dados

**Última atualização: 2 de maio de 2026**

A tua privacidade é um princípio fundamental do Kara, não uma funcionalidade secundária. O Kara é construído **local-first**: os teus dados residem no teu dispositivo por defeito. Esta política explica exatamente que dados gerimos, como e porquê.

## 1. O nosso princípio fundamental

O Kara opera segundo um modelo estritamente **opt-in**. Nada é partilhado com serviços externos sem a tua autorização explícita e prévia. Recolhemos o mínimo de dados necessários para operar o Serviço.

## 2. Dados armazenados localmente no teu dispositivo

Os seguintes dados são armazenados **exclusivamente no teu dispositivo** e nunca são transmitidos para os servidores do Kara:

- **Histórico de conversas** — todas as mensagens e contexto, numa base de dados SQLite local
- **Memória e factos aprendidos** — informações contextuais que o assistente aprende sobre ti
- **Configuração do utilizador** — preferências, definições e estado da aplicação
- **Chaves API e tokens** — armazenados no porta-chaves nativo do sistema operativo (encriptado)
- **Modelos de IA locais** — binários descarregados para o teu armazenamento local
- **Skills e plugins** — instalados localmente sob o teu controlo

## 3. Dados que podem sair do teu dispositivo

O Kara só pode transmitir dados para fora do teu dispositivo nos seguintes cenários explicitamente opt-in:

**3.1 Pedidos a fornecedores de IA cloud**

Se configurares um fornecedor de IA cloud (Anthropic, OpenAI, Google, etc.), o conteúdo das tuas mensagens e uma janela de contexto mínima serão enviados a esse fornecedor para gerar respostas. Estes dados estão sujeitos à **política de privacidade do fornecedor em questão**.

**3.2 Integrações de skills com serviços externos**

Se instalares uma skill que se liga a um serviço externo (ex. Telegram, GitHub, Notion), apenas os dados estritamente necessários para a função dessa skill serão transmitidos. Deves instalar e configurar cada skill explicitamente.

**3.3 Verificações anónimas de atualizações**

Se ativado (desativado por defeito), o Kara pode contactar servidores de atualização. O pedido contém apenas a tua versão do Kara e plataforma. Nenhum dado pessoal ou conversa é incluído.

## 4. Dados que não recolhemos

O Kara **não recolhe nem transmite**:

- O teu histórico completo de conversas para os nossos servidores
- Ficheiros ou código com que interages
- A tua localização
- Análises comportamentais ou telemetria de uso (exceto opt-in explícito)
- Dados para fins publicitários

## 5. Segurança

Aplicamos as melhores práticas de segurança da indústria:

- **Os segredos (chaves API, tokens)** são armazenados exclusivamente no porta-chaves nativo do sistema — nunca em texto simples
- **A base de dados local** é acessível apenas pelo processo daemon do Kara (permissões de ficheiro 600)
- **A comunicação de rede** com o daemon local ocorre apenas via loopback (localhost)
- **A encriptação em repouso** para configuração sensível está disponível como definição opt-in

## 6. Retenção e eliminação de dados

Os dados locais são conservados indefinidamente, a menos que optes por eliminá-los. Tens controlo total:

- Eliminar sessões individuais nas definições da conta
- Eliminar todos os dados locais a qualquer momento
- Exportar os teus dados antes da eliminação

Os dados transmitidos a fornecedores de IA de terceiros estão sujeitos às **suas** políticas de retenção.

## 7. Os teus direitos

Dependendo da tua jurisdição, podes ter direitos de acesso, retificação, eliminação e portabilidade. Como a maioria dos dados é armazenada localmente, podes exercer estes direitos diretamente na aplicação a qualquer momento.

## 8. Alterações a esta política

Em caso de alterações materiais, notificar-te-emos através de notificação in-app antes de entrarem em vigor. O uso continuado constitui aceitação.

## 9. Contacto

Para questões relacionadas com a privacidade, contacta-nos através dos canais de suporte oficiais do Kara.
`;
