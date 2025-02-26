const { test, expect } = require('../support');

const data = require('../support/fixtures/tvshows.json');
const { executeSQL } = require('../support/database');

test.beforeAll(async () => {
    await executeSQL(`DELETE from tvshows`);
})

test('deve poder cadastrar um novo filme', async ({ page }) => {
    const tvShow = data.create;

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.tvShow.create(tvShow);
    await page.popup.haveText(`A série '${tvShow.title}' foi adicionada ao catálogo.`);
});

test('deve poder remover um fiLME', async ({ page, request }) => {
    const tvShow = data.to_remove;

    await request.api.postTvShow(tvShow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.tvShow.remove(tvShow.title);
    await page.popup.haveText('Série removida com sucesso.');
});

test('não deve cadastrar quando o título é duplicado', async ({ page, request }) => {
    const tvShow = data.duplicate;

    await request.api.postTvShow(tvShow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.tvShow.create(tvShow);
    await page.popup.haveText(
        `O título '${tvShow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
    );
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');

    await page.tvShow.goSeriesTV();
    await page.tvShow.goForm();
    await page.tvShow.submit();

    await page.tvShow.alert([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ]);
});