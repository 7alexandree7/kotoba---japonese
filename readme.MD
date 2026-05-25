# `Libs Back End`

- 1 nodemon
- 2 bcryptjs
- 3 cookie-parser
- 4 crypto
- 5 dotenv
- 6 express
- 7 resend
- 8 jsonwebtoken
- 9 mongodb
- 10 mongoose

-------------------------------------------------------------------------------------------------

# `Libs Front End`

- 1 Axios
- 2 TailwindCSS
- 3 ShadcnUI

-------------------------------------------------------------------------------------------------

# `Resumo Inicial Back-End`

- 1  Instalar as dependencias
- 2  Iniciar o servidor no index.js com uma função assíncrona
- 3  Criar uma pasta db/connectDB.js para realizar a conexão com o mongoose e importar dentro da função assíncrona no index.js
- 4  Inicializar as rotas seguindo um padrão específico
  - Criar a pasta routes
  - Criar uma pasta para agrupar as rotas daquele módulo
  - Utilizar nomenclatura ex: auth.routes.js
  - Criar um index.js dentro de routes responsável por importar todas as rotas e definir um endpoint base
  - Importar todas as rotas agrupadas no index.js principal do projeto
- 5  Controllers são responsáveis pelas funções de cada rota
  - Criar a pasta controllers
  - Criar um arquivo para cada controller seguindo a nomenclatura ex: auth.controller.js
  - Importar as funções nas rotas
- 6  Models são responsáveis por definir a estrutura e regras dos dados no banco utilizando mongoose.Schema
  - Criar a pasta models
  - Criar um arquivo para cada model seguindo a nomenclatura ex: user.model.js
  - Definir campos, tipos, validações e valores padrões do schema
  - Exportar o model para ser utilizado nas controllers e services
  
-------------------------------------------------------------------------------------------------


# `Preparativos importantes para a criação de um usuario`

- 1  Receber as informações que vem do body da requisição
- 2  Fazer a validação dos dados
- 3  Conferir se esse usuario que esta tentando se cadastrar ja possui um email ativo = (usuario existente)
- 4  Criptografar a senha do usuario para não salvar ela de forma crua no banco de dados da aplicação / sempre quando for criar o user passar a senha com o hash
- 5  Com todas as informações em mãos criar um novo usuario no nosso banco de dados
- 6  `verificationToken` O back end gera um codigo de 6 digitos para o usuario fazer sua auth no seu email
- 7  utilizar o `await user.save()` para que todas nossas alterações sejam salvas no nosso banco MondoDB

-------------------------------------------------------------------------------------------------


# `JWT & COOKIES`

- 1  Criar no .env um JWT_SECRET
- 2  Dentro de utils criar uma função `generatetokenAndSetCookie`
- 3  Utilizar o método signin, passando o userId, o JWT_SECRETS e o expires_in
- 4  na resposta do back-end pro font ele vai salvar nos cookies do navegador uma chave chamada "token" com o valor token
- 5  Utilizando esses parametros para aumentar a segurança
```` 
    httpOnly: true,
    secure: ENV_VARIABLES.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
````

-------------------------------------------------------------------------------------------------


# `Envio de Emails`

- 1 Lib Resend
  - Resend emails: Plataforma de Entrega de Emails.
  - Criar uma pasta mail
    - email.js - `Responsável por enviar os emails utilizando o resend.`
    - emailTemplate.js - `Armazena os templates HTML dos emails da aplicação (verificação, reset de senha, etc).`
    - resend.config.js - `Configura a conexão com o resend e define o remetente padrão dos emails.`
- 2 Importa o código base gerado pela documentação do site
- No arqui email.js

-------------------------------------------------------------------------------------------------

# `Verify Email`

- 1 - Criar uma rota post verify-email
- 2 - Criar um controller para a rota `verifyEmail`
- 3 - Recebe o code de 6 digitos digitados pelo usuario no front
- 4 - Procura um usuário com esse código no banco.
- 5 - Verifica se o código ainda não expirou.
- 6 - Marca o email como verificado.
- 7 - Remove o código de verificação do banco
- 8 - Envia email de boas-vindas. Pela função `await sendWelcomeEmail(user.email, user.name)` passando o email e o name para o template
```
export const sendWelcomeEmail = async (email, name) => {

    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Welcome to our app!",
            html: `
                <h1>Welcome ${name}!</h1>
                <p>Thanks for joining Auth Company.</p>
            `,
        });
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw error;
    }
}
```

-------------------------------------------------------------------------------------------------

# `Forgot Password` 

- 1 - usuário digita o email
- 2 - backend procura o usuário
- 3 - backend gera um token aleatório
- 4 - salva esse token no banco
- 5 - salva uma data de expiração
- 6 - envia email com link contendo o token
- 7 - depois o usuário usa esse token pra criar nova senha `await sendResetPasswordEmail(user.email, ${ENV_VARIABLES.CLIENT_URL}/reset-password/${resetToken});`
```
export const sendResetPasswordEmail = async (email, resetURL) => {

    try {
        const response = await resend.emails.send({
            from: ENV_VARIABLES.RESEND_DOMAIN,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        })
    } catch (error) {
        console.error("Error sending reset password email:", error);
        throw error;
    }
}
```

- 8 - O Uuário é redireciano para a web na tela de redefinição de senha após clicar no link do email de esqueceu a senha
- 9 - A URL sera dinamica domain/reset-password/token `Token gerado pela lib crypto const resetToken = crypto.randomBytes(20).toString('hex');`

-------------------------------------------------------------------------------------------------

# `Reset Password`

- 1 - Criar rota dinamica com o token `router.post('/reset-password/:token', resetPassword)`
- 2 - Recebe o token do params da url
- 3 - Recebe a nova senha do body
- 4 - Encontra o usuario vinculado ao token que quer redefinir a senha / faz a verificação
- 5 - Faz o hash com o bcrypt na nova senha escolhida pelo usuario
- 6 - Atribui a nova senha ao banco `user.password = hashedPassword;` 
- 7 - faz o reset `user.resetPasswordToken = undefined;` - `user.resetPasswordExpiresAt = undefined;`
- 8 - Salva as alterações no banco `await user.save()`
- 9 - Chama a função do resend para enviar um email ao usuario informando sobre a redefinição de senha ` await sendResetSuccessEmail(user.email);`
- 10 - Devolve a resposta da requisição com try catch `res.status(200).json({ success: true, message: "Password reset successfully" });` ou erro

-------------------------------------------------------------------------------------------------

# `Verificar Se este usuario esta autenticado`

- 1 - Criar uma rota do tipo get ("check-auth)
- 2 - Passar um middleware de verifyToken
    - Receber o token da req
    - dentro do try verificar se o token existe
    - Criar uma variavel decoded para utlizar o `jwt.verify(token, JWT_SECRET)`
    - Veriicar se não veio o decoded
    - Adiciona `req.userId = decoded.userId;` a cada requisição que esse middleware for chamado / o JWT já identifica o usuário
- 3 - Passar o controller de checkAuth
    - verificar se o usuário autenticado ainda existe
    - Dentro do bloco try
    - busca usuário no MongoDB / pega o ID do token
    - Verificação
    - Resposta
    - Esse endpoint geralmente é usado para: persistência de autenticação / manter login

-------------------------------------------------------------------------------------------------