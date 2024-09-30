import { Router } from 'express';
import { getRepository, ILike } from 'typeorm';
import { Company } from '../entities/Company';

const router = Router();

router.get('/companies', async (req, res) => {
    try {
        const { search } = req.query;
        const companyRepository = getRepository(Company);

        const companies = await companyRepository.find({
            where: [
                { name: ILike(`%${search}%`) },
                { ticker: ILike(`%${search}%`) },
            ],
        });

        res.json(companies);
    } catch (error) {
        console.error("Error retrieving companies: ", error);
        res.status(500).json({ message: "Error retrieving companies" });
    }
});

router.get('/companies/:id', async (req, res) => {
    try {
        const companyRepository = getRepository(Company);

        // Correctly specify the query options to find a company by ID
        const company = await companyRepository.findOneBy({ id: Number(req.params.id) });

        if (company) {
            res.json(company);
        } else {
            res.status(404).json({ message: "Company not found" });
        }
    } catch (error) {
        console.error("Error retrieving company: ", error);
        res.status(500).json({ message: "Error retrieving company" });
    }
});

export default router;
