require('dotenv').config();

const { expect } = require('@playwright/test');

export class Api {
    constructor(request) {
        this.baseApi = process.env.BASE_API
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post(this.baseApi + '/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        });

        expect(response.ok()).toBeTruthy(); //Verifica se status 200 é verdadeiro

        const body = JSON.parse(await response.text()); //Converte o corpo da resposta em JSON
        this.token = 'Bearer ' + body.token; //Apresentação do corpo da resposta(status)
    }

    async getCompanyIdByName(companyName) {
        const response = await this.request.get(this.baseApi + '/companies', {
            headers: {
                Authorization: this.token
            },
            params: {
                name: companyName
            }
        });
        expect(response.ok()).toBeTruthy();

        const body = JSON.parse(await response.text());
        return body.data[0].id;
    }

    async postMovie(movie) {
        const companyId = await this.getCompanyIdByName(movie.company);

        const response = await this.request.post(this.baseApi + '/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured
            }
        });
        expect(response.ok()).toBeTruthy();
    }

    async postTvShow(tvShow) {
        const companyId = await this.getCompanyIdByName(tvShow.company);

        const response = await this.request.post(this.baseApi + '/tvshows', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: tvShow.title,
                overview: tvShow.overview,
                featured: tvShow.featured,
                release_year: tvShow.release_year,
                company_id: companyId,
                seasons: tvShow.season
            }
        });
        expect(response.ok()).toBeTruthy();
    }
}