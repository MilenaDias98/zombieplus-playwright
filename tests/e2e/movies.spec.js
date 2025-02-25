const { test, expect } = require('../support');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');
const { ro } = require('@faker-js/faker');

test.beforeAll(async () => {
    await executeSQL(`DELETE from movies`);
})

test('deve poder cadastrar um novo filme', async ({ page }) => {
    //É importante estar logado
    const movie = data.create; // Dados do JSON

    //Login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.create(movie);
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`);
});

test('deve poder remover um fimel', async ({ page, request }) => {
    const movie = data.to_remove; //dados do arquivo JSON

    await request.api.postMovie(movie); //cadastro do filme via API

    //Login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.remove(movie.title);
    await page.popup.haveText('Filme removido com sucesso.');
});

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    const movie = data.duplicate; // Dados do JSON

    // const response = await request.post('http://localhost:3333/sessions', {
    //     data: {
    //         email: 'admin@zombieplus.com',
    //         password: 'pwd123'
    //     }
    // });

    //Verifica se status 200 é verdadeiro
    // expect(response.ok()).toBeTruthy(); 

    //Converte o corpo da resposta em JSON
    // const body = JSON.parse(await response.text());
    //Apresentação do corpo da resposta(status)
    // console.log(body.token); 

    await request.api.postMovie(movie);

    //Login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.create(movie);
    await page.popup.haveText(
        `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
    );
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    //Login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.alert([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ]);
});

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const movies = data.search;

    movies.data.forEach(async (m) => { //m = Um filme por vez
        // console.log(m.title);
        await request.api.postMovie(m)
    })

    //Login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.search(movies.input); //busca pelo termo zumbi no campo search

    await page.movies.tableHave(movies.outputs);
});