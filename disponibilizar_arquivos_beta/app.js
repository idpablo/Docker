const express = require('express');
const logger = require('./util/logger');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon')

const app = express();
const diretorioArquivos = 'arquivos_build/';

const versionData = fs.readFileSync('versao.json');
const { versao } = JSON.parse(versionData);

app.use(express.static(path.join(__dirname, 'resource')))
app.use(favicon(path.join(__dirname, 'resource', 'favicon.ico')))

function listarArquivos(diretorio) {
    const arquivos = fs.readdirSync(diretorio);
    const lista = [];

    arquivos.forEach(arquivo => {
        const caminhoCompleto = path.join(diretorio, arquivo);
        const ehDiretorio = fs.lstatSync(caminhoCompleto).isDirectory();

        lista.push({ nome: arquivo, caminho: caminhoCompleto, ehDiretorio });
    });

    return lista;
}

function gerarLinks(lista) {
    const linksHtml = lista.map(item => {
        if (item.ehDiretorio) {
            return `<li class="diretorio"><a href="${item.nome}/">${item.nome}/</a></li>`;
        } else {
            return `<li class="arquivo"><a href="/download/${encodeURIComponent(item.caminho)}" download>${item.nome}</a></li>`;
        }
    });

    return linksHtml.join('\n');
}

app.get('/download/:caminho', (req, res) => {
    const caminhoArquivo = decodeURIComponent(req.params.caminho);
    res.download(caminhoArquivo);
});

app.get('/*', (req, res) => {
    const caminhoAtual = path.join(diretorioArquivos, req.params[0]);
    const listaArquivos = listarArquivos(caminhoAtual);
    const linksHtml = gerarLinks(listaArquivos, req.params[0]); 

    const html = `
    <!DOCTYPE html>
        <html>
        <head>
            <title>Página de Arquivos</title>
            <link rel="stylesheet" type="text/css" href="/css/styles.css">
            <script src="/js/util/util.js"></script>
        </head>
        <body>
            <header id="cabecalho">
                <a class="logo-icon" href="http://localhost:9200/"></a>
                <h2>Arquivos disponíveis em ${req.params[0]}</h2>
            </header>
            <div id="conteudo">
                <div id="menu">
                </div>
                <div id="arquivos">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Links</th>
                            </tr>
                        </thead>
                        <div>
                            <tr>
                                <td>${linksHtml}</td>
                            </tr>
                        <div>
                    </table>
                </div>
            </div>
            <div id="rodape">
                <h3>Página desenvolvida com o intuito de facilitar o acesso aos arquivos gerados pelo bot Prodatinha.</h3>
                <h3 id="dataEHora">Prodata Gestão Estratégica - <span id="horaAtual"></span></h3>
                <h3>Versão: ${versao}</h3>
            </div>
        </body>
    </html>
    `;

    res.send(html);

});

const porta = 9200;
app.listen(porta, () => {
    logger.info(`Servidor rodando em http://localhost:${porta}`);
});
