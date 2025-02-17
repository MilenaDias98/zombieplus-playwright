import { expect } from '@playwright/test';

export class Toast {
    constructor(page) {
        this.page = page;
    }

    async containText(message) {
        //Verificar e clicar no toast
        // await page.getByText('seus dados conosco').click();
        /*Permite pegar o código html no momento do TOAST = Abrir ui, rodar o código ir no console do ui e 
        copiar o html para achar o elemento*/
        // const content = await page.content() 
        // console.log(content);

        //TOAST 
        const toast = this.page.locator('.toast');
        await expect(toast).toContainText(message);
        await expect(toast).not.toBeVisible({ timeout: 5000 }); //Toast tem até 5s para desaparecer
    }
}