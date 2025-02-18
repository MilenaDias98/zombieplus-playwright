const { test } = require('../support');

const data = require('../support/fixtures/movies.json');
const { executeSQL } = require('../support/database');

test('deve poder cadastrar um novo filme', async ({ page }) => {
    //É importante estar logado
    const movie = data.create;
    await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`);

    //Login
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year);

    await page.toast.containText('Cadastro realizado com sucesso!')
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