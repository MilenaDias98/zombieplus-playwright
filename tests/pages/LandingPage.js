import { expect } from '@playwright/test';

export class LandingPage {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000/');
    }

    async modal() {
        // XPATH
        //await page.click('//button[text()="Aperte o play... se tiver coragem"]');
        //await page.waitForTimeout(1000);

        // Usa parte do texto
        //await page.getByRole('button', { name: /Aperte o play/ }).click();

        await this.page.getByRole('button', { name: 'Aperte o play... se tiver coragem' }).click();

        //Verificação MODAL
        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera');
    }

    async element(name, email) {
        //Busca do elemento pelo NAME
        //await page.locator('input[name=name]').fill('Milena'); 

        //Busca do elemento pelo PLACEHOLDER
        //await page.getByPlaceholder('Seu nome completo').fill('Milena');

        //Busca do elemento pelo ID
        await this.page.locator('#name').fill(name);
        await this.page.locator('#email').fill(email);

        //BUTTON
        await this.page.getByTestId('modal')
            .getByText('Quero entrar na fila!').click();
    }

    async alert(target) {
        //Validação
        await expect(this.page.locator('.alert')).toHaveText(target);
    }
}