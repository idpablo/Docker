Container Criado e Mantido por: Pablo Soares.

Glossário{
    - Instrução
    # Execute user Root ou Admin
    $ Execute com user default
}

Para edição das credenciais edite o arquivo .env

Instruções para execução da instância PostgreSQL de Desenvolvimento:

Requerimentos:

    - Docker rodando.
    - 2 minutos livres.

Pelo seu terminal favorito navegue ate a pasta descompactada "pgsql":

    # cd /imagine/um/caminho/pgsql

Execute o comando docker:

    # docker compose up -d

Para realizar o Restore use a seguinte estrutura:

cat your_dump.sql | docker exec -i pgsql psql -h localhost -p 5432 -U postgres -d sch