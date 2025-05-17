import { Router } from "express";
import upload from "../middlewares/upload.middleware";
import {
    getAllArticles,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle
} from "../controllers/article.controller";

const articleRouter = Router();

articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", upload.single("image"), addArticle);
articleRouter.put("/:id", upload.single("image"), updateArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;
