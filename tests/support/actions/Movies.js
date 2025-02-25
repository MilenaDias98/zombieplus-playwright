import { expect } from '@playwright/test';

export class Movies {
    constructor(page) {
        this.page = page;
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click();
    }
    async submit() {
        await this.page.getByRole('Button', { name: 'Cadastrar' }).click();
    }

    async create(movie) {
        await this.goForm();

        await this.page.locator('#title').fill(movie.title); //Pega o elemento pelo ID
        await this.page.getByLabel('Sinopse').fill(movie.overview); //Pega o elemento pela label

        //Select
        await this.page.locator('#select_company_id .react-select__indicator').click();
        // const html = await this.page.content();
        // console.log(html);

        await this.page.locator('.react-select__option').filter({ hasText: movie.company }).click();

        //Select
        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: movie.release_year }).click();

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + movie.cover);

        if (movie.featured) {
            await this.page.locator('.featured .react-switch').click();
        }

        await this.submit();
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(target);

        await this.page.click('.actions button');
    }

    async tableHave(content) {
        //Validando resultado do campo search
        const rows = this.page.getByRole('row');
        await expect(rows).toContainText(content);
    }

    async alert(target) {
        //Validação
        await expect(this.page.locator('.alert')).toHaveText(target);
    }

    async remove(title) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click();
        await this.page.click('.confirm-removal');
    }
}