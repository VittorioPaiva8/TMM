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

## 4. Publicar pelo computador (5 min)

No terminal (PowerShell), dentro da pasta do repositório:

```powershell
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy
```

- No `firebase use --add`, escolha o projeto criado no passo 1 e digite `default` como apelido.
- No fim do `firebase deploy` aparece o link do app, no formato `https://treino-vittorio.web.app`.

## 5. Instalar no celular

Abra o link no celular e entre com o Google.
- **Android (Chrome):** aparece a faixa "Instale o app"; toque em **Instalar**. Se não aparecer: menu ⋮ › **Instalar app**.
- **iPhone (Safari):** botão **Compartilhar** › **Adicionar à Tela de Início**.

## Atualizar depois

Troque os arquivos em `public/` e rode `firebase deploy` de novo. O app no celular pega a versão nova na próxima vez que abrir com internet.

## O que fica onde

- `public/index.html`: o app inteiro (tela, bonequinho, cronômetro, login e banco)
- `public/sw.js`: deixa o app abrir sem internet
- `public/manifest.webmanifest` e `public/icons/`: nome e ícone na tela inicial
- `firestore.rules`: cada conta só lê e grava os próprios treinos
- `firebase.json`: configuração da publicação
