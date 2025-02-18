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

    async create(title, overview, company, release_year) {
        await this.goForm();

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

        await this.submit();
    }

    async alert(target) {
        //Validação
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}