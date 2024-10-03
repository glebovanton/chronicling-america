import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const endpoints = [
        {
            title: "Get all companies",
            url: "/api/companies",
            method: "GET /api/companies",
            description: "Returns the list of all companies."
        },
        {
            title: "Search companies by title or ticker",
            url: "/api/companiesByKey?search=Walmart",
            method: "GET /api/companiesByKey?search={key}",
            description: "Searches for companies by name or ticker (e.g., ?search=Walmart)."
        },
        {
            title: "Get company by ID",
            url: "/api/companies/1",
            method: "GET /api/companies/:id",
            description: "Retrieves the details of a specific company by ID (e.g., /api/companies/1)."
        }
    ];

    let html = `
        <html lang="en">
            <head>
                <title>API Documentation</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; }
                    ul { list-style-type: none; padding: 0; }
                    li { margin-bottom: 10px; }
                    a { text-decoration: none; color: #007bff; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <h1>API Documentation</h1>
                <p>Welcome to the Fortune 1000 Companies API. Below are the available endpoints:</p>
                <ul>`;

    endpoints.forEach(endpoint => {
        html += `
                    <li>
                        <strong>${endpoint.title}:</strong> <br />
                        <a href="${endpoint.url}" target="_blank">${endpoint.method}</a><br />
                        ${endpoint.description}
                    </li>`;
    });

    html += `
                </ul>
            </body>
        </html>
    `;

    res.send(html);
});



export default router;
