import { expect } from '@playwright/test';

export class MoviesPage {
    constructor(page) {
        this.page = page;
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle'); // esperar toda requisição da página ser carregada
        await expect(this.page).toHaveURL(/.*admin/);
    }

    async create(title, overview, company, release_year) {
        await this.page.locator('a[href$="register"]').click();

        await this.page.locator('#title').fill(title); //Pega o elemento pelo ID
        await this.page.getByLabel('Sinopse').fill(overview); //Pega o elemento pela label

        //Select
        await this.page.locator('#select_company_id .react-select__indicator').click();
        // const html = await this.page.content();
        // console.log(html);

        await this.page.locator('.react-select__option').filter({ hasText: company }).click();

        //Select
        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: release_year }).click();

        await this.page.getByRole('Button', { name: 'Cadastrar' }).click();
    }
}