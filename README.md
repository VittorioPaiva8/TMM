# Caderno de Treino: como publicar no Firebase

O app usa Firebase Hosting (site), Authentication (login Google) e Firestore (banco). Tudo cabe no plano grátis (Spark), sem cartão.

## 1. Criar o projeto (5 min)

1. Abra https://console.firebase.google.com com a sua conta pessoal do Gmail.
2. **Adicionar projeto** › nome `treino-vittorio` (ou outro) › pode desligar o Google Analytics › **Criar**.
3. Na tela inicial do projeto, clique no ícone **`</>`** (Web) para registrar um app da Web:
   - Apelido: `Treino`
   - **Não** precisa marcar "Firebase Hosting" aqui.
   - Clique em **Registrar app** e depois em **Continuar no console**. Não precisa copiar a configuração: o Hosting entrega ela sozinho.

## 2. Ligar o login com Google (1 min)

**Criação › Authentication › Vamos começar › Google** › ative › escolha o seu e-mail de suporte › **Salvar**.

## 3. Criar o banco (1 min)

**Criação › Firestore Database › Criar banco de dados**:
- Local: **southamerica-east1 (São Paulo)**
- Modo: **produção** (as regras de segurança vão junto na publicação)

## 4. Publicação automática pelo GitHub (uma vez só, 10 min)

Cada mudança enviada para a branch `main` é publicada sozinha pelo GitHub Actions (aba **Actions** do repositório).

**4a. Criar a conta de serviço no Google Cloud**
1. Abra https://console.cloud.google.com/iam-admin/serviceaccounts com a mesma conta do Firebase e escolha o projeto no seletor lá em cima.
2. **+ Criar conta de serviço** › nome `github-deploy` › **Criar e continuar**.
3. Em **Papel**, adicione dois:
   - **Administrador do Firebase** (Firebase Admin)
   - **Consumidor do Service Usage** (Service Usage Consumer)
4. **Continuar** › **Concluído**.
5. Clique na conta `github-deploy` › aba **Chaves** › **Adicionar chave › Criar nova chave** › **JSON** › **Criar**. Baixa um arquivo `.json`.

**4b. Colocar no GitHub**
No repositório: **Settings › Secrets and variables › Actions**:
- Aba **Secrets** › **New repository secret**:
  - Name: `FIREBASE_SERVICE_ACCOUNT`
  - Secret: abra o `.json` no Bloco de Notas, copie **tudo** e cole aqui.
- Aba **Variables** › **New repository variable**:
  - Name: `FIREBASE_PROJECT_ID`
  - Value: o ID do projeto (aparece em Configurações do projeto no Firebase, tipo `treino-vittorio-1a2b3`).

Depois apague o `.json` do computador: ele dá acesso ao projeto.

**4c. Primeira publicação**
Aba **Actions** › **Publicar no Firebase** › **Run workflow**. Em 1 ou 2 minutos fica verde, e o link do app aparece no final do log: `https://SEU-ID.web.app`.

### Publicar pelo computador (alternativa)

```powershell
npm install -g firebase-tools
firebase login
firebase deploy --project SEU-ID
```

## 5. Instalar no celular

Abra o link no celular e entre com o Google.
- **Android (Chrome):** aparece a faixa "Instale o app"; toque em **Instalar**. Se não aparecer: menu ⋮ › **Instalar app**.
- **iPhone (Safari):** botão **Compartilhar** › **Adicionar à Tela de Início**.

## Atualizar depois

É só enviar a mudança para a branch `main`: o GitHub publica sozinho. O app no celular pega a versão nova na próxima vez que abrir com internet.

## O que fica onde

- `public/index.html`: o app inteiro (tela, bonequinho, cronômetro, login e banco)
- `public/sw.js`: deixa o app abrir sem internet
- `public/manifest.webmanifest` e `public/icons/`: nome e ícone na tela inicial
- `firestore.rules`: cada conta só lê e grava os próprios treinos
- `firebase.json`: configuração da publicação
- `.github/workflows/deploy.yml`: publicação automática pelo GitHub
