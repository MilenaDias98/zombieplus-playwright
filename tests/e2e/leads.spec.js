const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

// test.beforeAll(async () => { //Roda os resultados dos testes uma única vez para varios testes
//   randomName = faker.person.fullName();
//   randomEmail = faker.internet.email();
// })

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  await page.landing.visit();
  await page.landing.modal();
  await page.landing.element(randomName, randomEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message);
});

test('não deve cadastrar quando email já existe', async ({ page, request }) => {
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', { //API
    data: {
      name: randomName,
      email: randomEmail
    }
  });

  expect(newLead.ok()).toBeTruthy();

  await page.landing.visit();
  await page.landing.modal();
  await page.landing.element(randomName, randomEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message);
});

test('não deve cadastrar com email incorreto', async ({ page }) => {
  await page.landing.visit();
  await page.landing.modal();
  await page.landing.element('Milena Dias', 'dias.outlook.com');

  //Validação email incorreto
  await page.landing.alert('Email incorreto');
});

test('não deve cadastrar quando o nome não é preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.modal();
  await page.landing.element('', 'dias.milena@outlook.com');

  //Validação campo obrigatório
  await page.landing.alert('Campo obrigatório');
});

test('não deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.modal();
  await page.landing.element('Milena Dias', '');

  //Validação campo obrigatório
  await page.landing.alert('Campo obrigatório');
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.modal();
  await page.landing.element('', '');

  //Validação campos obrigatórios
  await page.landing.alert([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});