# Luiz & Kamila — primeira reconstrução com Capacitor

Este é um ponto de partida funcional, reconstruído a partir do conteúdo visível do site enviado.

## O que já está incluído
- Interface mobile-first com identidade romântica renovada.
- Navegação inferior entre Início, História, Cupons, Fotos e Ajustes.
- Contador de relacionamento configurável.
- Pergunta interativa e botão de resposta.
- Motivos de amor com troca de mensagem.
- Linha do tempo editável.
- Cupons resgatáveis.
- Galeria com URLs de fotos.
- Painel de personalização e backup JSON.
- Salvamento local no aparelho via localStorage.

## Requisitos
Node.js LTS instalado. Para gerar Android, Android Studio e SDK Android. Para iOS, macOS com Xcode.

## Executar no computador
```bash
npm install
npm run start
```

## Gerar os arquivos web
```bash
npm run build
```

## Adicionar Android
```bash
npx cap add android
npx cap sync android
npx cap open android
```

No Android Studio, aguarde o Gradle sincronizar e use Build > Build Bundle(s) / APK(s) > Build APK(s).

## Adicionar iOS (em um Mac)
```bash
npx cap add ios
npx cap sync ios
npx cap open ios
```

## Importante sobre sincronização
Esta primeira etapa salva as alterações localmente em cada aparelho. Para Luiz e Kamila verem exatamente os mesmos dados e fotos, a próxima etapa será conectar um backend compartilhado (por exemplo, Supabase) e configurar autenticação/regras de acesso. Não coloque chaves secretas no código público.


## Gerar APK pelo GitHub Actions

1. Envie todos os arquivos deste projeto para a branch `main` do repositório GitHub.
2. Abra a aba **Actions** do repositório.
3. Se aparecer uma confirmação para permitir workflows, confirme.
4. Aguarde o workflow **Gerar APK Android** terminar com sucesso.
5. Abra a execução concluída e baixe o artefato `para-minha-kamila-apk`.
6. Extraia o ZIP baixado no celular e instale `app-debug.apk`.

O APK de depuração é adequado para instalação direta e testes. Para publicar na Play Store, será necessária uma versão release assinada.
