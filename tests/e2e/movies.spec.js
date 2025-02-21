const { test, expect } = require('../support');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');

test.beforeAll(async () => {
    await executeSQL(`DELETE from movies`);
})

test('deve poder cadastrar um novo filme', async ({ page }) => {
    //É importante estar logado
    const movie = data.create; // Dados do JSON

    //Login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.create(movie);
    await page.toast.containText('Cadastro realizado com sucesso!');
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
    await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo');
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    //Login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.goForm();
    await page.movies.submit();

    await page.movies.alert([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ]);
});