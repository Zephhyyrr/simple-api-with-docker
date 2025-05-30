import { Request, Response, NextFunction } from "express";
import {
    getAllArticleService,
    getArticleByIdService,
    addArticleService,
    updateArticleService,
    deleteArticleService,
} from "../services/article.service";
import { AppError } from "../errors/handle_errors";

export const getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articles = await getAllArticleService();
        res.json({ success: true, data: articles });
    } catch (error) {
        next(error);
    }
};

export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id) throw new AppError("ID artikel wajib disertakan", 400);
        const article = await getArticleByIdService(id);
        res.json({ success: true, data: article });
    } catch (error) {
        next(error);
    }
};

export const addArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, slug, description } = req.body;
        if (!req.file) throw new AppError("Gambar artikel wajib diunggah", 400);
        const image = req.file.filename;

        const newArticle = await addArticleService(title, slug, description, image);
        res.status(201).json({ success: true, data: newArticle });
    } catch (error) {
        next(error);
    }
};

export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { title, slug, description } = req.body;
        const image = req.file ? req.file.filename : "";

        const updatedArticle = await updateArticleService(id, title, slug, description, image);
        res.json({ success: true, data: updatedArticle });
    } catch (error) {
        next(error);
    }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedArticle = await deleteArticleService(id);
        res.json({ success: true, data: `Artikel dengan id: ${deletedArticle.id} berhasil dihapus` });
    } catch (error) {
        next(error);
    }
};
