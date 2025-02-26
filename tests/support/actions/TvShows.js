import { expect } from '@playwright/test';

export class TvShows {
    constructor(page) {
        this.page = page;
    }

    async goSeriesTV() {
        await this.page.locator('a[href$="tvshows"]').click();
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click();
    }

    async submit() {
        await this.page.getByRole('Button', { name: 'Cadastrar' }).click();
    }

    async create(tvShow) {
        await this.goSeriesTV();
        await this.goForm();

        await this.page.locator('#title').fill(tvShow.title);
        await this.page.getByLabel('Sinopse').fill(tvShow.overview);

        await this.page.locator('#select_company_id .react-select__indicator').click();

        await this.page.locator('.react-select__option').filter({ hasText: tvShow.company }).click();

        await this.page.locator('#select_year .react-select__indicator').click();
        await this.page.locator('.react-select__option').filter({ hasText: tvShow.release_year }).click();

        await this.page.getByLabel('Temporadas').fill(`${tvShow.season}`);

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + tvShow.cover);

        if (tvShow.featured) {
            await this.page.locator('.featured .react-switch').click();
        }

        await this.submit();
    }

    async alert(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }

    async remove(title) {
        await this.goSeriesTV();
        await this.page.getByRole('row', { name: title }).getByRole('button').click();
        await this.page.click('.confirm-removal');
    }
}