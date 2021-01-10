## Lab Imob

[![Actions Status](https://github.com/tiagodevweb/lab-imob/workflows/CI/badge.svg)](https://github.com/tiagodevweb/lab-imob/actions)


#### Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Install

```bash
$ docker-compose up -d --build
```
#### Monitor installation process
```bash
$ docker-compose logs app
```

#### Fake data
```bash
$ docker-compose exec app php artisan db:seed
```

#### Optional in .env
It is necessary to go up the containers again after changing the variables above.
```php
# Docker variables
DC_APP_NAME=app
DC_WEB_NAME=web
DC_DB_NAME=db
DC_DB_TEST_NAME=dbtest
DC_REDIS_NAME=redis
DC_WEB_PORT=80
DC_DB_PORT=3306
```

### Tests Backend

```bash
$ docker-compose exec app vendor/bin/phpunit --testdox
```

### Tests Frontend

```bash
$ docker-compose exec app npm test -- --verbose
```

### Desafio:

#### ~~Funcionalidade 1: CONCLUÍDA~~
  - Permitir o cadastro de um imóvel com algumas características. 
  - o cadastro de um imóvel deve possuir:
  - e-mail do proprietário, rua, número, complemento, bairro, cidade, estado;

Para que o cadastro ocorra deverá haver validações em dois níveis. Frontend e backend:
- 1 - e-mail, rua, bairro, cidade e estado são campos obrigatórios;
- 2 - e-mail deverá ser validado;

#### ~~Funcionalidade 2: CONCLUÍDA~~
  - Contexto: Permitir visualização dos imóveis cadastrados.
    Os dados de imóveis deverão ser carregados via request assíncrona. Esses dados deverão ser exibidos numa tabela e ao menos uma das colunas serem ordenáveis.
    Dados que deverão ser exibidos na tabela:
  - E-mail do proprietário;
  - Rua, número, cidade, estado (separados por vírgula);
  - Status (Contratado / Não contratado)
  - Coluna para ações (remover).

#### ~~Funcionalidade 3: CONCLUÍDA~~
  - Contexto: permitir a remoção de uma propriedade via chamada assíncrona com atualização posterior da lista de propriedades.
  - Observação: a remoção de uma propriedade deverá ser virtual.

#### ~~Funcionalidade 4: CONCLUÍDA~~
  - Contexto: Criação de um contrato que permita associação com uma propriedade. Um contrato possui os seguintes campos:
  - Propriedade (deverá ser selecionável a propriedade. Sendo usado como informação da propriedade a rua, número, complemento, bairro);
  - Tipo de pessoa (Pessoa física ou Pessoa Jurídica);
  - Documento (A máscara do campo de documento deverá alterar de acordo com o tipo de pessoa. Pessoa física deverá ser máscara de CPF e pessoa jurídica deverá ser máscara de CNPJ)
  - E-mail do contratante;
  - Nome completo do contratante;

#### ~~Regras específicas sobre a criação de contrato: CONCLUÍDO~~
- Uma propriedade não pode estar associada a dois contratos;
- Todos os campos do contrato são obrigatórios;
- Deverá ocorrer validação do documento;
- Deverá ocorrer validação do e-mail;