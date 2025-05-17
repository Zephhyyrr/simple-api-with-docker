import prisma from "../config/prisma";
import { AppError } from "../errors/handle_errors";

export async function getAllArticleService() {
    const articles = await prisma.articles.findMany({
        orderBy: { createAt: "desc" }
    });
    return articles;
}

export async function getArticleByIdService(id: string) {
    const article = await findArticleById(id);
    return article;
}

export async function addArticleService(
    title: string,
    slug: string,
    description: string,
    image: string
) {
    const newArticle = await prisma.articles.create({
        data: { title, slug, description, image },
    });
    return newArticle;
}

export async function updateArticleService(
    id: string,
    title: string,
    slug: string,
    description: string,
    image: string
) {
    await findArticleById(id);

    const updated = await prisma.articles.update({
        where: { id },
        data: { title, slug, description, image },
    });
    return updated;
}

export async function deleteArticleService(id: string) {
    await findArticleById(id);

    const deleted = await prisma.articles.delete({
        where: { id },
    });
    return deleted;
}

const findArticleById = async (id: string) => {
    const article = await prisma.articles.findUnique({ where: { id } });
    if (!article) throw new AppError(`Artikel dengan id ${id} tidak ditemukan.`, 404);
    return article;
};
