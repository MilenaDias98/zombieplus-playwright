import { expect } from '@playwright/test';

export class Popup {
    constructor(page) {
        this.page = page;
    }

    async haveText(message) {
        //Verificar e clicar no toast
        // await page.getByText('seus dados conosco').click();
        /*Permite pegar o código html no momento do TOAST = Abrir ui, rodar o código ir no console do ui e 
        copiar o html para achar o elemento*/
        // const content = await page.content() 
        // console.log(content);

        //TOAST 
        const element = this.page.locator('.swal2-html-container');
        await expect(element).toHaveText(message);

        //Toast tem até 5s para desaparecer
        // await expect(element).not.toBeVisible({ timeout: 5000 }); 
    }
}